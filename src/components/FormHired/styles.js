import styled from 'styled-components';
import { Grid, TextField, Button } from "@material-ui/core";

export const Container = styled(Grid)`
  padding: 10px;
  height: 100%;
  width: 100%;
`;


export const StyledLargeTextField = styled(TextField)`  
  background: white;
  width: 255px;

`;

export const StyledSmallTextField = styled(TextField)`  
  background: white;
  width: 120px;

`;

export const StyledMediumTextField = styled(TextField)`  
  background: white;
  width: 180px;

`;

export const StyledButton = styled(Button)`  
  margin-top: 30px;
  width: 150px;
`;

export const Title = styled.p`  
  font: 18px Calibri;
`;

export const FontButton = styled.p`  
  color: #FFF;
`;