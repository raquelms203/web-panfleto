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
import { StyledGrid, TitleAppBar, Separator } from "./styles";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import Filter from "../../components/Filter";

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
        <TitleAppBar>
          <Button>{user.nome}</Button>
        </TitleAppBar>
      </AppBar>
      <StyledGrid container justify="center">
        <Grid item xs={3} sm={3} md={4}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Button onClick={handleFilterClick}>
                <strong>Filtrar</strong>
              </Button>
              <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
                <DialogTitle>
                  <Grid container direction="column">
                    <Filter list={cities}/>
                  </Grid>
                </DialogTitle>
              </Dialog>
            </Grid>
            <Grid item>
              <ActionButton></ActionButton>
            </Grid>
          </Grid>
          <CustomList
            onClick={handlePoliticListCheck}
            list={politics}
          />
        </Grid>

        <Separator />

        <Grid item xs={3} sm={3} md={3}>
          <ActionButton></ActionButton>
          <div style={{ height: "8px" }}></div>
          <CustomList
            onClick={handleManagerListCheck}
            indexSelected={indexManager}
            list={managers}
          />
        </Grid>

        <Separator />

        <Grid item xs={3} sm={3} md={3}>
          <ActionButton></ActionButton>
          <div style={{ height: "8px" }}></div>

          <CustomList
            onClick={() => {}}
            indexSelected={indexHired}
            list={hireds}
          />
        </Grid>
      </StyledGrid>
    </>
  );
}
