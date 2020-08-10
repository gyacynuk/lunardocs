import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

import { ReactComponent as FacebookSVG } from '../../../assets/icons/facebook-square.svg';

const FacebookButton = styled.div`
    color: #ffffff;
    background-color: #1877f2;

    display: inline-block;
    padding: 8px 16px;
    border-radius: 4px;

    font-size: 16px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 700;

    cursor: pointer;
`

const HorizontalAlligner = styled.div`
    display: flex;
    align-items: center;
`

const FacebookIcon = styled(FacebookSVG)`
    margin-right: 16px;
`

const responseFacebook = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.app().auth().signInWithPopup(provider).then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
}

const FacebookLoginButton = ({ history }) => {
    return (
        <div onClick={responseFacebook}>Login</div>
    );
};

FacebookLoginButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
};

export default withRouter(FacebookLoginButton);