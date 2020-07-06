import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './store/selectors';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './theme/globalStyle'
import NavBar from './components/Navbar'
import DocumentBrowser from './containers/DocumentBrowser';

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
            <AppContainer>
                <NavBar/>
                <DocumentBrowser/>
            </AppContainer>
        </ThemeProvider>
    )
}


export default App;
