import React, { useState, useCallback, useEffect } from "react";
import {
  Grid,
  TextField,
  CircularProgress,
  InputAdornment,
  Button,
  Paper,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { apiADM } from "../../services/api";
import { validatePassword } from "./validationSchema";
import { StyledButton, Container } from "../../components/FormHired/styles";
import Logo from "../../assets/logo.svg";
import Wait from "../../assets/wait.svg";
import { RoundedDiv } from "./styles";
import ErrorPage from "../ErrorPage";
import Loading from "../../components/Loading";

export default function CreatePassword(props) {
  const [loading, setLoading] = useState(false);
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState({ value: "", error: "" });
  const [tokenValid, setTokenValid] = useState();
  const history = useHistory();
  const path = window.location.pathname;
  const token = path.split("/")[2];
  var type = window.location.href.split("=")[1].split("&")[0];
  var action = window.location.href.split("=")[2];

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errorValidate = validatePassword(password, password2.value);
    if (errorValidate !== "") {
      setPassword("");
      setPassword2({ value: "", error: errorValidate });
      return;
    }
    setLoading(true);
    setPassword2({ value: password2.value, error: "" });

    if (type === "admin") type = "administrator";
    await apiADM
      .put(`${type}/create-password/${token}`, {
        password: password,
      })
      .then((response) => {
        toast.success(
          "Sucesso!\nVocê será redirecionado para a tela de login.",
          {
            onClose: function () {
              history.push("/");
            },
            autoClose: 4000,
          }
        );
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao criar a senha!");
      })
      .finally(() => setLoading(false));
  };

  const verifyToken = useCallback(async () => {
    await axios
      .get(`http://161.35.5.72/api/v1/token/is-valid-token/${token}`, {
        headers: { key: `${process.env.REACT_APP_KEY}` },
      })
      .then(function (response) {
        setTokenValid(response.data.isValidToken);
      })
      .catch(function (error) {});
  }, [setTokenValid, token]);

  useEffect(() => {
    localStorage.clear();
    verifyToken();
  }, [verifyToken]);

  if (tokenValid === undefined) return <Loading />;
  else
    return tokenValid ? (
      <form onSubmit={handleSubmit}>
        <Container
          container
          justify="center"
          alignItems="center"
          style={{ padding: 10 }}
        >
          <Paper style={{ padding: 20, marginTop: 30 }}>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="stretch"
              spacing={2}
              style={{ maxWidth: 350 }}
            >
              <div style={{ height: 20 }}></div>
              <Grid item xs sm md>
                <RoundedDiv>
                  <img alt="" src={Logo} />
                </RoundedDiv>
              </Grid>
              <Grid item xs sm md>
                {action === "criar" ? (
                  <h2 style={{ textAlign: "center" }}>Cadastre a sua senha</h2>
                ) : (
                  <h2 style={{ textAlign: "center" }}>Redefina a sua senha</h2>
                )}
              </Grid>
              <Grid item xs sm md>
                <p>
                  A senha deve conter pelo menos 6 caracteres com letras e
                  números.
                </p>
              </Grid>
              <div style={{ height: 10 }}></div>
              <Grid item xs sm md>
                <TextField
                  style={{ backgroundColor: "white" }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button>
                          {hidePass1 ? (
                            <VisibilityOff
                              onClick={() => setHidePass1(false)}
                            />
                          ) : (
                            <Visibility onClick={() => setHidePass1(true)} />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type={hidePass1 ? "password" : "text"}
                  label="Senha"
                  variant="outlined"
                  onChange={(event) => setPassword(event.target.value)}
                  error={Boolean(password.error)}
                  helperText={password.error}
                />
              </Grid>
              <Grid item xs sm md>
                <TextField
                  style={{ backgroundColor: "white" }}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button>
                          {hidePass2 ? (
                            <VisibilityOff
                              onClick={() => setHidePass2(false)}
                            />
                          ) : (
                            <Visibility onClick={() => setHidePass2(true)} />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  type={hidePass2 ? "password" : "text"}
                  label="Confirmar senha"
                  variant="outlined"
                  onChange={(event) =>
                    setPassword2({
                      value: event.target.value,
                      error: password2.error,
                    })
                  }
                  error={Boolean(password2.error)}
                  helperText={password2.error}
                />
              </Grid>
              <div style={{ height: 20 }}></div>
              {loading ? (
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress size={35} />
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs xm md container justify="center">
                  <Grid item>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{ color: "white" }}
                    >
                      SALVAR
                    </StyledButton>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </form>
    ) : (
      <ErrorPage
        title="Token expirado ou não existe"
        message="Entre em contato com o administrador para solicitar um novo email."
        file={Wait}
      />
    );
}
