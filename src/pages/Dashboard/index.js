import React, { useEffect, useState, useCallback } from "react";
import { Grid, Paper } from "@material-ui/core";
import { apiStates } from "../../services/api";
import { StyledGrid } from "./styles";

export default function Dashboard() {
  const [cities, setCities] = useState([]);

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      const response = await apiStates.get();
      const names = response.data.map(item => item.nome);
      setCities(names);
    }
  }, [cities]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
   <div> {cities.length}</div>
    // <StyledGrid container justify="center" alignItems="center">
    //   <Grid item xs={12} sm={6} md={3}>
    //     <Paper>
    //       <Grid container item xs={12} justify="center">
    //         <p>Hey</p>
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </StyledGrid>
  );
}
