import React, { useState, useEffect } from "react";
import { Grid, Button, List } from "@material-ui/core";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { FontButton, StyledButton } from "../FormHired/styles";
import { FontList } from "./styles";
import { apiADM } from "../../services/api";

export default function ConfirmReceipt(props) {
  const { idHired, idManager, onBack } = props;
  const history = useHistory();
  const [receipts, setReceipts] = useState(props.receipts);
  const [hasError, setHasError] = useState(false);

  const removeReceipt = (event, item) => {
    let list = [...receipts];
    let i;
    let position;
    for (let i = 0; i < list.length; i++) {
      if (list[i].file.name === item.file.name) {
        position = i;
        break;
      }
    }
    list.splice(position, 1);
    for (i = 0; i < list.length; i++) {
      if (list[i].error) {
        setHasError(true);
        break;
      }
    }
    if (i === list.length) setHasError(false);
    setReceipts(list);
  };

  const sendReceipts = async (event) => {
    event.preventDefault();
    for (let i = 0; i < receipts.length; i++) {
      let fd = new FormData();
      fd.append("file", receipts[i].file);
      await apiADM
        .put(`hired/${idHired}?managerId=${idManager}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Comprovante(s) adicionado com sucesso!");
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          else if (Boolean(error.response) && error.response.status === 400) {
            toast.error("Erro. É necessário assinar e validar antes.");
          } else toast.error("Ocorreu um erro ao enviar email!");
        });
    }
    onBack();
  };

  useEffect(() => {
    document.body.addEventListener(
      "drop",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }, []);

  useEffect(() => {
    setReceipts(props.receipts);
    props.receipts.forEach((item) => {
      if (item.error) {
        setHasError(true);
      }
    });
  }, [props.receipts]);

  return (
    <form onSubmit={sendReceipts} style={{ minWidth: 400 }}>
      <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item>
          <List
            dense
            component="nav"
            style={{ marginLeft: 8, maxHeight: 220, overflowY: "auto" }}
          >
            {receipts.map((item, index) => (
              <Grid item container alignItems="baseline" key={index}>
                <FontList style={{ color: item.error ? "red" : "black" }}>
                  {item.file.name}
                </FontList>
                {item.error ? (
                  <FontList style={{ color: "red", marginLeft: 5 }}>
                    (formato não suportado)
                  </FontList>
                ) : undefined}
                <Button
                  size="small"
                  onClick={(event) => {
                    removeReceipt(event, item);
                  }}
                >
                  X
                </Button>
              </Grid>
            ))}
          </List>
        </Grid>
      </Grid>
      <Grid item container justify="flex-end">
        <StyledButton
          style={{ marginRight: 16 }}
          disabled={hasError}
          type="submit"
          variant="contained"
          size="small"
          color="secondary"
        >
          <FontButton>SALVAR</FontButton>
        </StyledButton>
      </Grid>
    </form>
  );
}
