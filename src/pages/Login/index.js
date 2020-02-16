import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  CardLogin,
  ButtonLogin,
  Title,
  Card,
  StyledGrid
} from "./styles";
import { TextField, Button, Grid, Paper } from "@material-ui/core";
import Computer from "../../assets/computer.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StyledGrid container direction="row">
      <Grid container justify="center" alignItems="center">
        <Grid item sm={12} md={4}>
          <Paper>
            <CardLogin>
              <img
                src={Computer}
                style={{maxHeight: "302px", maxWidth: "302px", justify: "center" }}
              ></img>
            </CardLogin>
          </Paper>
        </Grid>
        <Grid item sm={12} md={4}>
          <Paper>
            <form noValidate autoComplete="off">
              <CardLogin>
                <Title>Faça login para entrar no sistema</Title>
                <TextField label="Email" variant="outlined" />
                <div style={{ height: "15px" }}></div>
                <TextField label="Senha" variant="outlined" />
                <div style={{ height: "25px" }}></div>
                <Link to="/dashboard">
                  <ButtonLogin>Entrar</ButtonLogin>
                </Link>
              </CardLogin>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </StyledGrid>
  );
}
