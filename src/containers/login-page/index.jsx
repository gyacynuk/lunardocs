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
        signInSuccessUrl: '/documents',
    }

    useEffect(() => {
        // Select the node that will be observed for mutations
        const targetNode = document.getRootNode();

        // Options for the observer (which mutations to observe)
        const config = { attributes: false, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(let mutation of mutationsList) {
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

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

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