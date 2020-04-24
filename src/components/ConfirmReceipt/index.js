import React, { useState, useEffect } from "react";
import { Grid, Button, List } from "@material-ui/core";

import { FontButton, StyledButton } from "../FormHired/styles";
import { FontList } from "./styles";
import { apiADM } from "../../services/api"

export default function ConfirmReceipt(props) {
  const { idHired, idManager } = props;
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
         console.log("success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    <form
      onSubmit={sendReceipts}
      style={{ minWidth: 400 }}
    >
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
