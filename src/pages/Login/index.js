import React from "react";
import { Link } from "react-router-dom";
import { CardLogin, ButtonLogin, Title, StyledGrid } from "./styles";
import { TextField, Grid } from "@material-ui/core";
import Computer from "../../assets/computer.png";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <StyledGrid container alignItems="center" justify="space-around">
      <Grid item container justify="center" alignItems="center">
        <Grid item>
          <CardLogin>
            <img
              src={Computer}
              alt="login"
              style={{
                maxHeight: "311.6px",
                maxWidth: "311.6px",
                justify: "center"
              }}
            ></img>
          </CardLogin>
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off">
            <CardLogin>
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
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    style={{ width: 255 }}
                    label="Senha"
                    variant="outlined"
                  />
                </Grid>
                <div style={{ height: "10px" }}></div>
                <Grid item>
                  <Link to="/dashboard">
                    <ButtonLogin>Entrar</ButtonLogin>
                  </Link>
                </Grid>
              </Grid>
            </CardLogin>
          </form>
        </Grid>
      </Grid>
    </StyledGrid>
  );
}
