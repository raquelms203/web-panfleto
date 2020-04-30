import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export default createGlobalStyle`  
${normalize}
 
 * {  
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
   text-decoration: none;

   &::-webkit-scrollbar {
        width: 8px;
        height: 5px;
      }
      &::-webkit-scrollbar-track {
        background: #eee;
      }
      &::-webkit-scrollbar-thumb {
        background: #adadad;
        -webkit-box-shadow: inset 0 0 1px #565656;
        box-shadow: inset 0 0 1px #565656;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(left, #888, #777);
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
  }
  body, input, button {  
    font: 14px Roboto, sans-serif;
    background: #ecf0f9; 
  }

  button {  
    cursor: pointer;
    
  }
`;
