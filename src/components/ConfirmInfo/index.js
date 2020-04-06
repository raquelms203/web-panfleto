import React from "react";
import { Grid, Button } from "@material-ui/core";

import { FontField, FontValue } from "./styles";
import { StyledButton } from "../FormHired/styles";

export default function ConfirmInfo(props) {
  const { info, onClick, onBack } = props;

  if (info !== undefined)
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onClick();
        }}
      >
        <Grid container direction="column" spacing={1} alignItems="flex-end">
          <Grid item xs sm md container justify="center">
            <FontValue>Confirme as informações:</FontValue>
            <div style={{ height: 10 }}></div>
          </Grid>
          {info.map((item, index) => (
            <Grid key={index} item container alignItems="center" xs sm md>
              <FontField>{item.field} </FontField>
              <FontValue>{item.value}</FontValue>
            </Grid>
          ))}
          <Grid item>
            <div style={{ height: 20 }}></div>
          </Grid>
          <Grid item container justify="flex-end" xs sm md>
            <Button
              size="large"
              style={{ background: "#958a94", color: "white" }}
              onClick={onBack}
            >
              Voltar
            </Button>
            <div style={{ width: 15 }}></div>
            <StyledButton
              type="submit"
              variant="contained"
              size="large"
              color="secondary"
              style={{ color: "white" }}
            >
              OK
            </StyledButton>
          </Grid>
        </Grid>
      </form>
    );
}
