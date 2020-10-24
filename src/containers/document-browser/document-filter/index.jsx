import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentFilterTags } from '../../../store/selectors';
import { setDocumentFilterTag } from '../../../store/actions';
import { TAGS } from '../index'

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
    border: 1.5px solid ${props => props.theme.palette.tags[props.tag]};
    background-color: ${props => props.active ? props.theme.palette.tags[props.tag] : 'transparent'};

    cursor: pointer;
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
                {TAGS.map(tag => (
                    <React.Fragment key={tag.name}>
                        <Dot data-tip data-for={tag.name} tag={tag.name} active={!!tags[tag.name] ? 1 : 0} onClick={() => toggleTag(tag.name)}/>
                        <ReactTooltip id={tag.name} place="bottom" effect="solid">
                            {tag.displayName}
                        </ReactTooltip>
                    </React.Fragment>
                ))}
            </InnerContainer>
            
        </OuterContainer>
    );
};

DocumentFilter.propTypes = {};

export default DocumentFilter;