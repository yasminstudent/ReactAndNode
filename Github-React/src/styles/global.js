//Importações de dependecias
import { createGlobalStyle } from 'styled-components';

//Estilização padronizada do sistema
//Arquivo importado no App.js
export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    height: 100%;
  }

  body{
    background-color: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button{
    cursor: pointer;
  }
`;
