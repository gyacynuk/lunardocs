import React, { useCallback, useMemo, useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createEditor, Editor, Transforms, Range, Text } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSelected, useFocused } from 'slate-react'
import { withHistory } from 'slate-history'

import ContentPane from "../../components/ContentPane";
import { CodeElement, DefaultElement, Leaf } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { getActiveDocumentValue, getShortcutTarget, getShortcutSearch, getShortcutDropdownIndex } from "../../store/selectors";
import { setActiveDocumentValue, setShortcutTarget, setShortcutSearch, setShortcutDropdownIndex } from "../../store/actions";

const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

const StyledEditable= styled(Editable)`
    height: 100%;
    overflow-y: auto;
`






// note to self: implement code block as it's own node
// implememnt inline code as a mark, see: https://github.com/ianstormtaylor/slate/blob/master/site/examples/markdown-preview.js
//                                   and: https://docs.slatejs.org/walkthroughs/04-applying-custom-formatting









const withShortcuts = editor => {
    const { isInline, isVoid } = editor
  
    // editor.isInline = element => {
    //     return element.type === 'code' ? true : isInline(element)
    // }

    // editor.isVoid = element => {
    //     return element.type === 'paragraph' ? false : isVoid(element)
    // }
  
    return editor
}

const Portal = ({ children }) => {
    return ReactDOM.createPortal(children, document.body)
}

const insertShortcut = (editor, shortcut) => {
    // const shortcutNode = { type: shortcut, children: [{ text: '' }] }
    // Transforms.insertNodes(editor, shortcutNode)
    // Transforms.move(editor)

    Transforms.setNodes(
        editor,
        { isCode: true },
        // Apply it to text nodes, and split the text node up if the
        // selection is overlapping only part of it.
        { match: n => Text.isText(n), split: true }
    );

    Editor.insertText(editor, ' ')

    const { selection } = editor
    if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection)
        const charBefore = Editor.before(editor, start, { unit: 'character' })
        const before = charBefore && Editor.before(editor, charBefore)
        const beforeRange = before && Editor.range(editor, before, start)
        Transforms.select(editor, beforeRange)
    }
}

const MAX_SHORTCUT_DROPDOWN_SIZE = 10;
const SHORTCUTS = [
    'code',
    'codeblock',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
];

const TextEditor = (props) => {
    const dispatch = useDispatch();

    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), []);

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

          if (beforeMatch && afterMatch) {
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
            case 'code':
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
                    <div
                    ref={ref}
                    style={{
                    top: '-9999px',
                    left: '-9999px',
                    position: 'absolute',
                    zIndex: 1,
                    padding: '3px',
                    background: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                    }}>
                        {matchingShortcuts.map((shortcut, i) => (
                        <div
                        key={shortcut}
                        style={{
                        padding: '1px 3px',
                        borderRadius: '3px',
                        background: i === shortcutDropdownIndex ? '#B4D5FF' : 'transparent',
                        }}>
                            {shortcut}
                        </div>
                        ))}
                    </div>
                    </Portal>
                )}
            </Slate>
        </ContentPane>
    );
};

TextEditor.propTypes = {};

export default TextEditor;