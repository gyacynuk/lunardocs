import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OuterContainer = styled.div`
    position: fixed;
    top: ${({ theme }) => theme.constants.navBar.height};

    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.constants.navBar.height});

    display: flex;
    justify-content: center;
`

const InnerContainer = styled.div`
    width: 700px;
    height: 100%;

    ${({ theme }) => theme.isMobile`
        width: 80%;
    `}
`

const ContentPane = (props) => {
    return (
        <OuterContainer {...props}>
            <InnerContainer>
                {props.children}
            </InnerContainer>
        </OuterContainer>
    );
};

ContentPane.propTypes = {};

export default ContentPane;