import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isHotkey from 'is-hotkey'

import { createEditor, Editor, Transforms, Range } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'

import withCustomElements, { SHORTCUTS } from './custom-elements';
import withLayout from './layout';

import ContentPane from "../../components/content-pane";
import Portal from '../../components/portal'
import { CodeElement, DefaultElement, Leaf, ImageElement, Header1Element, Header2Element, Header3Element, TitleElement } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { getActiveDocumentValue, getShortcutTarget, getShortcutSearch, getShortcutDropdownIndex } from "../../store/selectors";
import { setShortcutTarget, setShortcutSearch, setShortcutDropdownIndex, saveDocumentValueAsync, openDocument } from "../../store/actions";

import ToolBar from "./tool-bar";
import ToolBarButton from "./tool-bar-button";
import ToolBarTextButton from './tool-bar-text-button';
import DropDown from "../../components/drop-down";
import ToolBarDropDown from "./tool-bar-drop-down";
import ToolBarSpacer from "./tool-bar-spacer";

import { ReactComponent as BulletedListSVG } from '../../assets/icons/bulleted-list.svg'
import { ReactComponent as NumberedListSVG } from '../../assets/icons/numbered-list.svg'


const BulletedListIcon = styled(BulletedListSVG)`
    width: 20px;
    height: 20px;
`
const NumberedListIcon = styled(NumberedListSVG)`
    width: 20px;
    height: 20px;
`

const StyledEditable = styled(Editable)`
    height: calc(100% - ${({ theme }) => theme.constants.editor.toolBarHeight});
    overflow-y: auto;

    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.editor.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.lineHeight};
`

const BLOCK_TYPES = [
    { type: 'header1', name: 'Header 1', selectable: true },
    { type: 'header2', name: 'Header 2', selectable: true },
    { type: 'header3', name: 'Header 3', selectable: true },
    { type: 'paragraph', name: 'Paragraph', selectable: true },
    { type: 'codeblock', name: 'Code Block', selectable: true },
    // Non-selectable block types MUST go at the bottom of this list
    { type: 'title', name: 'Title', selectable: false },
]
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
}

const MAX_SHORTCUT_DROPDOWN_SIZE = 10;
const getMatchingShortcuts = searchText => SHORTCUTS
        .map(shortcut => shortcut.name)
        .filter(shortcut => shortcut.startsWith(searchText.toLowerCase()))
        .slice(0, MAX_SHORTCUT_DROPDOWN_SIZE);

const insertShortcut = (editor, shortcut) => {
    switch (shortcut) {
        case 'bulleted-list': {
            toggleBlock(editor, 'bulleted-list')
            break
        }
        case 'code': {
            toggleMark(editor, 'code');
            break
        }
        case 'codeblock': {
            toggleBlock(editor, 'codeblock')
            break
        }
        case 'header1': {
            toggleBlock(editor, 'header1')
            break
        }
        case 'header2': {
            toggleBlock(editor, 'header2')
            break
        }
        case 'header3': {
            toggleBlock(editor, 'header3')
            break
        }
        case 'numbered-list': {
            toggleBlock(editor, 'numbered-list')
            break
        }
    }

    // Delete current selection (shortcut typed by user)
    Transforms.delete(editor)
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isAnyListActive = editor => {
    const [match] = Editor.nodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
    })

    Editor.nodes(editor)
  
    return !!match
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    Editor.nodes(editor)
  
    return !!match
}

const setBlock = (editor, format) => {
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })
  
    Transforms.setNodes(editor, {
        type: isList ? 'list-item' : format,
    })
  
    if (isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)

    if (isActive) {
        setBlock(editor, 'paragraph')
    } else {
        setBlock(editor, format)
    }
}

const TextEditor = ({ documentId, ...props }) => {
    const dispatch = useDispatch();

    // Load in current document
    useEffect(() => {
        dispatch(openDocument(documentId))
    }, [documentId])

    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withLayout(withCustomElements(withReact(withHistory(createEditor())))), []);

    const ref = useRef();

    // Keep track of state for the value of the editor.
    const documentValue = useSelector(getActiveDocumentValue); 
    const shortcutTarget = useSelector(getShortcutTarget);
    const shortcutSearch = useSelector(getShortcutSearch);
    const shortcutDropdownIndex = useSelector(getShortcutDropdownIndex);

    const matchingShortcuts = getMatchingShortcuts(shortcutSearch);

    const [dropDownState, setDropDownState] = useState(false);

    const applyShortcut = (shortcut) => {
        Transforms.select(editor, shortcutTarget)
        insertShortcut(editor, shortcut)
        dispatch(setShortcutTarget(null))
    }

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
                    applyShortcut(matchingShortcuts[shortcutDropdownIndex])
                    break
                case 'Escape':
                    event.preventDefault()
                    dispatch(setShortcutTarget(null))
                    break
                }
            }

            // Apply marks from hotkeys
            for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                    event.preventDefault()
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                    return
                }
            }

            // Handle special logic
            switch (event.key) {
            case 'Enter': 
                // Enter pressed WITH shift
                if (event.shiftKey) {
                    if (isAnyListActive(editor)) {
                        event.preventDefault();
                        // If cursor is at end of line, add a new list item below
                        if (Editor.isEnd(editor, editor.selection.anchor, editor.selection.anchor.path)) {
                            const listItem = { type: 'list-item', children: [{ text: '' }] }
                            Transforms.insertNodes(editor, listItem)
                        }
                        // Otherwise split the current list item
                        else {
                            Transforms.splitNodes(editor)
                        }
                    }
                    else if (isBlockActive(editor, 'codeblock')){
                        event.preventDefault();
                        Editor.insertText(editor, '\r\n');
                    }
                }
                // Enter pressed WITHOUT shift
                else {
                    if (!shortcutTarget) {
                        event.preventDefault();

                        if (isAnyListActive(editor)) {
                            // If cursor is at end of line, add a new paragraph item below and unwrap it
                            if (Editor.isEnd(editor, editor.selection.anchor, editor.selection.anchor.path)) {
                                const paragraph = { type: 'paragraph', children: [{ text: '' }] }
                                Transforms.insertNodes(editor, paragraph)
                                Transforms.unwrapNodes(editor, {
                                    match: n => LIST_TYPES.includes(n.type),
                                    split: true,
                                })
                            }
                            // Otherwise split the current list item, unwrap it, and set it as a paragraph
                            else {
                                Transforms.splitNodes(editor)
                                Transforms.unwrapNodes(editor, {
                                    match: n => LIST_TYPES.includes(n.type),
                                    split: true,
                                })
                                Transforms.setNodes(editor, {
                                    type: 'paragraph',
                                })
                            }
                        }
                        else {
                            const paragraph = { type: 'paragraph', children: [{ text: '' }] }
                            Transforms.insertNodes(editor, paragraph)
                        }
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
        // If the document state has changes, then queue up an async debounced save
        if (documentValue != value) {
            const titleString = Editor.string(editor, [0]);
            dispatch(saveDocumentValueAsync({
                title: titleString === '' ? 'Untitled Document' : titleString,
                id: documentId,
                value: value
            }))
        }
        
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
            case 'bulleted-list':
                return <ul {...props.attributes}>{props.children}</ul>
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
            case 'list-item':
                return <li {...props.attributes}>{props.children}</li>
            case 'numbered-list':
                return <ol {...props.attributes}>{props.children}</ol>
            case 'title':
                return <TitleElement {...props} />
            case 'paragraph':  // Fall through
            default:
                return <DefaultElement {...props} />
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);

    return (
        <>
        {/* <EditorNavBar/> */}
        <ContentPane>
            <Slate
            editor={editor}
            value={documentValue}
            onChange={onChange}>
            <ToolBar>
                <BlockDropDown dropDownState={dropDownState} setDropDownState={setDropDownState}/>

                <ToolBarSpacer marginLeft={'0px'}/>

                <MarkTextButton format={'bold'}>
                    <strong>B</strong>
                </MarkTextButton>
                <MarkTextButton format={'italic'}>
                    <em>I</em>
                </MarkTextButton>
                <MarkTextButton format={'underline'}>
                    <u>U</u>
                </MarkTextButton>
                <MarkTextButton format={'code'}>
                    <code>{'<>'}</code>
                </MarkTextButton>

                <ToolBarSpacer/>

                <BlockButton format={'bulleted-list'}>
                    <BulletedListIcon/>
                </BlockButton>
                <BlockButton format={'numbered-list'}>
                    <NumberedListIcon/>
                </BlockButton>
            </ToolBar>
            <StyledEditable
                autoFocus
                spellCheck
                onKeyDown={onKeyDown}
                placeholder={'Write something here...'}
                renderElement={renderElement}
                renderLeaf={renderLeaf}/>
                {shortcutTarget && matchingShortcuts.length > 0 && (
                    <Portal>
                        <DropDown
                        ref={ref}
                        items={matchingShortcuts}
                        isSelected={(e, i) => i === shortcutDropdownIndex}
                        onSelected={(e, i) => applyShortcut(matchingShortcuts[i])}/>
                    </Portal>
                )}
            </Slate>
        </ContentPane>
        </>
    );
};

const MarkButton = ({ format, children }) => {
    const editor = useSlate();
    return (
        <ToolBarButton active={isMarkActive(editor, format)} onMouseDown={() => toggleMark(editor, format)}>
            {children}
        </ToolBarButton>
    )
}

const MarkTextButton = ({ format, children }) => {
    const editor = useSlate();
    return (
        <ToolBarTextButton active={isMarkActive(editor, format)} onMouseDown={() => toggleMark(editor, format)}>
            {children}
        </ToolBarTextButton>
    )
}

const BlockButton = ({ format, children }) => {
    const editor = useSlate();
    return (
        <ToolBarButton active={isBlockActive(editor, format)} onMouseDown={() => toggleBlock(editor, format)}>
            {children}
        </ToolBarButton>
    )
}

const BlockDropDown = ({ dropDownState, setDropDownState }) => {
    const editor = useSlate();
    const currentBlockType = BLOCK_TYPES.find(blockType => isBlockActive(editor, blockType.type))
    return (
        <ToolBarDropDown active={false} onMouseDown={() => setDropDownState(!dropDownState)}>
            {currentBlockType ? currentBlockType.name : 'Paragraph'}
            {dropDownState && (
                <DropDown
                margin={'4px 0 0 -7px'}
                items={BLOCK_TYPES.filter(blockType => blockType.selectable).map(blockType => blockType.name)}
                isSelected={(e, i) => currentBlockType && e === currentBlockType.name}
                onSelected={(e, i) => setBlock(editor, BLOCK_TYPES[i].type)}
                onClickOutside={() => setDropDownState(false)}/>
            )}
        </ToolBarDropDown>
    )
}

TextEditor.propTypes = {};

export default TextEditor;