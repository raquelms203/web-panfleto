import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { apiStates, apiADM } from "../../services/api";
import { StyledGrid } from "./styles";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(1);
  const [user, setUser] = useState({});
  const [politics, setPolitics] = useState([]);

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiStates.get();
      let names = response.data.map(item => item.nome);
      setCities(names);
    }
  }, [cities]);

  const fetchUser = useCallback(async () => {
    if (user.toSource() === "({})") {
      let response = await apiADM.get();
      let user = {
        nome: response.data.nome,
        partido: response.data.partido,
        corPrimaria: response.data.corPrimaria
      };
      let politicsAll = [];

      response.data.politicos.map(item => {
        let p = {
          nome: item.nome,
          categoria: item.categoria,
          cpf: item.cpf,
          cidade: item.cidade
        };
        politicsAll.push(p);
      });
      setUser(user);
      setPolitics(politicsAll);
    }
  }, [user, politics]);

  useEffect(() => {
    fetchCities();
    fetchUser();
  }, [fetchCities, fetchUser]);

  return (
    <>
      <AppBar position="static">
        <div style={{ display: "flex" }}>
          <Button style={{ marginLeft: "auto" }} color="inherit">
            {user.nome}
          </Button>
        </div>
      </AppBar>
      <StyledGrid>
        <List component="nav">
          {politics.map(item => (
            <ListItem button selected={indexPolitic === 0} onClick={() => {}}>
              <ListItemText primary={item.nome}></ListItemText>
            </ListItem>
          ))}
        </List>
      </StyledGrid>
    </>
  );
}
{
  /* <StyledGrid>
        <List component="nav" aria-label="main mailbox folders">
          {politics.map((politic, index) => (
            <ListItem button
          selected={indexPolitic === index}
          onClick={event => {}}>{politic}</ListItem>
          ))}
        </List>
      </StyledGrid> */
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
