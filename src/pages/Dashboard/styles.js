import styled from "styled-components";
import {Grid} from "@material-ui/core";

export const Container = styled.div`  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100vh;
  background: #ecf0f9;
`;

export const StyledGrid = styled(Grid)`
  height: 100vh;
  padding: 50px;

`