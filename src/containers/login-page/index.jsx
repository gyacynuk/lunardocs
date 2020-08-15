import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import PageLoadingAnimation from '../../components/page-loading-animation';
import { fire } from '../../api';
import firebase from 'firebase';


const LoginPage = ({ history }) => {
    const dispatch = useDispatch();
    const uiConfig = {
        signInFlow: "redirect",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: '/documents'
    }

    useEffect(() => {
        // Listen for user sign in
        fire.auth().onAuthStateChanged(user => {
            // Redirect automatically if user is already signed in
            if (user) {
                history.push('/documents')
            }
        })

        // Callback function to replace FirebaseAuthUI login loader with custom loader
        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.target.id === 'firebaseui_container') {
                    ReactDOM.render(
                        <PageLoadingAnimation/>,
                        document.body.appendChild(mutation.target)
                    );
                }
            }
        }

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        observer.observe(document.getRootNode(), { attributes: false, childList: true, subtree: true });

        return () => {
            observer.disconnect();
        }
    })

    return (
        <StyledFirebaseAuth
            width="100%"
            uiConfig={uiConfig}
            firebaseAuth={fire.auth()}
            siteName='Lunar Docs'
            tosUrl='lunardocs.com'
          />
    );
};

LoginPage.propTypes = {};

export default withRouter(LoginPage);