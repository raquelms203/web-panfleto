import React, { useState } from "react";
import {
  Grid,
  Button,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { isMobile } from "react-device-detect";

import { FontField, FontTitle } from "./styles";
import { Container } from "../FormHired/styles";

export default function ConfirmInfo(props) {
  const { info, onClick, onBack, open } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onClick();
  };

  if (info !== undefined)
    return (
      <Dialog maxWidth="md" fullScreen={isMobile} onClose={onBack} open={open}>
        <DialogTitle style={{ background: "#f5f3f3" }}>
          <form
            onSubmit={async (event) => await handleSubmit(event)}
            autoComplete="off"
          >
            <Container
              container
              direction="column"
              spacing={1}
              alignItems="stretch"
            >
              <input
                autoFocus
                readOnly
                style={{ width: 0, height: 0, border: "none" }}
              ></input>
              <Grid item xs={12} sm={12} md={12} container justify="center">
                <FontTitle>Confirme as informações:</FontTitle>
                <div style={{ height: 10 }}></div>
              </Grid>
              <Grid
                item
                container
                direction="column"
                spacing={1}
              >
                {info.map((item, index) => (
                  <Grid item key={index}>
                    <Grid item container alignItems="flex-start" xs sm md>
                      <FontField>{item.field}<span>{item.value}</span></FontField>
                     
                    </Grid>
                    <Grid item>
                      <Divider />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <div style={{ height: 20 }}></div>
              </Grid>
              {loading ? (
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress size={35} />
                  </Grid>
                </Grid>
              ) : (
                <Grid item container justify="flex-end" xs sm md spacing={2}>
                  <Grid item>
                    <Button
                      size="large"
                      style={{ background: "#958a94", color: "white" }}
                      onClick={onBack}
                    >
                      Voltar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="secondary"
                      style={{ color: "white" }}
                    >
                      SALVAR
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Container>
          </form>
        </DialogTitle>
      </Dialog>
    );
}
