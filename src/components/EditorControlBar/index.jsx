/**
 *
 * EditorControlBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`

`;

/**
 * EditorControlBar component description
 */
const Button = ({ text }) => <Container contenteditable="true">{text}</Container>;

Button.propTypes = {
  /**
   * Button text
   */
  text: PropTypes.string,
};

Button.defaultProps = {
  text: '',
};

export default Button;