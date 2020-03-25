import styled from "styled-components";
import { Select, FormHelperText } from "@material-ui/core";

export const ErrorText = styled.p`
  padding-left: 13px;
  padding-top: 3px;
  font-size: 13px;
  color: red;
  background: white;
`;

export const StyledSelect = styled(Select)`
  height: 42px;
  background: white;
  border: 1px solid red;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  padding-left: 15px;
`;
