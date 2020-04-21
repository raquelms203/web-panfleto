import React, { useState, useCallback, useEffect } from "react";
import { Grid, TextField, CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";

import { apiADM } from "../../services/api";
import axios from "axios";
import { validatePassword } from "./validationSchema";
import { StyledButton, Container } from "../../components/FormHired/styles";
import Logo from "../../assets/logo.svg";
import Wait from "../../assets/wait.svg";
import { RoundedDiv } from "./styles";
import ErrorPage from "../ErrorPage";
import Loading from "../../components/Loading";

export default function CreatePassword(props) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState({ value: "", error: "" });
  const [tokenValid, setTokenValid] = useState();
  const history = useHistory();
  const path = window.location.pathname;
  const token = path.split("/")[2];
  var type = window.location.href.split("=")[1];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let errorValidate = validatePassword(password, password2.value);
    if (errorValidate !== "") {
      setPassword("");
      setPassword2({ value: "", error: errorValidate });
      return;
    }
    setPassword2({ value: password2.value, error: "" });

    if (type === "admin") type = "administrator";
    await apiADM
      .put(`${type}/create-password/${token}`, {
        password: password,
      })
      .then((response) => {
        toast.success(
          "Senha criada com sucesso!\nVocê será redirecionado para a tela de login.",
          {
            onClose: function () {
              history.push("/");
            },
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
      .get(`https://econtracts.herokuapp.com/token/is-valid-token/${token}`)
      .then(function (response) {
        setTokenValid(response.data.isValidToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setTokenValid, token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (tokenValid === undefined) return <Loading />;
  else
    return tokenValid ? (
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
                <img alt="" src={Logo} />
              </RoundedDiv>
            </Grid>
            <Grid item xs sm md>
              <h2>Cadastre a sua senha</h2>
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
                style={{ width: 350, background: "white" }}
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Senha"
                type="password"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                onChange={(event) =>
                  setPassword2({
                    value: event.target.value,
                    error: password2.error,
                  })
                }
                error={Boolean(password2.error)}
                helperText={password2.error}
              ></TextField>
            </Grid>
            <div style={{ height: 20 }}></div>
            {loading ? (
              <Grid container justify="center">
                <Grid item>
                  <CircularProgress size={35} />
                </Grid>
              </Grid>
            ) : (
              <StyledButton
                type="submit"
                variant="contained"
                color="secondary"
                style={{ color: "white" }}
              >
                SALVAR
              </StyledButton>
            )}
          </Grid>
        </form>
      </Container>
    ) : (
      <ErrorPage
        title="Token expirado ou não existe"
        message="Entre em contato com o administrador para solicitar um novo email."
        file={Wait}
      />
    );
}
