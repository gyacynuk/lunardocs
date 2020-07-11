import React from "react";
import styled from 'styled-components';
import { useSelected, useFocused } from 'slate-react'

const DefaultLeafStyle = styled.span``
const CodeCodeStyle = styled.span`
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.text.lighter};
    font-family: ${({ theme }) => theme.typography.codeFontFamily};
    padding: 0 4px;
`
export const Leaf = props => {
    var LeafComponent = DefaultLeafStyle;
    if (props.leaf.isCode) {
        LeafComponent = CodeCodeStyle;
    }

    return (
      <LeafComponent {...props} {...props.attributes}>
        {props.children}
      </LeafComponent>
    )
  }


export const DefaultElement = props => {
    return (
        <div>
            <span {...props.attributes}>
                {props.children}
            </span>
        </div>    
    )
}

const CodeElementStyle = styled.div`
    border-radius: 4px;
    background-color:  ${({ theme }) => theme.palette.text.lighter};
    color: ${({ theme }) => theme.palette.text.heavy};
    padding: 8px;
    margin: 4px 0px;

    font-family: ${({ theme }) => theme.typography.codeFontFamily} !important;
    font-weight: ${({ theme }) => theme.typography.editor.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.lineHeight};
`
export const CodeElement = props => {
    return (
        <CodeElementStyle {...props.attributes}>
            {props.children}
        </CodeElementStyle>
    )
}

const ImageOuterWrapper = styled.div`
    width: 100%;
    margin: 8px 0;
`
const ImageInnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
const ImageStyle = styled.img`
    display: block;
    max-width: 100%;
    max-height: 20em;
    border-radius: 4px;
    box-shadow: ${props => props.highlight ? `0 0 0 4px ${props.theme.palette.accent.light}` : `none`};
`
export const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <ImageOuterWrapper {...attributes}>
            <ImageInnerWrapper contentEditable={false}>
                <ImageStyle
                    src={element.url}
                    highlight={selected && focused}
                />
            </ImageInnerWrapper>
            {children}
      </ImageOuterWrapper>
    )
}
