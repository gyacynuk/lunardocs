import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 8px 0px;

    border-radius: 8px;

    cursor: pointer;
`

const Dot = styled.div`
    width: ${({ theme }) => theme.constants.browser.dotSize};
    height: ${({ theme }) => theme.constants.browser.dotSize};

    margin: 0 21px; /* centers with search magnify icon */

    border-radius: 50%;
    background-color: ${props => props.color};  
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
    return (
        <RowContainer>
            <Dot color={props.subjectColor}/>
            <ContentContainer>
                <DocumentTitle>{props.title}</DocumentTitle>
                <DocomentDate>{props.date}</DocomentDate>
            </ContentContainer>
        </RowContainer>
    );
};

Document.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    subjectColor: PropTypes.string,
};

export default Document;