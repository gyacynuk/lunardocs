import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import { getTheme } from './redux/selectors';
import { toggleDisplayMode } from './redux/actions'
import { lightTheme, darkTheme } from './theme';
import Button from './components/EditorControlBar';
import './App.css';

const AppContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    min-width: 100vw;
    min-height: 100vh;

    background-color: ${({ theme }) => theme.palette.background};
`;

const Text = styled.p`
    color: ${({ theme }) => theme.palette.text.heavy};
`

const SmallText = styled.p`
    font-size: 10px;
    color: ${({ theme }) => theme.palette.text.light};
`

const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector(getTheme);
    
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <AppContainer>
                <Text>{"Hello World " + theme}</Text>
                <SmallText>I am so tiny</SmallText>
                <a
                className="App-link"
                onClick={() => dispatch(toggleDisplayMode())}
                >
                Toggle Theme
                </a>
            </AppContainer>
        </ThemeProvider>
    )
}


export default App;
