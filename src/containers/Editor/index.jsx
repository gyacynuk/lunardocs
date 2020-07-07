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

const LeafText = styled.span`
    color: ${({ theme }) => theme.palette.text.heavy};
    fontFamily: ${({ theme }) => theme.typography.editor.fontFamily};
    fontWeight: ${props => props.bold ? 'bold' : 'normal'};
    fontStyle: ${props => props.italic ? 'italic' : 'normal'};
`

const Editor = (props) => {
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
            <LeafText
                {...attributes}
                bold={leaf.bold}
                italic={leaf.italic}
            >
                {children}
            </LeafText>
        )
    }, [])

    console.log(props)

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