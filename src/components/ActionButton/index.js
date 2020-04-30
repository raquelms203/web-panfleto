import React from "react";

import { Grid, Tooltip } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export default function ActionButton(props) {
  const { onClicks, remove, disabledAdd, overType } = props;

  return (
    <Grid container direction="row-reverse">
      {remove ? (
        <Grid item>
          <button
            style={{ border: "none", color: "firebrick" }}
            onClick={() => onClicks[1]()}
          >
            <Delete style={{ transform: "scale(0.8)" }}></Delete>
          </button>
        </Grid>
      ) : undefined}
      <div style={{ width: "15px" }}></div>
      <Grid item>
        {disabledAdd ? (
          <Tooltip title={`Cadastre ${overType} antes!`}>
            <span style={{ border: "none", color: "grey" }}>
              <Add />
            </span>
          </Tooltip>
        ) : (
          <button
            style={{ border: "none", color: "green" }}
            onClick={() => onClicks[0]()}
          >
            <Add />
          </button>
        )}
      </Grid>
    </Grid>
  );
}
