import { React } from "react";
import styled from "styled-components";
import { ListItem } from "@material-ui/core";

export const TextOverflow = styled.div` 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 8px;
`;

