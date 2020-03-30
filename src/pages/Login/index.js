import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Grid } from "@material-ui/core";

import Computer from "../../assets/computer.png";
import { ButtonLogin, Title, StyledGrid } from "./styles";
import * as validate from "./validationSchema";

export default function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const history = useHistory();

  const validateField = () => {
    let allValid = true;
    if (validate.validateEmail(email.value) !== "") {
      setEmail({
        value: email.value,
        error: validate.validateEmail(email.value)
      });
      allValid = false;
    }
    if (validate.validatePassword(password.value) !== "") {
      setPassword({
        value: password.value,
        error: validate.validatePassword(password.value)
      });
      allValid = false;
    }
    if (allValid) {
      history.push("/dashboard");
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateField();
  };

  return (
      <StyledGrid container alignItems="center" justify="space-around" >
        <Grid item container justify="center" alignItems="stretch" >
          <Grid item style={{ background: "white" }}>
              <img
                src={Computer}
                alt="login"
                style={{
                  maxHeight: "auto",
                  maxWidth: "311.6px",
                  justify: "center"
                }}
              ></img>
          </Grid>
          <Grid item style={{ background: "white", padding: 20 }} >
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  spacing={2}
                >
                  <Grid item xs>
                    <Title>Faça login para entrar no sistema</Title>
                  </Grid>
                  <div style={{ height: "15px" }}></div>
                  <Grid item xs>
                    <TextField
                      style={{ width: 255 }}
                      label="Email"
                      variant="outlined"
                      value={email.value}
                      onChange={event =>
                        setEmail({
                          value: event.target.value,
                          error: email.error
                        })
                      }
                      error={Boolean(email.error)}
                      helperText={email.error}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      style={{ width: 255 }}
                      label="Senha"
                      variant="outlined"
                      onChange={event =>
                        setPassword({
                          value: event.target.value,
                          error: password.error
                        })
                      }
                      error={Boolean(password.error)}
                      helperText={password.error}
                    />
                  </Grid>
                  <div style={{ height: "10px" }}></div>
                  <Grid item>
                    <ButtonLogin type="submit">Entrar</ButtonLogin>
                  </Grid>
                </Grid>
            </form>
          </Grid>
        </Grid>
      </StyledGrid>
  );
}
