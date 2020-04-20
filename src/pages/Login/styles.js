import styled from "styled-components";
import { Grid, Button, Paper } from "@material-ui/core";


export const StyledGrid = styled(Grid)`
  margin: 20px;
  min-height: 85vh;
  overflow-x: hidden;
  width: 100%;
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

export const Title = styled.p`
  font: bold 17px Roboto, serif;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const StyledPaper = styled(Paper)`
  padding: 30px;
  width: 400px;  
`;

