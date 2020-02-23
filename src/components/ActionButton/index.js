import React  from "react";

import {
  Grid,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

// const useStylesBootstrap = makeStyles(theme => ({
//   arrow: {
//     color: theme.palette.common.black
//   },
//   tooltip: {
//     backgroundColor: theme.palette.common.black
//   }
// }));

// function BootstrapTooltip(props) {
//   const classes = useStylesBootstrap();

//   return <Tooltip arrow classes={classes} {...props} />;
// }

export default function ActionButton() {
  return (
    <Grid container direction="row-reverse">
      <Grid item>
        <button style={{ border: "none", color: "firebrick" }}>
          <Delete style={{ transform: "scale(0.8)" }}></Delete>
        </button>
      </Grid>

      <div style={{ width:"15px" }}></div>

      <Grid item>
        <button style={{ border: "none", color: "green" }}>
          <Add></Add>
        </button>
      </Grid>
    </Grid>
  );
}
