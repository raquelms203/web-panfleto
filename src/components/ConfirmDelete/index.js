import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

import { ButtonDialog, EmptyDialog } from "./styles";

export default function ConfirmDelete(props) {
  const { list, onBack, type, overId } = props;
  const [dependents, setDependents] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onClickYes = async () => {
    setLoading(true);
    if (type === "politic") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/politic/${list[i]}?adminId=${overId}`)
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
          });
      }
    } else if (type === "manager") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/manager/${list[i]}?politicId=${overId}`)
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
          });
      }
    } else if (type === "hired") {
      for (let i = 0; i < list.length; i++) {
        await apiADM
          .delete(`/hired/${list[i]}?managerId=${overId}`)
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
          });
      }
    }
    await onBack();
  };

  useEffect(() => {
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
                <CircularProgress size={35} />
              </Grid>
            </Grid>
          ) : (
            <Grid
              item
              container
              justify="flex-end"
              spacing={2}
              xs
              sm
              md={12}
              style={{ paddingRight: 0 }}
            >
              <Grid item>
                <Button
                  size="large"
                  style={{ background: "#958a94", color: "white" }}
                  onClick={onBack}
                >
                  NÃO
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={onClickYes}
                  variant="contained"
                  size="large"
                 color="secondary"
                >
                 SIM
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
}
