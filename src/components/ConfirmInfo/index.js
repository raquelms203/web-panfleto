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

import { FontField, FontValue, FontTitle } from "./styles";
import { Container } from "../FormHired/styles";

export default function ConfirmInfo(props) {
  const { info, onClick, onBack, open } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  if (info !== undefined)
    return (
      <Dialog
        fullScreen={isMobile}
        onClose={onBack}
        open={open}
        style={{ background: "#f5f3f3" }}
      >
        <DialogTitle>
          <Container container direction="column" spacing={1} alignItems="flex-end">
            <Grid item xs={12} sm={12} md={12} container justify="center">
              <FontTitle>Confirme as informações:</FontTitle>
              <div style={{ height: 10 }}></div>
            </Grid>
            <Grid item xs={12} sm={12} md={12}  container direction="column" spacing={1}>
              {info.map((item, index) => (
                <Grid item key={index}>
                  <Grid item container alignItems="flex-start" xs sm md>
                    <FontField>{item.field}</FontField>
                    <FontValue>{item.value}</FontValue>
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
                    onClick={handleSubmit}
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
        </DialogTitle>
      </Dialog>
    );
}
