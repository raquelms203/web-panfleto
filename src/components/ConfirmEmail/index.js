import React, { useEffect, useState } from "react";
import { Grid, Dialog, DialogTitle, CircularProgress } from "@material-ui/core";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { ButtonDialog } from "../ConfirmDelete/styles";

export default function ConfirmEmail(props) {
  const { onBack, open, onConfirm } = props;
  const [loading, setLoading] = useState(false);

  return (
    <Dialog onClose={onBack} open={open}>
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
              <Grid item container justify="flex-end" spacing={3}>
                <Grid item>
                  <ButtonDialog style={{ color: "black" }} onClick={onBack}>
                    <p>NÃO</p>
                  </ButtonDialog>
                </Grid>

                <div style={{ width: 20 }}></div>

                <Grid item>
                  <ButtonDialog
                    style={{ color: "red", padding: 10 }}
                    onClick={async () => {  
                      setLoading(true);
                      await onConfirm();
                      setLoading(false);
                    }}
                  >
                    <p>SIM</p>
                  </ButtonDialog>
                </Grid>
              </Grid>
            )}

            <div style={{ height: 20 }}></div>
          </Grid>
        </div>
      </DialogTitle>
    </Dialog>
  );
}
