import React, { useState, useEffect } from "react";
import { Container, CardLogin } from "./styles";
import { Box, Grid, TextField } from "@material-ui/core";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid container direction="column">
    
        <Grid item>
          <Container>
            <form noValidate autoComplete="off">
              <CardLogin>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                  />
                </Grid>
              </CardLogin>
            </form>
          </Container>
      </Grid>
         <Grid item><p>Oi</p></Grid>
    </Grid>
  );
}
