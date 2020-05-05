import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const Bold = styled.p`
  font: bold 14px "Trebuchet MS";
  span {
    font: 14px "Trebuchet MS";
  }
`;

export const Body = styled.p`
  font: 14px "Trebuchet MS";
`;

export const Page = styled(Grid)`
  max-width: 650px;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  text-align: justify;
  padding-bottom: 60px;
`;
