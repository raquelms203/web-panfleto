import React from "react";
import { Grid } from "@material-ui/core";
import { ButtonDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onClickNo, onClickYes } = props;
  //type: prop

  if (list === undefined) return <div style={{ height: 70, width: 220 }}></div>;
  else if (list.length > 0)
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <p>Deseja apagar {list.length} item(s)?</p>
        </Grid>
        <div style={{ height: 20 }}></div>
        <Grid item container justify="flex-end" spacing={3}>
          <ButtonDialog style={{ color: "black" }} onClick={onClickNo}>
            <p>NÃO</p>
          </ButtonDialog>
          <div style={{ width: 20 }}></div>
          <ButtonDialog
            style={{ color: "red", marginRight: 10 }}
            onClick={onClickYes}
          >
            <p>SIM</p>
          </ButtonDialog>
        </Grid>
        <div style={{ height: 20 }}></div>
      </Grid>
    );
  else if (list.length === 0)
    return (
      <>
        <p>Selecione pelo menos um item</p>
        <div style={{ height: 10 }}></div>

        <Grid container justify="flex-end">
          <ButtonDialog style={{ color: "black" }} onClick={onClickNo}>
            <p>VOLTAR</p>
          </ButtonDialog>
        </Grid>
        <div style={{ height: 10 }}></div>
      </>
    );
}
