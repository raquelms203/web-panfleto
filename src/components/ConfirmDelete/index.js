import React from "react";
import { Grid } from "@material-ui/core";
import { ButtonDialog, EmptyDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onClickNo, onClickYes } = props;
  //type: prop

  if (list === undefined) return <EmptyDialog />;
  else if (list.length > 0)
    return (
      <div style={{ width: 270 }}>

        <Grid container direction="column">
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
      </div>
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
