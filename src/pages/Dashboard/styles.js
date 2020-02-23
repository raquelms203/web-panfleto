import styled from "styled-components";
import { Grid } from "@material-ui/core";


export const StyledGrid = styled(Grid)`
  height: 100%;
  padding: 20px;

`;

export const TitleAppBar = styled.div`  
  display: flex;
  Button {  
    margin-left: auto;
    color: inherit;
  }
`;

export const Separator = styled.div`  
   width: 2px;
    background: #babdc2;
`;

export const Subtitle = styled.p`  
  padding-left: 8px;
`;

export const LabelFilter = styled.p`  
  border-radius: 25px;
  border: 2px solid #b5c5fb;
  padding-left: 3px;
  padding-right: 3px;
  font: bold 12px Roboto, serif;
  letter-spacing: 0.8px;
  color: #000;
  background:  #b5c5fb;

`;