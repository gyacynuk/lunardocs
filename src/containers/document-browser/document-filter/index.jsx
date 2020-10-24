import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentFilterTags } from '../../../store/selectors';
import { setDocumentFilterTag } from '../../../store/actions';

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
    background-color: ${props => props.active ? props.color : 'transparent'};

    cursor: pointer;

    &:hover {
        background-color: ${props => props.color};
    }
`

const DocumentFilter = () => {
    const dispatch = useDispatch()
    const tags = useSelector(getDocumentFilterTags)

    const toggleTag = tag => {
        dispatch(setDocumentFilterTag(tag, !tags[tag]))
    }

    return (
        <OuterContainer>
            <Label>
                Filter
            </Label>
            <InnerContainer>
                <Dot data-tip data-for="dot1" color="red" active={!!tags.red ? 1 : 0} onClick={() => toggleTag('red')}/>
                <ReactTooltip id="dot1" place="bottom" effect="solid">
                    Red Tag
                </ReactTooltip>
    
                <Dot data-tip data-for="dot2" color="violet" active={!!tags.violet ? 1 : 0} onClick={() => toggleTag('violet')}/>
                <ReactTooltip id="dot2" place="bottom" effect="solid">
                    Violet Tag
                </ReactTooltip>
    
                <Dot data-tip data-for="dot3" color="lightBlue" active={!!tags.cyan ? 1 : 0} onClick={() => toggleTag('cyan')}/>
                <ReactTooltip id="dot3" place="bottom" effect="solid">
                    Cyan Tag
                </ReactTooltip>

                <Dot data-tip data-for="dot4" color="lightGreen" active={!!tags.green ? 1 : 0} onClick={() => toggleTag('green')}/>
                <ReactTooltip id="dot4" place="bottom" effect="solid">
                    Green Tag
                </ReactTooltip>

                <Dot data-tip data-for="dot5" color="yellow" active={!!tags.yellow ? 1 : 0} onClick={() => toggleTag('yellow')}/>
                <ReactTooltip id="dot5" place="bottom" effect="solid">
                    Yellow Tag
                </ReactTooltip>
            </InnerContainer>
            
        </OuterContainer>
    );
};

DocumentFilter.propTypes = {};

export default DocumentFilter;