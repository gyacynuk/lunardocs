import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from 'firebase'

const googleSignin = (history) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(user) {
        history.push(`/documents/edit/${user.uid}`)
    })
}

const LandingPage = ({ history }) => {
    return (
        <>
            <div>Welcome to Lunar Notes!</div>
            <div>
                <Link to="/login">
                    <span>Login</span>
                </Link>
            </div>
            <div>
                <a onClick={() => googleSignin(history)}>Login Google</a>
            </div>
            <div>
                <a onClick={() =>firebase.auth().signOut()}>Logout</a>
            </div>
        </>
    );
};

LandingPage.propTypes = {};

export default withRouter(LandingPage);