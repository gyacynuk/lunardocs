import React, { useCallback, useMemo, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createEditor, Editor, Transforms, Range, Text, Node } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSelected, useFocused } from 'slate-react'
import { withHistory } from 'slate-history'

import ContentPane from "../../components/ContentPane";
import ShortcutPortal, { Portal } from './ShortcutPortal'
import { CodeElement, DefaultElement, Leaf } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { getActiveDocumentValue, getShortcutTarget, getShortcutSearch, getShortcutDropdownIndex } from "../../store/selectors";
import { setActiveDocumentValue, setShortcutTarget, setShortcutSearch, setShortcutDropdownIndex } from "../../store/actions";
import ShortcutItem from "./ShortcutPortal/shortcutItem";

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
    'code',
    'codeblock',
    'header-1',
    'header-2',
    'header-3',
    'header-4',
    'image',
    'link',
    'list',
];

const INLINE_ELEMENTS = [];
const VOID_ELEMENTS = [];

const withCustomElements = editor => {
    const { isInline, isVoid } = editor;
  
    editor.isInline = element => INLINE_ELEMENTS.includes(element.type) ? true : isInline(element);
    editor.isVoid = element => VOID_ELEMENTS.includes(element.type) ? false : isVoid(element);
    return editor;
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
            const { selection } = editor
            // If the current node is empty, then just wrap i
            if (selection) {
                const [start] = Range.edges(selection)
                if (start.path.length > 1) {
                    let parentPath = start.path.slice(0, start.path.length-1)

                    if (Editor.string(editor, selection) === Editor.string(editor,parentPath)) {
                        Transforms.wrapNodes(editor, 
                            { type: 'codeblock', children: [] },
                            { at: parentPath}
                        )
                        // Delete current selection (shortcut typed by user)
                        Editor.insertText(editor, '')
                        break
                    }
                }
            }

            const codeblock = { type: 'paragraph', children: [{ text: '' }] }
            Transforms.insertNodes(editor, codeblock)
            Transforms.wrapNodes(
                editor,
                { type: 'codeblock', children: [] },
                {
                  match: node => Editor.isBlock(editor, node),
                  mode: 'lowest',
                }
            )
            break
        }
    }
}

const TextEditor = (props) => {
    const dispatch = useDispatch();

    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withCustomElements(withReact(withHistory(createEditor()))), []);

    const ref = useRef();

    // Keep track of state for the value of the editor.
    const documentValue = useSelector(getActiveDocumentValue); 
    const shortcutTarget = useSelector(getShortcutTarget);
    const shortcutSearch = useSelector(getShortcutSearch);
    const shortcutDropdownIndex = useSelector(getShortcutDropdownIndex);

    const matchingShortcuts = SHORTCUTS.filter(shortcut =>
        shortcut.startsWith(shortcutSearch.toLowerCase())
    ).slice(0, MAX_SHORTCUT_DROPDOWN_SIZE);

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
                break
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
          const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          // And in paragraph node
          if (beforeMatch && afterMatch && SHORTCUTS.filter(shortcut => shortcut.startsWith(beforeMatch[1].toLowerCase())).length != 0) {
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