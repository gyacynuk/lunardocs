import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *:after,
  *::before {
    box-sizing: border-box;
    transition: color 400ms ease;
    transition: background-color 400ms ease;
  }

  body {
      background-color: ${({ theme }) => theme.palette.background}
  }
`