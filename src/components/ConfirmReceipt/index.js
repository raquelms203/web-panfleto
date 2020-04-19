import React, { useRef, useState, useCallback, useEffect } from "react";
import { Grid, Button, List } from "@material-ui/core";

import { FontButton, StyledButton } from "../FormHired/styles";

export default function ConfirmReceipt(props) {
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
      onSubmit={() => {
        console.log("submit");
      }}
      style={{ minWidth: 400 }}
    >
      <List dense style={{ marginLeft: 8 }}>
        {receipts.map((item, index) => (
          <Grid item container key={index}>
            <p style={{ color: item.error ? "red" : "black" }}>
              {item.file.name}
            </p>
            {item.error ? (
              <p style={{ color: "red", marginLeft: 5 }}>
                (formato não suportado)
              </p>
            ) : undefined}
            <Button
              onClick={(event) => {
                removeReceipt(event, item);
              }}
            >
              X
            </Button>
          </Grid>
        ))}
        <div style={{ height: 16 }}></div>
        <Grid item container justify="flex-end">
          <StyledButton
           style={{ marginRight: 16 }}
            disabled={hasError}
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
          >
            <FontButton>OK</FontButton>
          </StyledButton>
        </Grid>
      </List>
    </form>
  );
}
