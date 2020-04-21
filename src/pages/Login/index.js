import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  CircularProgress,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Computer from "../../assets/logo_2.svg";
import { Title, StyledPaper } from "./styles";
import * as validate from "./validationSchema";
import { apiADM } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const history = useHistory();

  // const imageWidth = () => {
  //   if (!Boolean(email.error) && !Boolean(password.error)) return 295.5;
  //   else if (!Boolean(email.error) && Boolean(password.error)) return 325;
  //   else if (Boolean(email.error) && !Boolean(password.error)) return 325;
  //   else if (Boolean(email.error) && Boolean(password.error)) return 350;
  // };

  const sendLogin = async () => {
    setLoading(true);
    await apiADM
      .post("/login", {
        email: email.value,
        password: password.value,
      })
      .then(function (response) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("username", response.data.username);
        history.push("/dashboard");
      })
      .catch(function (error) {
        setLoading(false);
        if (Boolean(error.response) && error.response.status === 401) {
          setPassword({
            value: password.value,
            error: "Email ou senha incorretos",
          });
        } else if (Boolean(error.response) && error.response.status === 404) {
          setPassword({
            value: password.value,
            error: "Usuário não cadastrado",
          });
        }
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

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "95vh" }}
    >
      <Grid item>
        <StyledPaper>
          <Grid item container justify="center" xs={12} sm={12} md={12}>
            <img
              src={Computer}
              alt="login"
              style={{ width: 150 }}
            ></img>
          </Grid>
          <Grid
            item
            container
            xs={12} sm={12} md={12}
            direction="column"
            alignItems="stretch"
            justify="center"
            style={{ maxWidth: 400 }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Title>Faça login para entrar no sistema</Title>
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button>
                          {hidePass ? (
                            <VisibilityOff onClick={() => setHidePass(false)} />
                          ) : (
                            <Visibility onClick={() => setHidePass(true)} />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type={hidePass ? "password" : "text"}
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
                {loading ? (
                  <Grid container justify="center">
                    <Grid item>
                      <CircularProgress size={35} />
                    </Grid>
                  </Grid>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Entrar
                  </Button>
                )}
              </form>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}
