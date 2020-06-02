import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
  }

  html, body, div#root {
    min-height: 100%;
  }

  body {
    background: #777;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif, "Roboto";
  }

  button {
    cursor: pointer;
  }

`;
