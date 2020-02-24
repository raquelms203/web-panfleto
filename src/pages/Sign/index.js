import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

export default function Sign(props) {
  const { token } = props;

  return (  
    <Grid container direction="column">  
    <p>Para concluir o cadastro acesse o aplicativo E-CONTRATO e use o código:</p>
    </Grid>
  );
}