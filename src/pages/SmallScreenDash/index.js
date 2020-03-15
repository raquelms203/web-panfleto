import React from "react";
import { Grid, Button } from "@material-ui/core";
import { ButtonOK, Title } from "../../pages/Sign/styles";

export default function SmallScreenDash(props) {
  const { onClick } = props;

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
      <Grid item>
        <Title>
          Por favor vire a tela do seu
          celular para o modo paisagem e recarregue a página.
        </Title>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={onClick}>
          <span style={{ color: "white" }}>Recarregar</span>
        </Button>
      </Grid>
    </Grid>
  );
}
