import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownContainer = styled.div`
    position: absolute;
    padding: 4px;
    margin: ${({ margin }) => margin};
    z-index: 1;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.background};
    box-shadow: 0 1px 5px ${({ theme }) => theme.palette.shadow};
`

const DropDownItem = styled.div`
    cursor: pointer;
    padding: 1px 3px;
    border-radius: 4px;
    color: ${({ theme }) => theme.palette.text.heavy};
    background-color: ${props => props.isSelected ? props.theme.palette.accent.light : 'transparent'};
`

const DropDown = React.forwardRef((props, ref) => {
    return (
        <DropDownContainer ref={ref} margin={props.margin}>
            {props.items.map((item, index) => (
                <DropDownItem
                key={index}
                isSelected={props.selectedIndex===index}
                onMouseDown={event => { event.preventDefault(); console.log('hey'); props.onSelected(index); }}>
                    {item}
                </DropDownItem>
            ))}
        </DropDownContainer>
    );
})

DropDown.propTypes = {
    margin: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
    selectedIndex: PropTypes.number,
    onSelected: PropTypes.func,
};

export default DropDown;