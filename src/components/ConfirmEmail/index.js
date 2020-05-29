import React, { useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  Button,
} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.min.css";
export default function ConfirmEmail(props) {
  const { onBack, open, onConfirm } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Dialog
      onClose={() => {
        setLoading(false);
        onBack();
      }}
      open={open}
    >
      <DialogTitle>
        <div style={{ width: 400 }}>
          <Grid container direction="column">
            <Grid item>
              <p>
                O contrato finalizado será enviado para o seu email e para o do
                contratado. Deseja continuar?
              </p>
            </Grid>

            <div style={{ height: 10 }}></div>

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
                    onClick={async () => {
                      setLoading(true);
                      await onConfirm();
                      setLoading(false);
                    }}
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
          <div style={{ height: 20 }}></div>
        </div>
      </DialogTitle>
    </Dialog>
  );
}
