import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *:after,
  *::before {
    box-sizing: border-box;
    transition: color 400ms ease;
    transition: background-color 400ms ease;
  }

  html {
    font-size: ${({ theme }) => theme.typography.htmlFontSize}px;
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }

  body {
    background-color: ${({ theme }) => theme.palette.background};
  }

  h1 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h1.fontFamily};
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
  }
  
  h2 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h2.fontFamily};
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
  }

  h3 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h3.fontFamily};
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
  }

  h4 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h4.fontFamily};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    line-height: ${({ theme }) => theme.typography.h4.lineHeight};
  }

  h5 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h5.fontFamily};
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
    line-height: ${({ theme }) => theme.typography.h5.lineHeight};
  }

  h6 {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.h6.fontFamily};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
    font-weight: ${({ theme }) => theme.typography.h6.fontWeight};
    line-height: ${({ theme }) => theme.typography.h6.lineHeight};
  }
`