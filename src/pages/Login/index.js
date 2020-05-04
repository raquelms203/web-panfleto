import React, { useState, useEffect } from "react";
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
import { Title, BackgroundWhite } from "./styles";
import * as validate from "./validationSchema";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [emailForgot, setEmailForgot] = useState({ value: "", error: "" });
  const [forgotPass, setForgotPass] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const history = useHistory();

  const sendLogin = async () => {
    setLoading(true);
    await apiADM
      .post("/login", {
        email: email.value.toLowerCase(),
        password: password.value,
      })
      .then(function (response) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isLogged", true);
        localStorage.setItem("username", response.data.username);
        if (response.data.userType === "admin") history.push("/dashboard");
        else history.push("/dashboard-gestor");
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

  const sendForgotPass = async (event) => {
    event.preventDefault();
    if (validate.validateEmail(emailForgot.value) !== "") {
      setEmail({
        value: email.value,
        error: validate.validateEmail(email.value),
      });
      return;
    }
    await apiADM
      .post("/remember-password", {
        email: emailForgot.value.toLowerCase(),
      })
      .then(() => {
        toast.success("Email para redefinir senha enviado com sucesso!");
        setForgotPass(false);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao enviar email de recuperação!");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateField();
  };

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") history.push("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid item container justify="center" style={{ minHeight: "95vh"}}>
      <Grid
        item
        container
        direction="column"
        justify="center"
        style={{ maxWidth: 450 }}
      >
        <BackgroundWhite item>
          <Grid item container justify="center" xs={12} sm={12} md={12}>
            <img src={Computer} alt="login" style={{ width: 150 }}></img>
          </Grid>
          {!forgotPass ? (
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              direction="column"
              justify="center"
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
                              <VisibilityOff
                                onClick={() => setHidePass(false)}
                              />
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
                  <Grid container justify="flex-end">
                    <Grid item style={{ marginTop: 10 }}>
                      <button
                        type="button"
                        style={{ background: "white", border: "none" }}
                        onClick={() => setForgotPass(true)}
                      >
                        <p style={{ textDecoration: "underline" }}>
                          Esqueci minha senha
                        </p>
                      </button>
                    </Grid>
                  </Grid>
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
          ) : (
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              direction="column"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12}>
                <form autoComplete="off" onSubmit={sendForgotPass}>
                  <Title>Para redefinir a senha, insira o seu email</Title>
                  <TextField
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="Email"
                    size="small"
                    variant="outlined"
                    value={emailForgot.value}
                    onChange={(event) =>
                      setEmailForgot({
                        value: event.target.value,
                        error: emailForgot.error,
                      })
                    }
                    error={Boolean(emailForgot.error)}
                    helperText={emailForgot.error}
                  />
                  <div style={{ height: 16 }} />
                  <Grid container justify="flex-end" spacing={2}>
                    <Grid item>
                      <Button
                        size="large"
                        style={{ background: "#958a94", color: "white" }}
                        onClick={() => setForgotPass(false)}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Enviar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          )}
        </BackgroundWhite>
      </Grid>
    </Grid>
  );
}
