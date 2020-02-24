import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardLogin,
  ButtonLogin,
  Title,
  StyledGrid
} from "./styles";
import { TextField, Grid, Paper } from "@material-ui/core";
import Computer from "../../assets/computer.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StyledGrid container justify="center" alignItems="center">
        <Grid item justify="center" alignItems="center" >
           <CardLogin>
              <img
                src={Computer}
                alt="login"
                style={{maxHeight: "302px", maxWidth: "302px", justify: "center" }}
              ></img>
            </CardLogin>
        </Grid>
        <Grid item justify="center" alignItems="center" >
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
        </Grid>
     
    </StyledGrid>
  );
}
