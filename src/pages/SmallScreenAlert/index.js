import React from "react";
import { Grid } from "@material-ui/core";
import { Title } from "../../pages/Sign/styles";

export default function SmallScreenAlert(props) {

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item>
        <Title>
          Por favor vire a tela do seu celular para o modo paisagem.
        </Title>
      </Grid>
    </Grid>
  );
}
