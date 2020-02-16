import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemIcon,
  Checkbox,
  Dialog,
  DialogTitle
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { apiStates, apiADM } from "../../services/api";
import { StyledGrid } from "./styles";
import ActionButton from "../../components/ActionButton";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState({});
  const [politics, setPolitics] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(0);
  const [managers, setManagers] = useState([]);
  const [indexManager, setIndexManager] = useState(0);
  const [hireds, setHireds] = useState([]);
  const [indexHired, setIndexHired] = useState(-1);
  const [openDialog, setOpenDialog] = useState(false);

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

      response.data.politicos.forEach(item => {
        let p = {
          nome: item.nome,
          categoria: item.categoria,
          cpf: item.cpf,
          cidade: item.cidade,
          gestores: item.gestores
        };
        politicsAll.push(p);
      });
      setUser(user);
      setPolitics(politicsAll);
      setManagers(politicsAll[0].gestores);
      setHireds(politicsAll[0].gestores[0].contratados);
    }
  }, [user]);

  useEffect(() => {
    fetchCities();
    fetchUser();
  }, [fetchCities, fetchUser]);

  const handlePoliticListCheck = (event, index) => {
    setIndexPolitic(index);
    setIndexManager(0);
    setManagers(politics[index].gestores);
    setHireds(politics[index].gestores[0].contratados);
  };

  const handleManagerListCheck = (event, index) => {
    setIndexManager(index);
    setHireds(managers[index].contratados);
  };

  const handleFilterClick = event => {
    setOpenDialog(true);
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
        <Grid item xs={3} sm={3} md={2}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Button onClick={handleFilterClick}>
                <strong>Filtrar</strong>
              </Button>
              <Dialog
                onClose={() => setOpenDialog(false)}
                aria-labelledby="simple-dialog-title"
                open={openDialog}
              >
                <DialogTitle>
                  <Grid container direction="column">
                    <Grid item>Oi</Grid>
                    <Grid item>Oi 2</Grid>
                  </Grid>
                </DialogTitle>
              </Dialog>
            </Grid>
            <Grid item>
              <ActionButton></ActionButton>
            </Grid>
          </Grid>
          <div style={{ background: "white", height: "100vh" }}>
            <List component="nav" dense>
              {politics.map((item, index) => (
                <ListItem
                  key={index}
                  divider
                  button
                  selected={indexPolitic === index}
                  onClick={event => handlePoliticListCheck(event, index)}
                >
                  <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    // inputProps={{ 'aria-labelledby': labelId }}
                  />
                  <ListItemText primary={item.nome}></ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>

        <div style={{ width: "2px", background: "#babdc2" }}></div>

        <Grid item xs={3} sm={3} md={2}>
          <ActionButton></ActionButton>
          <div style={{ height: "8px" }}></div>
          <div style={{ background: "white", height: "100vh" }}>
            <List component="nav" dense>
              {managers.map((item, index) => {
                return index === 0 ? (
                  <>
                    <ListItem
                      divider
                      button
                      selected={index === indexManager}
                      onClick={event => handleManagerListCheck(event, index)}
                    >
                      <Checkbox
                        edge="start"
                        // checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby': labelId }}
                      />
                      <ListItemText primary={item.nome}></ListItemText>
                    </ListItem>
                  </>
                ) : (
                  <ListItem
                    divider
                    button
                    selected={index === indexManager}
                    onClick={event => handleManagerListCheck(event, index)}
                  >
                    <Checkbox
                      edge="start"
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText primary={item.nome}></ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Grid>

        <div style={{ width: "2px", background: "#babdc2" }}></div>

        <Grid item xs={3} sm={3} md={2}>
          <ActionButton></ActionButton>
          <div style={{ height: "8px" }}></div>
          <div style={{ background: "white", height: "100vh" }}>
            <List component="nav" dense>
              {hireds.map((item, index) =>
                index === 0 ? (
                  <>
                    <ListItem
                      divider
                      button
                      selected={index === indexHired}
                      onClick={event => handleManagerListCheck(event, index)}
                    >
                      <Checkbox
                        edge="start"
                        // checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby': labelId }}
                      />
                      <ListItemText primary={item.nome}></ListItemText>
                    </ListItem>
                  </>
                ) : (
                  <ListItem
                    divider
                    button
                    selected={index === indexHired}
                    onClick={event => handleManagerListCheck(event, index)}
                  >
                    <Checkbox
                      edge="start"
                      // checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                    <ListItemText primary={item.nome}></ListItemText>
                  </ListItem>
                )
              )}
            </List>
          </div>
        </Grid>
      </StyledGrid>
    </>
  );
}
