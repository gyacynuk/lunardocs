import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { getActiveDropDownTag } from '../../../store/selectors';
import { setActiveDropDownTag, updateDocumentAndSave, updateDocumentNotTimestampAndSave } from '../../../store/actions';

import RowItem from '../row-item'
import DropDown from '../../../components/drop-down';
import { getTagColor, TAGS } from  '../index'

const DotWrapper = styled.div`
    position: relative;
`
const Dot = styled.div`
    width: ${({ theme }) => theme.constants.browser.dotSize};
    height: ${({ theme }) => theme.constants.browser.dotSize};

    ${({ center }) => center && `
        margin: 0 21px; /* centers with search magnify icon */
    `}
    
    border-radius: 50%;
    background-color: ${props => props.theme.palette.tags[props.tag] };  
`

const ContentContainer = styled.div`
    flex-grow: 1;
`

const DocumentTitle = styled.h6`
    margin-bottom: 4px;

    color: ${({ theme }) => theme.palette.text.heavy};

    font-weight: bold;
`

const DocomentDate = styled.div`
    color: ${({ theme }) => theme.palette.text.heavy};

    font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
`

const Document = (props) => {
    const dispatch = useDispatch();
    const isDropDownActive = useSelector(getActiveDropDownTag) === props.id;

    const handleTagClick = e => {
        e.preventDefault();
        dispatch(setActiveDropDownTag(props.id));
    }

    const onTagSelected = (tag, index) => {
        const selectedTag = TAGS[index]
        dispatch(updateDocumentNotTimestampAndSave({ id: props.id, tag: selectedTag.name }))
        dispatch(setActiveDropDownTag(null));
    }

    const handleClickOutside = e => {
        dispatch(setActiveDropDownTag(null));
    }

    const tagComponents = TAGS.map(tag => (
        {key: tag.name, component: (<Dot tag={tag.name}/>) }
    ));

    return (
        <RowItem>
            <DotWrapper>
                <Dot center={true} tag={props.tag} onClick={e => e.preventDefault()} onMouseDown={handleTagClick}/>
                {isDropDownActive && (
                <DropDown
                    margin={'6px 0 0 14px'}
                    items={tagComponents}
                    isSelected={(e, i) => null}
                    onSelected={onTagSelected}
                    onClickOutside={handleClickOutside}/>
                )}
            </DotWrapper>
            
            
            <ContentContainer>
                <DocumentTitle>{props.title}</DocumentTitle>
                <DocomentDate>{props.date}</DocomentDate>
            </ContentContainer>
        </RowItem>
    );
};

Document.propTypes = {
    title: PropTypes.string,
    tagName: PropTypes.string,
    date: PropTypes.string,
    subjectColor: PropTypes.string,
};

export default Document;