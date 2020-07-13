import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OuterContainer = styled.div`
    display: flex;
    align-items: start;
    
    width: 100%;
    padding-top: 16px;
    padding-bottom: 8px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;

    width: 100%;
`

const Label = styled.div`
    margin-right: 24px;

    color: ${({ theme }) => theme.palette.text.regular};

    line-height: 1;
    font-weight: ${({ theme }) => theme.typography.fontWeightLight};
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    font-size: ${({ theme }) => theme.typography.body.fontSize};
`

const Dot = styled.div`
    width: ${({ theme }) => theme.constants.browser.dotSize};
    height: ${({ theme }) => theme.constants.browser.dotSize};
    margin-right: 16px;
    margin-bottom: 8px;

    border-radius: 50%;
    border 1.5px solid ${props => props.color};
    background-color: transparent;

    cursor: pointer;

    &:hover {
        background-color: ${props => props.color};
    }
`

const DocumentFilter = () => {
    return (
        <OuterContainer>
            <Label>
                Filter
            </Label>
            <InnerContainer>
                {
                    [...Array(5)].map(e => (<><Dot data-tip data-for="dot1" color="red"/>
                    <ReactTooltip id="dot1" place="bottom" effect="solid">
                        Computer Science
                    </ReactTooltip>
        
                    <Dot data-tip data-for="dot2" color="violet"/>
                    <ReactTooltip id="dot2" place="bottom" effect="solid">
                        Math
                    </ReactTooltip>
        
                    <Dot data-tip data-for="dot3" color="lightBlue"/>
                    <ReactTooltip id="dot3" place="bottom" effect="solid">
                        French
                    </ReactTooltip></>))
                }
            </InnerContainer>
            
        </OuterContainer>
    );
};

DocumentFilter.propTypes = {};

export default DocumentFilter;