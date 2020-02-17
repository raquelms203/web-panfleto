import { createGlobalStyle } from "styled-components";
import { normalize } from 'styled-normalize';

export default createGlobalStyle`  
${normalize}
 
 * {  
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
 }

 body, input, button {  
   font: 14px Roboto, sans-serif;
   
  
 }
 
 button {  
   cursor: pointer
 }
`;
