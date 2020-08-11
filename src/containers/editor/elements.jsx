import React from "react";
import styled from 'styled-components';
import { useSelected, useFocused } from 'slate-react'

const CodeCodeStyle = styled.span`
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.text.lighter};
    font-family: ${({ theme }) => theme.typography.codeFontFamily};
    padding: 0 4px;
`
export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    
    if (leaf.code) {
        children = <CodeCodeStyle>{children}</CodeCodeStyle>
    }
    
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    
    return <span {...attributes}>{children}</span>
}

const DefaultElementStyle = styled.div`
    margin-bottom:  ${({ theme }) => theme.typography.editor.marginBottom};
`
export const DefaultElement = props => {
    return (
        <DefaultElementStyle>
            <span {...props.attributes}>
                {props.children}
            </span>
        </DefaultElementStyle>    
    )
}

const Header1Style = styled.div`
    font-family: ${({ theme }) => theme.typography.editor.h1.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.h1.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.h1.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.h1.lineHeight};
`
export const Header1Element = props => {
    return (
        <Header1Style {...props.attributes}>
            {props.children}
        </Header1Style>
    )
}

const Header2Style = styled.div`
    font-family: ${({ theme }) => theme.typography.editor.h2.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.h2.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.h2.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.h2.lineHeight};
`
export const Header2Element = props => {
    return (
        <Header2Style {...props.attributes}>
            {props.children}
        </Header2Style>
    )
}

const Header3Style = styled.div`
    font-family: ${({ theme }) => theme.typography.editor.h3.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.h3.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.h3.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.h3.lineHeight};
`
export const Header3Element = props => {
    return (
        <Header3Style {...props.attributes}>
            {props.children}
        </Header3Style>
    )
}

const CodeElementStyle = styled.div`
    border-radius: 4px;
    background-color:  ${({ theme }) => theme.palette.text.lighter};
    color: ${({ theme }) => theme.palette.text.heavy};
    padding: 8px;
    margin-bottom:  ${({ theme }) => theme.typography.editor.marginBottom};

    font-family: ${({ theme }) => theme.typography.codeFontFamily};
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
