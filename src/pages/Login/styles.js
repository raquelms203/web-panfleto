import styled from "styled-components";
import { Grid } from "@material-ui/core";


export const StyledGrid = styled(Grid)`
  padding: 20px;
  min-height: 100vh;
`;

export const CardLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  padding: 20px;
  width: 380px;
  min-width: 100px;
  background-color: white;
  color: black;
  
`;

export const ButtonLogin = styled.div`
  background-color: #4caf50; /* Green */
  width: 150px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

export const Title = styled.p`
  font: bold 20px Roboto, serif;
  text-align: center;
  padding-left: 20px;
`;

