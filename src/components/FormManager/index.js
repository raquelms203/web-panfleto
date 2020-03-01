import React from "react";
import { Grid } from "@material-ui/core";
import {
  Container,
  StyledLargeTextField,
  StyledButton,
  Title,
  FontButton
} from "../FormHired/styles";

export default function FormManager(props) {
  const { onClick } = props;

  return (
    <Container container direction="column" justify="flex-start" spacing={2}>
      <Grid item>
        <Title>[PSDB] Prefeito 1</Title>
      </Grid>
      <Grid item>
        <StyledLargeTextField label="Nome completo" variant="outlined" />
      </Grid>
      <Grid item>
        <StyledLargeTextField label="CPF" variant="outlined" />
      </Grid>
      <Grid item>
        <StyledLargeTextField label="Email" variant="outlined" />
      </Grid>
      <Grid item container direction="row-reverse">
          <StyledButton
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => onClick()}
          >
            <FontButton>OK</FontButton>
          </StyledButton>
      </Grid>
    </Container>
  );
}
