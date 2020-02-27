import React from "react";
import { Grid, Button, AppBar } from "@material-ui/core";
import { Container, StyledTextField, StyledButton, Title, FontButton } from "./styles";
import { Link } from "react-router-dom";

export default function FormHired() {
  return (
    <>
      <AppBar position="static">
        <Grid container justify="center">
          <Grid item>
            <div style={{ marginRight: "20px" }}>
              <Button color="inherit" onClick={() => {}}>
                <p style={{ fontSize: "18px" }}>Adicionar contratado</p>
              </Button>
            </div>
          </Grid>
        </Grid>
      </AppBar>

      <Container container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Title>[PSDB] Prefeito 1 | Gerente 1</Title>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item>
            <StyledTextField label="Nome completo" variant="outlined" />
          </Grid>
          <Grid item>
            <StyledTextField label="CPF" variant="outlined" />
          </Grid>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item>
            <StyledTextField label="Função" variant="outlined" />
          </Grid>
          <Grid item>
            <StyledTextField label="CEP" variant="outlined" />
          </Grid>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item>
            <StyledTextField label="Rua" variant="outlined" />
          </Grid>
          <Grid item>
            <StyledTextField label="Número" variant="outlined" />
          </Grid>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item>
            <StyledTextField label="Bairro" variant="outlined" />
          </Grid>
          <Grid item>
            <StyledTextField label="Cidade" variant="outlined" />
          </Grid>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item>
            <StyledTextField label="Telefone" variant="outlined" />
          </Grid>
          <Grid item>
            <StyledTextField label="Pagamento" variant="outlined" />
          </Grid>
        </Grid>
        <Grid item>
          <Link to="/dashboard"><StyledButton variant="contained" size="large" color="secondary">
            <FontButton>OK</FontButton>
          </StyledButton></Link>
        </Grid>
      </Container>
    </>
  );
}
