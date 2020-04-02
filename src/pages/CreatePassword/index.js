import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

import { apiADM } from "../../services/api";
import { validatePassword } from "./validationSchema";
import { StyledButton, Container } from "../../components/FormHired/styles";
import Logo from "../../assets/logo.svg";
import { RoundedDiv } from "./styles";

export default function CreatePassword(props) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState({ value: "", error: "" });

  const handleSubmit = event => {
    event.preventDefault();
    let errorValidate = validatePassword(password, password2.value);
    console.log(errorValidate);
    if (errorValidate !== "") {
      setPassword("");
      setPassword2({ value: "", error: errorValidate });
      return;
    }
    let path = window.location.pathname;
    let href = window.location.href;
    let token = path.split("/")[2];
    let type = href.split("=")[1];
    if (type === "admin") type = "administrator";
    console.log(`${type}/create-password/${token}`);
    apiADM
      .put(`${type}/create-password/${token}`, {
        password: password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <div style={{ height: 20 }}></div>
          <Grid item xs sm md>
            <RoundedDiv>
              <img src={Logo} />
            </RoundedDiv>
          </Grid>

          <Grid item xs sm md>
            <h2>Cadastre a sua senha</h2>
          </Grid>

          <Grid item xs sm md>
            <TextField
              style={{ width: 350, background: "white" }}
              InputLabelProps={{ shrink: true }}
              size="small"
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={event => setPassword(event.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs sm md>
            <TextField
              style={{ width: 350, background: "white" }}
              InputLabelProps={{ shrink: true }}
              size="small"
              type="password"
              label="Confirmar senha"
              variant="outlined"
              value={password2.value}
              onChange={event =>
                setPassword2({
                  value: event.target.value,
                  error: password2.error
                })
              }
              error={Boolean(password2.error)}
              helperText={password2.error}
            ></TextField>
          </Grid>
          <div style={{ height: 20 }}></div>
          <StyledButton
            type="submit"
            variant="contained"
            color="secondary"
            style={{ color: "white" }}
          >
            OK
          </StyledButton>
        </Grid>
      </form>
    </Container>
  );
}
