import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

import { getTheme } from './store/selectors';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './theme/globalStyle';
import NavBar from './components/navbar';
import DocumentBrowser from './containers/document-browser';
import Editor from './containers/editor';
import LandingPage from './containers/landing-page';
import LoginPage from './containers/login-page';
import './App.css'
import EditorNavBar from './containers/editor/editor-nav-bar';

firebase.initializeApp({
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const AppContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    min-width: 100vw;
    min-height: 100vh;

    background-color: ${({ theme }) => theme.palette.background};
`;

const App = () => {
    const theme = useSelector(getTheme);
    
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle/>
            <Router>
                <AppContainer>
                    <Switch>
                        <Route path="/" exact component={LandingPage}/>
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/documents" exact>
                            <NavBar/>
                            <DocumentBrowser/>
                        </Route>
                        <Route path="/documents/edit/:id" exact>
                            <EditorNavBar/>
                            <Editor/>
                        </Route>
                    </Switch>
                </AppContainer>
            </Router>
        </ThemeProvider>
    )
}


export default App;
