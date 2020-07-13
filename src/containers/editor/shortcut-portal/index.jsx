import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: -9999px;
    left: -9999px;

    padding: 4px;
    z-index: 1;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.background};
    box-shadow: 0 1px 5px ${({ theme }) => theme.palette.shadow};
`

const ShortcutPortal = React.forwardRef((props, ref) => {
    return (
        <Container ref={ref}>
            {props.children}
        </Container>
    );
});

ShortcutPortal.propTypes = {};

export const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

export default ShortcutPortal;