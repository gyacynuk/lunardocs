import React, { useCallback, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import ContentPane from "../../components/ContentPane";

const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;

    overflow-y: auto;
`

const Editor = () => {
    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withReact(createEditor()), [])

    // Keep track of state for the value of the editor.
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
    ])

    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        return (
            <span
                {...attributes}
                style={{
                    fontFamily: '"Barlow", "Helvetica", "Arial", sans-serif',
                    fontWeight: leaf.bold ? 'bold' : 'normal',
                    fontStyle: leaf.italic ? 'italic' : 'normal',
                }}
            >
                {children}
            </span>
        )
    }, [])

    return (
        <ContentPane>
            <ScrollableContainer>
                <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
                    <Editable renderLeaf={renderLeaf} />
                </Slate>
            </ScrollableContainer>    
        </ContentPane>
    );
};

Editor.propTypes = {};

export default Editor;