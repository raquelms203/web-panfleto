import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Title = styled.p`
  font: 20px Roboto, serif;
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Token = styled.p`
  font: bold 40px Roboto, serif;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  letter-spacing: 10px;
`;

export const ButtonOK = styled(Button)`  
  height: 50px;
  width: 200px;
`;
