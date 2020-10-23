import React from 'react'
import PropTypes, { bool } from 'prop-types'
import { useSelector } from 'react-redux'
import { isSavePending } from '../../../store/selectors'

import { ReactComponent as LoadingSpinnerSVG } from '../../../assets/icons/loading-spinner.svg'
import styled, { keyframes } from 'styled-components';
import ReactTooltip from 'react-tooltip'

const LoadingSpinnerAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;
const LoadingSpinnerIcon = styled(LoadingSpinnerSVG)`
    ${({ theme }) => theme.constants.icons.baseStyle}
    cursor: auto;
   
    fill: ${props => props.active ? props.theme.palette.text.heavy : props.theme.palette.text.light};
    animation: ${LoadingSpinnerAnimation} 1200ms ${({ active }) => active ? `infinite` : `0`};

`

function SavingIndicator(props) {
    const savePending = useSelector(isSavePending);
    return (<>
        <LoadingSpinnerIcon data-tip data-for="saving-spinner" active={savePending ? 1 : 0}/>
        <ReactTooltip id="saving-spinner" place="bottom" effect="solid">
            {savePending ? 'Saving Document' : 'Document Saved'}
        </ReactTooltip>
    </>)
}

SavingIndicator.propTypes = {
    
}

export default SavingIndicator
