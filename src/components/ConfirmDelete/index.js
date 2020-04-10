import React from "react";
import { Grid } from "@material-ui/core";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { ButtonDialog, EmptyDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onBack, type, overId } = props;

  const onClickYes = async () => {
    if (type === "politic") {
      var error = false;
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(
            `/politic/${list[i]}?adminId=${overId}`
          )
          .catch(function (e) {
            this.error = true;
          });
      }
    } else if (type === "manager") {
      var error = false;
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(
            `/manager/${list[i]}?politicId=${overId}`
          )
          .catch(function (e) {
            this.error = true;
          });
      }
    }
    if (error) toast.error("Ocorreu um erro ao apagar campanha(s)!");
    onBack();
  };

  if (list === undefined) return <EmptyDialog />;
  else if (list.length > 0)
    return (
      <div style={{ width: 300 }}>
        <Grid container direction="column">
          <Grid item>
            <p>Essa ação é permanente.</p>
            <p> Deseja mesmo apagar {list.length} item(s)?</p>
          </Grid>

          <div style={{ height: 30 }}></div>

          <Grid item container justify="flex-end" spacing={3}>
            <ButtonDialog style={{ color: "black" }} onClick={onBack}>
              <p>NÃO</p>
            </ButtonDialog>

            <div style={{ width: 20 }}></div>

            <ButtonDialog
              style={{ color: "red", padding: 10 }}
              onClick={() => onClickYes()}
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
        <div style={{ height: 10, width: 300 }}></div>

        <p>Selecione pelo menos um item</p>

        <div style={{ height: 30 }}></div>

        <Grid container justify="flex-end">
          <ButtonDialog
            style={{ color: "black", marginRight: 25 }}
            onClick={onBack}
          >
            <p>VOLTAR</p>
          </ButtonDialog>
        </Grid>

        <div style={{ height: 30 }}></div>
      </>
    );
}
