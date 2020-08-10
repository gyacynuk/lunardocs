import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const LoginPage = ({ history }) => {
    const uiConfig = {
        signInFlow: "redirect",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/documents',
        callbacks: {
            // signInSuccess: data => { history.push(`/documents/edit/123`) }
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                history.push(`/documents/edit/${user.uid}`)
            }
        })
    }, []);

    return (
        <StyledFirebaseAuth
            width="100%"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            siteName='Lunar Docs'
            tosUrl='lunardocs.com'
            immediateFederatedRedirect={true}
          />
    );
};

LoginPage.propTypes = {};

export default withRouter(LoginPage);