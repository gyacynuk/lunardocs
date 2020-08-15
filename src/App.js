import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';

import { getTheme } from './store/selectors';
import { lightTheme, darkTheme, landingTheme } from './theme';
import GlobalStyle from './theme/globalStyle';
import NavBar from './components/navbar';
import DocumentBrowser from './containers/document-browser';
import Editor from './containers/editor';
import LandingPage from './containers/landing-page';
import LoginPage from './containers/login-page';
import './App.css'
import EditorNavBar from './containers/editor/editor-nav-bar';
import { setAuthUser, fetchUserAsync } from './store/actions';
import PrivateRoute from './components/private-route';

const AppContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    min-width: 100vw;
    min-height: 100vh;

    overflow-y: auto;

    background-color: ${({ theme }) => theme.palette.background};
`;

const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector(getTheme);
    const themeMap = {
        'light': lightTheme,
        'dark': darkTheme,
        'landing': landingTheme
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(fetchUserAsync(user.uid))
            }
            dispatch(setAuthUser(user))
        });
    }, [dispatch]);
    
    return (
        <ThemeProvider theme={themeMap[theme]}>
            <GlobalStyle/>
            <Router>
                <AppContainer id='appContainer'>
                    <Switch>
                        <Route path="/" exact component={LandingPage}/>
                        <Route path="/login" exact component={LoginPage}/>
                        <PrivateRoute path="/documents" exact>
                            <NavBar/>
                            <DocumentBrowser/>
                        </PrivateRoute>
                        <PrivateRoute path="/documents/edit/:id" exact>
                            <EditorNavBar/>
                            <Editor/>
                        </PrivateRoute>
                    </Switch>
                </AppContainer>
            </Router>
        </ThemeProvider>
    )
}


export default App;
