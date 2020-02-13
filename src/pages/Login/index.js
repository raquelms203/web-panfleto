import React, { useState, useEffect } from "react";
import { Container, CardLogin } from "./styles";
import { Box, Grid, TextField } from "@material-ui/core";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <CardLogin>
          <form noValidate autoComplete="off">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <TextField id="outlined-basic" label="Email" variant="outlined" />
              <TextField id="outlined-basic" label="Senha" variant="outlined" />
            </Grid>
          </form>
        </CardLogin>
      </Grid>
    </Container>
  );
}
