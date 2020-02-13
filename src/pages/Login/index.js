import React, { useState, useEffect } from "react";
import { Container, CardLogin } from "./styles";
import { Box, Grid, TextField } from "@material-ui/core";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <form noValidate autoComplete="off">
        <CardLogin>
          <Grid item m={4}>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" label="Senha" variant="outlined" />
          </Grid>
        </CardLogin>
      </form>
    </Container>
  );
}
