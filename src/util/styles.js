import { createGlobalStyle } from "styled-components";
import { normalize } from 'styled-normalize';

export default createGlobalStyle`  
${normalize}
 
 * {  
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
   text-decoration: none;
 }

 body, input, button {  
   font: 14px Roboto, sans-serif;
   background: #ecf0f9; 
 }
 
 button {  
   cursor: pointer;
   
 }
`;
