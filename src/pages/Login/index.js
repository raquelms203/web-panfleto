import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Grid, CircularProgress } from "@material-ui/core";

import Computer from "../../assets/computer.png";
import { ButtonLogin, Title, StyledGrid } from "./styles";
import * as validate from "./validationSchema";
import { apiADM } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const imageWidth = () => {
    if (!Boolean(email.error) && !Boolean(password.error)) return 295.5;
    else if (!Boolean(email.error) && Boolean(password.error)) return 325;
    else if (Boolean(email.error) && !Boolean(password.error)) return 325;
    else if (Boolean(email.error) && Boolean(password.error)) return 350;
  };

  const sendLogin = async () => {
    setLoading(true);
    await apiADM
      .post("/login", {
        email: email.value,
        password: password.value,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("username", response.data.username);
        console.log(response);
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validateField = () => {
    let allValid = true;
    if (validate.validateEmail(email.value) !== "") {
      setEmail({
        value: email.value,
        error: validate.validateEmail(email.value),
      });
      allValid = false;
    }
    if (validate.validatePassword(password.value) !== "") {
      setPassword({
        value: password.value,
        error: validate.validatePassword(password.value),
      });
      allValid = false;
    }
    if (allValid) {
      sendLogin();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateField();
  };

  if (loading)
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "99vh" }}
      >
        <CircularProgress />
      </Grid>
    );

  return (
    <StyledGrid container alignItems="center" justify="space-around">
      <Grid item container justify="center" alignItems="center">
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ background: "white" }}
          xs={12}
          sm={5}
          md={4}
        >
          <img src={Computer} alt="login" style={{ width: imageWidth() }}></img>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ background: "white", padding: 20 }}
          xs={12}
          sm={6}
          md={4}
        >
          <Grid item xs sm md>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Title>Faça login para entrar no sistema</Title>
              <div style={{ height: 20, width: 350 }}></div>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Email"
                size="small"
                variant="outlined"
                value={email.value}
                onChange={(event) =>
                  setEmail({
                    value: event.target.value,
                    error: email.error,
                  })
                }
                error={Boolean(email.error)}
                helperText={email.error}
              />
              <div style={{ height: 16 }}></div>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                type="password"
                label="Senha"
                variant="outlined"
                onChange={(event) =>
                  setPassword({
                    value: event.target.value,
                    error: password.error,
                  })
                }
                error={Boolean(password.error)}
                helperText={password.error}
              />
              <div style={{ height: "30px" }}></div>
              <ButtonLogin type="submit">Entrar</ButtonLogin>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
}
