import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const DropDownContainerAppearAnimation = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`
const DropDownContainer = styled.div`
    position: absolute;
    padding: 4px;
    margin: ${({ margin }) => margin};
    z-index: 1;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.background};
    box-shadow: 0 1px 5px ${({ theme }) => theme.palette.shadow};

    animation: ${DropDownContainerAppearAnimation} 200ms ease;
`

const DropDownItem = styled.div`
    padding: 1px 3px;
    margin: 2px 0;
    border-radius: 4px;

    color: ${({ theme }) => theme.palette.text.heavy};
    background-color: ${props => props.isSelected ? props.theme.palette.accent.light : 'transparent'};
    cursor: pointer;
`

const DropDown = React.forwardRef((props, ref) => {
    if (!ref) {
        ref = useRef();
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.onClickOutside && props.onClickOutside(event);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <DropDownContainer ref={ref} margin={props.margin}>
            {props.items.map((item, index) => (
                <DropDownItem
                key={item.key || index}
                isSelected={props.isSelected(item, index)}
                onMouseDown={event => { event.preventDefault(); props.onSelected(item, index); }}
                onClick={e => e.preventDefault()}>
                    {item.component || item}
                </DropDownItem>
            ))}
        </DropDownContainer>
    );
})

const DropDownComponennt = PropTypes.exact({
    key: PropTypes.string,
    component: PropTypes.element,
})

DropDown.propTypes = {
    margin: PropTypes.string,
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(DropDownComponennt),
        PropTypes.arrayOf(PropTypes.string),
    ]),
    isSelected: PropTypes.func,
    onSelected: PropTypes.func,
    onClickOutside: PropTypes.func,
};

DropDown.defaultProps = {
    margin: '0',
    isSelected: (e, i) => false,
    onSelected:  (e, i) => {},
    onClickOutside: () => {}
}

export default DropDown;