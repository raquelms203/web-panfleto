import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, CardLogin, ButtonLogin, Title, Card } from "./styles";
import { TextField, Button } from "@material-ui/core";
import Computer from "../../assets/computer.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Card>
        <img src={Computer}></img>
      </Card>

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
    </Container>
  );
}
