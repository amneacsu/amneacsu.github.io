import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --light0: #fbf1c7;
    --dark0: #282828;
    --dark1: #3c3836;
    --dark0-hard: #1d2021;
    --dark0-soft: #32302f;
    --bright-blue: #83a598;
  }

  body {
    margin: 0;
    background: var(--dark0);
    color: var(--light0);
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
  }

  a {
    color: var(--bright-blue);
  }
`;
