import React, { useCallback, useMemo, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

import { createEditor, Editor, Transforms, Range, Text, Node, Path } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import ContentPane from "../../components/content-pane";
import ShortcutPortal, { Portal } from './shortcut-portal'
import ShortcutItem from "./shortcut-portal/shortcutItem";
import { CodeElement, DefaultElement, Leaf, ImageElement, Header1Element, Header2Element, Header3Element } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { getActiveDocumentValue, getShortcutTarget, getShortcutSearch, getShortcutDropdownIndex } from "../../store/selectors";
import { setActiveDocumentValue, setShortcutTarget, setShortcutSearch, setShortcutDropdownIndex } from "../../store/actions";
import { isNodeEmptyAsideFromSelection, getCurrentPath, getParentPath } from './utils';

const StyledEditable= styled(Editable)`
    height: 100%;
    overflow-y: auto;

    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.editor.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.lineHeight};
`

const MAX_SHORTCUT_DROPDOWN_SIZE = 10;
const SHORTCUTS = [
    { name: 'code' },
    { name: 'codeblock', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header1', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header2', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header3', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'image', nodeProperties: { isInline: false, isVoid: true } },
    { name: 'link', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'list', nodeProperties: { isInline: false, isVoid: false } },
];
const SHORTCUTS_MAP = SHORTCUTS.reduce((map, shortcut) => (map[shortcut.name] = shortcut, map), {});

const getMatchingShortcuts = searchText => SHORTCUTS
        .map(shortcut => shortcut.name)
        .filter(shortcut => shortcut.startsWith(searchText.toLowerCase()))
        .slice(0, MAX_SHORTCUT_DROPDOWN_SIZE);

const isElementInline = name => {
    const element = SHORTCUTS_MAP[name];
    if (!element) return false;

    return element.nodeProperties && element.nodeProperties.isInline;
}

const isElementVoid = name => {
    const element = SHORTCUTS_MAP[name];
    if (!element) return false;

    return element.nodeProperties && element.nodeProperties.isVoid;
}

const withCustomElements = editor => {
    const { isInline, isVoid, insertData } = editor;
  
    editor.isInline = element => isElementInline(element.type) ? true : isInline(element);
    editor.isVoid = element => isElementVoid(element.type) ? true : isVoid(element);

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor;
}

const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const insertShortcut = (editor, shortcut) => {
    switch (shortcut) {
        case 'code': {
            // Set the text of the selection to be code
            Transforms.setNodes(
                editor,
                { isCode: true },
                { match: n => Text.isText(n), split: true }
            );
        
            // Inserts a space, deleting the shortcut typed while preserving the code styling
            Editor.insertText(editor, ' ')

            // Grab the cursor location
            const { selection } = editor
        
            // Select the previously inserted space, to facilitate easy typing
            if (selection && Range.isCollapsed(selection)) {
                const [start] = Range.edges(selection)
                const before = Editor.before(editor, start)
                const beforeRange = before && Editor.range(editor, before, start)
                Transforms.select(editor, beforeRange)
            }
            break
        }
        case 'codeblock': {
            // If the current node is empty, then just wrap it
            if (isNodeEmptyAsideFromSelection(editor, getCurrentPath(editor))) {
                Transforms.setNodes(editor,
                    { type: 'codeblock' }
                )

                // Delete current selection (shortcut typed by user)
                Transforms.delete(editor)
            }
            else {
                const codeblock = { type: 'codeblock', children: [{ text: '' }] }
                Transforms.insertNodes(editor, codeblock)
            }
            break
        }
        case 'header1': {
            // If the current node is empty, then just wrap it
            if (isNodeEmptyAsideFromSelection(editor, getCurrentPath(editor))) {
                Transforms.setNodes(editor,
                    { type: 'header1' }
                )

                // Delete current selection (shortcut typed by user)
                Transforms.delete(editor)
            } else {
                const header = { type: 'header1', children: [{ text: '' }] }
                Transforms.insertNodes(editor, header)
            }
            break
        }
        case 'header2': {
            // If the current node is empty, then just wrap it
            if (isNodeEmptyAsideFromSelection(editor, getCurrentPath(editor))) {
                Transforms.setNodes(editor,
                    { type: 'header2' }
                )

                // Delete current selection (shortcut typed by user)
                Transforms.delete(editor)
            } else {
                const header = { type: 'header2', children: [{ text: '' }] }
                Transforms.insertNodes(editor, header)
            }
            break
        }
        case 'header3': {
            // If the current node is empty, then just wrap it
            if (isNodeEmptyAsideFromSelection(editor, getCurrentPath(editor))) {
                Transforms.setNodes(editor,
                    { type: 'header3' }
                )

                // Delete current selection (shortcut typed by user)
                Transforms.delete(editor)
            } else {
                const header = { type: 'header3', children: [{ text: '' }] }
                Transforms.insertNodes(editor, header)
            }
            break
        }
    }
}

const TextEditor = props => {
    const dispatch = useDispatch();

    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withCustomElements(withReact(withHistory(createEditor()))), []);

    const ref = useRef();

    // Keep track of state for the value of the editor.
    const documentValue = useSelector(getActiveDocumentValue); 
    const shortcutTarget = useSelector(getShortcutTarget);
    const shortcutSearch = useSelector(getShortcutSearch);
    const shortcutDropdownIndex = useSelector(getShortcutDropdownIndex);

    const matchingShortcuts = getMatchingShortcuts(shortcutSearch);

    console.log(documentValue)

    const onKeyDown = useCallback(
        event => {
            if (shortcutTarget) {
                switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault()
                    const prevIndex = shortcutDropdownIndex >= matchingShortcuts.length - 1
                        ? 0
                        : shortcutDropdownIndex + 1;
                    dispatch(setShortcutDropdownIndex(prevIndex))
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    const nextIndex = shortcutDropdownIndex <= 0
                        ? matchingShortcuts.length - 1
                        : shortcutDropdownIndex - 1;
                    dispatch(setShortcutDropdownIndex(nextIndex))
                    break
                case 'Tab':
                case 'Enter':
                    event.preventDefault()
                    Transforms.select(editor, shortcutTarget)
                    insertShortcut(editor, matchingShortcuts[shortcutDropdownIndex])
                    dispatch(setShortcutTarget(null))
                    break
                case 'Escape':
                    event.preventDefault()
                    dispatch(setShortcutTarget(null))
                    break
                }
            }
            switch (event.key) {
            case 'Enter': 
                if (event.shiftKey) {
                    const [matchingCodeblock] = Editor.nodes(editor, {
                        at: getCurrentPath(editor),
                        match: n => n.type === 'codeblock',
                    })
                    
                    if (!!matchingCodeblock) {
                        event.preventDefault();
                        Editor.insertText(editor, '\r\n');
                        break
                    }
                }

                if (!shortcutTarget) {
                    event.preventDefault();
                    const paragraph = { type: 'paragraph', children: [{ text: '' }] }
                    Transforms.insertNodes(editor, paragraph)
                }
                break
            case 'ArrowRight':
                const { selection } = editor

                if (selection && Range.isCollapsed(selection)) {
                    const [start] = Range.edges(selection)
                    const after = Editor.after(editor, start, { unit: 'character' })
                    const afterRange = Editor.range(editor, start, after)
                    const afterText = Editor.string(editor, afterRange)
                    const afterMatch = afterText.match(/^$/)

                    const [match] = Editor.nodes(editor, {
                        match: n => n['isCode']
                    })

                    if (afterMatch && !!match) {
                        event.preventDefault()
                        Editor.insertText(editor, ' ')
                        const newAfter = Editor.after(editor, start, { unit: 'character' })
                        const newAfterRange = Editor.range(editor, start, newAfter)
                        Transforms.setNodes(
                            editor,
                            { isCode: false },
                            { at: newAfterRange, match: n => Text.isText(n), split: true }
                        );
                    }
                }
            }
        },
        [shortcutTarget, shortcutSearch, shortcutDropdownIndex]
    )

    useEffect(() => {
        if (shortcutTarget && matchingShortcuts.length > 0) {
            const element = ref.current
            const domRange = ReactEditor.toDOMRange(editor, shortcutTarget)
            const rect = domRange.getBoundingClientRect()
            element.style.top = `${rect.top + window.pageYOffset + 24}px`
            element.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [matchingShortcuts.length, editor, shortcutTarget, shortcutSearch, shortcutDropdownIndex])

    const onChange = value => {
        dispatch(setActiveDocumentValue(value))
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection)
          const wordBefore = Editor.before(editor, start, { unit: 'word' })
          const before = wordBefore && Editor.before(editor, wordBefore)
          const beforeRange = before && Editor.range(editor, before, start)
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^\/([\w\-]+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          // And in paragraph node
          if (beforeMatch && afterMatch && getMatchingShortcuts(beforeMatch[1].toLowerCase()).length != 0) {
            dispatch(setShortcutTarget(beforeRange))
            dispatch(setShortcutSearch(beforeMatch[1]))
            dispatch(setShortcutDropdownIndex(0))
            return
          }
        }

        dispatch(setShortcutTarget(null))
    }

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'codeblock':
                return <CodeElement {...props} />
            case 'header1':
                return <Header1Element {...props} />
            case 'header2':
                return <Header2Element {...props} />
            case 'header3':
                return <Header3Element {...props} />
            case 'image':
                return <ImageElement {...props} />
            case 'paragraph':
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);

    return (
        <ContentPane>
            <Slate
            editor={editor}
            value={documentValue}
            onChange={onChange}>
                <StyledEditable
                autoFocus={true}
                onKeyDown={onKeyDown}
                placeholder={'Write something here...'}
                renderElement={renderElement}
                renderLeaf={renderLeaf}/>
                {shortcutTarget && matchingShortcuts.length > 0 && (
                    <Portal>
                    <ShortcutPortal ref={ref}>
                        {matchingShortcuts.map((shortcut, i) => (
                        <ShortcutItem
                        key={shortcut}
                        isSelected={i === shortcutDropdownIndex}>
                            {shortcut}
                        </ShortcutItem>
                        ))}
                    </ShortcutPortal>
                    </Portal>
                )}
            </Slate>
        </ContentPane>
    );
};

TextEditor.propTypes = {};

export default TextEditor;