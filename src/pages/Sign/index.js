import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Title, Token, ButtonOK } from "./styles";

export default function Sign(props) {
  const { location } = props;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Title>
          Código gerado 19h36. Válido até 20h36.
          <br />
          <br />
          Para concluir o cadastro baixe o aplicativo E-CONTRATO para celular e
          use o código:
        </Title>
      </Grid>

      <Grid item>
        <Token>{location.state.token}</Token>
      </Grid>
      <Grid item>
        <div style={{ height: "50px" }}></div>
        <Link to="/dashboard">
          <ButtonOK size="large" variant="contained" color="primary">
            OK
          </ButtonOK>
        </Link>
      </Grid>
    </Grid>
  );
}
