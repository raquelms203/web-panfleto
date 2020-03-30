import React from "react";
import { Grid, Button } from "@material-ui/core";

import { FontField, FontValue } from "./styles";
import { StyledButton } from "../FormHired/styles";

export default function ConfirmInfo(props) {
  const { info, onClick } = props;

  if (info !== undefined)
    return (
      <Grid container direction="column" spacing={1} alignItems="flex-end">
        <Grid item xs sm md container justify="center">
          <FontValue>Confirme as informações:</FontValue>
          <div style={{ height: 10 }}></div>
        </Grid>
        {info.map((item, index) => (
          <Grid item container alignItems="center" xs sm md>
            <FontField key={index}>{item.field} </FontField>
            <FontValue key={index}>{item.value}</FontValue>
          </Grid>
        ))}
        <Grid item>
          <div style={{ height: 20 }}></div>
        </Grid>
        <Grid item xs sm md>
          <StyledButton
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            onClick={onClick}
            style={{ color: "white" }}
          >
            OK
          </StyledButton>
        </Grid>
      </Grid>
    );
}
