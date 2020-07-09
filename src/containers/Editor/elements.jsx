import React from "react";
import styled from 'styled-components';

const LeafStyle = styled.span`
    border-radius: 4px;
    background-color: ${props => props.leaf.isCode ? props.theme.palette.text.lighter : `transparent`};
    padding: ${props => props.leaf.isCode ? `0 4px` : `0`};
    font-family: ${props => props.leaf.isCode ? props.theme.typography.codeFontFamily : props.theme.typography.editor.fontFamily};
`
export const Leaf = props => {
    console.log('lef')
    console.log(props)
    return (
      <LeafStyle {...props} {...props.attributes}>
        {props.children}
      </LeafStyle>
    )
  }

const DefaultElementStyle = styled.span`
    color: ${({ theme }) => theme.palette.text.heavy};
    font-family: ${({ theme }) => theme.typography.editor.fontFamily};
    font-weight: ${({ theme }) => theme.typography.editor.fontWeight};
    font-size: ${({ theme }) => theme.typography.editor.fontSize};
    line-height: ${({ theme }) => theme.typography.editor.lineHeight};
`
export const DefaultElement = props => {
    return (
        <div>
            <DefaultElementStyle {...props.attributes}>
                {props.children}
            </DefaultElementStyle>
        </div>
        
    )
}

const CodeElementStyle = styled.span`
    color: ${({ theme }) => theme.palette.text.light};
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
  
