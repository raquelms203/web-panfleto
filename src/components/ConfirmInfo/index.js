import React from "react";
import { Grid } from "@material-ui/core";
import { FontField, FontValue } from "./styles";

export default function ConfirmInfo(props) {
  const { info } = props;

  // if (info !== undefined)
  //   return (
  //     <Grid container direction="column">
  //       <Grid item xs sm md>
  //         <FontValue>Confirme as informações:</FontValue>
  //         <div style={{ height: 10 }}></div>
  //       </Grid>
  //       <Grid item container alignItems="center" xs sm md>
  //         <FontField>{info[0].field}: </FontField>
  //         <FontValue>{info[0].value}</FontValue>
  //       </Grid>
  //       <Grid item container alignItems="center" xs sm md>
  //         <FontField>CPF: </FontField>
  //         <FontValue>026.788.052-98</FontValue>
  //       </Grid>
  //       <Grid item>
  //         <div style={{ height: 20 }}></div>
  //       </Grid>
  //     </Grid>
  //   );
  // else return <></>;
  return (<></>);
}
