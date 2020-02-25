import React  from "react";

import {
  Grid
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export default function ActionButton(props) {

  const { onClicks } = props;

  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <button style={{ border: "none", color: "firebrick" }}
           onClick={() => onClicks[1]()}>
          <Delete style={{ transform: "scale(0.8)" }}></Delete>
        </button>
      </Grid>

      <div style={{ width:"15px" }}></div>

      <Grid item>
        <button style={{ border: "none", color: "green" }}
         onClick={() => onClicks[0]()}>
          <Add></Add>
        </button>
      </Grid>
    </Grid>
  );
}
