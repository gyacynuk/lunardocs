import React from "react";
import styled from 'styled-components';

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

const CodeElementStyle = styled.div`
    border-radius: 4px;
    background-color:  ${({ theme }) => theme.palette.text.lighter};
    color: ${({ theme }) => theme.palette.text.heavy};
    padding: 4px;

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

  
