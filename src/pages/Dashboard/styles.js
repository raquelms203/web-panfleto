import styled from "styled-components";
import { Grid, Button } from "@material-ui/core";

export const StyledGrid = styled(Grid)`
  height: 100%;
  padding-top: 20px;
`;

export const Logo = styled.img`
  padding: 0;
  margin: 0;
  height: 27px;
  margin-left: 20px;
`;

export const Separator = styled.div`
  width: 2px;
  background: #babdc2;
`;

export const SpaceDiv = styled.div`
  margin-left: 45;
  margin-top: 10;
  margin-bottom: 0;
  padding-bottom: 0;
`;

export const Subtitle = styled.p`
  padding-left: 8px;
`;

export const FontToken = styled.p`
  text-align: center;
  font-size: 40px;
  color: #2b5279;
  letter-spacing: 8px;
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
  font: 15px Microsoft New Tai Lue;
  letter-spacing: 0.4px;
  pre {
    color: #2b5279;
    font: 15px Microsoft New Tai Lue;
  }
`;

export const FontButton = styled.p`
  color: #fff;
`;

export const StyledButton = styled(Button)`
  margin-top: 30px;
  width: 150px;
`;
