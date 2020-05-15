import React from "react";

import { Grid, Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export default function ActionButton(props) {
  const { onClicks, remove, disabledAdd, overType, type } = props;

  return (
    <Grid container direction="row-reverse">
      {remove ? (
        <Grid item>
          <Tooltip title={`Excluir ${type}`} enterDelay={600} >
            <button
              style={{ border: "none", color: "firebrick" }}
              onClick={() => onClicks[1]()}
            >
              <Delete style={{ transform: "scale(0.8)" }}></Delete>
            </button>
          </Tooltip>
        </Grid>
      ) : undefined}
      <div style={{ width: "15px" }}></div>
      <Grid item>
        {disabledAdd ? (
          <Tooltip title={`Cadastre ${overType} antes!`} enterDelay={600}>
            <span style={{ border: "none", color: "grey" }}>
              <Add />
            </span>
          </Tooltip>
        ) : (
          <Tooltip title={`Cadastrar ${type}`} enterDelay={600} >
            <button
              style={{ border: "none", color: "green" }}
              onClick={() => onClicks[0]()}
            >
              <Add />
            </button>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}
