import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import PageLoadingAnimation from '../../components/page-loading-animation';


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

    useEffect(() => {
        // Select the node that will be observed for mutations
        const targetNode = document.getRootNode();

        // Options for the observer (which mutations to observe)
        const config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                    console.log(mutation.target.id)
                    if (mutation.target.id === 'firebaseui_container') {
                        ReactDOM.render(
                            <PageLoadingAnimation/>,
                            document.body.appendChild(mutation.target)
                         );
                    }
                }
                else if (mutation.type === 'attributes') {
                    console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        return () => {
            // Later, you can stop observing
            observer.disconnect();
        }
    })

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