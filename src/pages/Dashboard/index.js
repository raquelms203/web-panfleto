import React, { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  MenuItem
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
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
    <AppBar position="static">
      <div style={{ display: "flex" }}>
        <Button style={{ marginLeft: "auto" }} color="inherit">
          Login
        </Button>
      </div>
    </AppBar>
  );
}
// <StyledGrid container justify="center" alignItems="center">
//   <Grid item xs={12} sm={6} md={3}>
//     <Paper>
//       <Grid container item xs={12} justify="center">
//         <p>Hey</p>
//       </Grid>
//     </Paper>
//   </Grid>
// </StyledGrid>
