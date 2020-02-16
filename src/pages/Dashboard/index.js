import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemIcon,
  Checkbox
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { apiStates, apiADM } from "../../services/api";
import { StyledGrid } from "./styles";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(0);
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
    if (Object.entries(user).length === 0) {
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
  }, [user]);

  useEffect(() => {
    fetchCities();
    fetchUser();
  }, [fetchCities, fetchUser]);

  const handleListCheck = (event, index) => {
    setIndexPolitic(index);
  };

  return (
    <>
      <AppBar position="static">
        <div style={{ display: "flex" }}>
          <Button style={{ marginLeft: "auto" }} color="inherit">
            {user.nome}
          </Button>
        </div>
      </AppBar>
      <StyledGrid container direction="row">
        <Grid item xs={4} md={2}>
          <List component="nav" dense>
            {politics.map((item, index) => (
              <ListItem
                key={index}
                divider
                button
                selected={indexPolitic === index}
                onClick={event => handleListCheck(event, index)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    // inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.nome}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <div
          style={{ width: "2px", background: "#babdc2" }}
        ></div>
        <Grid item xs={4} md={2}>
          <List component="nav" dense>
            {politics.map((item, index) => (
              <ListItem
                divider
                button
                selected={indexPolitic === index}
                onClick={event => handleListCheck(event, index)}
              >
                <ListItemText primary={item.nome}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
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
