import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ButtonDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, type, onClickNo, onClickYes } = props;
  const history = useHistory();

  return (
    <>
      {list.length > 0 ? (
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
      ) : (
        <>
          <p>Selecione pelo menos um item</p>
          <ButtonDialog style={{ color: "black" }} onClick={onClickNo}>
              <p>VOLTAR</p>
            </ButtonDialog>
        </>
      )}
    </>
  );
}
