import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { ButtonDialog, EmptyDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onBack, type, overId, onClickNo } = props;
  const [dependents, setDependents] = useState("");

  const onClickYes = async () => {
    if (type === "politic") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/politic/${list[i]}?adminId=${overId}`)
          .catch(function (e) {
            toast.error("Ocorreu um erro ao apagar campanha(s)!");
          });
      }
    } else if (type === "manager") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/manager/${list[i]}?politicId=${overId}`)
          .catch(function (e) {
            toast.error("Ocorreu um erro ao apagar gestor(es)!");
          });
      }
    } else if (type === "hired") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/hired/${list[i]}?managerId=${overId}`)
          .catch(function (e) {
            toast.error("Ocorreu um erro ao apagar gestor(es)!");
          });
      }
    }
    onBack();
  };

  useEffect(() => {
    if (type === "politic")
      setDependents(" e apagará todos os gestores/contratados relacionados");
    else if (type === "manager")
      setDependents(" e apagará todos os contratados relacionados");
  }, []);

    if (list === undefined) return <EmptyDialog />;
    else return (
      <div style={{ width: 400 }}>
        <Grid container direction="column">
          <Grid item>
            <p>{`Essa ação é permanente${dependents}.`}</p>
            <p> Deseja mesmo apagar {list.length} item(s)?</p>
            {dependents === "" ? <br /> : undefined}
          </Grid>

          <div style={{ height: 30 }}></div>

          <Grid item container justify="flex-end" spacing={3}>
            <ButtonDialog style={{ color: "black" }} onClick={onClickNo}>
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
}
