import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import { ButtonDialog, EmptyDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onBack, type, overId, onClickNo } = props;
  const [dependents, setDependents] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onClickYes = async () => {
    setLoading(true);
    if (type === "politic") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/politic/${list[i]}?adminId=${overId}`)
          .then(async (response) => onBack())
          .catch(function (error) {
            if (Boolean(error.response) && error.response.status === 401) {
              toast.info(
                "Após 1h a sessão expira. Você será redirecionado para a página de login.",
                {
                  onClose: function () {
                    history.push("/");
                    localStorage.setItem("isLogged", false);
                  },
                }
              );
            } else toast.error("Ocorreu um erro ao apagar campanha(s)!");
          })
          .finally(() => setLoading(false));
      }
    } else if (type === "manager") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/manager/${list[i]}?politicId=${overId}`)
          .then((response) => onBack())
          .catch(function (error) {
            if (Boolean(error.response) && error.response.status === 401) {
              toast.info(
                "Após 1h a sessão expira. Você será redirecionado para a página de login.",
                {
                  onClose: function () {
                    history.push("/");
                    localStorage.setItem("isLogged", false);
                  },
                }
              );
            } else toast.error("Ocorreu um erro ao apagar gestor(es)!");
          })
          .finally(() => setLoading(false));
      }
    } else if (type === "hired") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/hired/${list[i]}?managerId=${overId}`)
          .then((response) => onBack())
          .catch(function (error) {
            if (Boolean(error.response) && error.response.status === 401) {
              toast.info(
                "Após 1h a sessão expira. Você será redirecionado para a página de login.",
                {
                  onClose: function () {
                    history.push("/");
                    localStorage.setItem("isLogged", false);
                  },
                }
              );
            } else toast.error("Ocorreu um erro ao apagar contratado(s)!");
          })
          .finally(() => setLoading(false));
      }
    }
  };

  useEffect(() => {
    console.log(list);
    if (type === "politic")
      setDependents(" e apagará todos os gestores/contratados relacionados");
    else if (type === "manager")
      setDependents(" e apagará todos os contratados relacionados");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (list === undefined) return <EmptyDialog />;
  else
    return (
      <div style={{ width: 400 }}>
        <Grid container direction="column">
          <Grid item>
            <p>{`Essa ação é permanente${dependents}.`}</p>
            <p> Deseja mesmo apagar {list.length} item(s)?</p>
            {dependents === "" ? <br /> : undefined}
          </Grid>

          <div style={{ height: 30 }}></div>

          {loading ? (
            <Grid container justify="center">
              <Grid item>
                <CircularProgress size={33} />
              </Grid>
            </Grid>
          ) : (
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
          )}
        </Grid>
        <div style={{ height: 20 }}></div>
      </div>
    );
}
