import styled from "styled-components";
import { Grid, Button } from "@material-ui/core";

export const StyledGrid = styled(Grid)`
  height: 100%;
  padding: 20px;
`;

export const Logo = styled.p`
  font: 20px Marlett;
  margin-left: 20px;
  margin-top: 6px;
`;

export const TitleAppBar = styled.div`
  display: flex;
  button {
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
  background: #b5c5fb;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: white;
  background: #454545;
  font: 20px Microsoft New Tai Lue;
  letter-spacing: 0.4px;
`;
