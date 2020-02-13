import React, { useState, useEffect } from "react";
import { Container, CardLogin, ButtonLogin, Title } from "./styles";
import { TextField, Button } from "@material-ui/core";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <form noValidate autoComplete="off">
        <CardLogin>
          <Title>Faça login para entrar no sistema</Title>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <div style={{ height: "15px" }}></div>
          <TextField id="outlined-basic" label="Senha" variant="outlined" />
          <div style={{ height: "25px" }}></div>
          <ButtonLogin>Entrar</ButtonLogin>
        </CardLogin>
      </form>
    </Container>
  );
}
