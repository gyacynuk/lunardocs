import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SpacerLine = styled.div`
    width: 1px;
    height: ${({theme}) => theme.constants.editor.spacers.height};
    margin-left: ${props => props.marginLeft || props.theme.constants.editor.spacers.marginLeft};
    margin-right: ${props => props.marginRight || props.theme.constants.editor.spacers.marginRight};

    background-color: ${({theme}) => theme.palette.text.light};
`

function ToolBarSpacer(props) {
    return (
        <SpacerLine {...props}/>
    )
}

ToolBarSpacer.propTypes = {
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
}

export default ToolBarSpacer
