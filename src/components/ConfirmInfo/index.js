import React, { useState } from "react";
import { Grid, Button, Divider, CircularProgress } from "@material-ui/core";

import { FontField, FontValue } from "./styles";

export default function ConfirmInfo(props) {
  const { info, onClick, onBack } = props;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  if (info !== undefined)
    return (
      <>
        <Grid
          container
          direction="column"
          spacing={1}
          alignItems="flex-end"
          style={{ padding: "8px 24px" }}
        >
          <Grid item xs sm md container justify="center">
            <FontField>Confirme as informações:</FontField>
            <div style={{ height: 10 }}></div>
          </Grid>
          <Grid item container direction="column" spacing={1} >
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
                  type="submit"
                  variant="contained"
                  size="large"
                  color="secondary"
                  style={{ color: "white" }}
                  onClick={handleSubmit}
                >
                  SALVAR
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </>
    );
}
