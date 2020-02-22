import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Button, Grid, Dialog, DialogTitle } from "@material-ui/core";
import { apiStates, apiADM } from "../../services/api";
import { StyledGrid, TitleAppBar, Separator, ButtonOk } from "./styles";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import FilterPolitics from "../../components/FilterPolitics";
import FilterCities from "../../components/FilterCities";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [user, setUser] = useState({});
  const [politics, setPolitics] = useState([]);
  const [filterPoliticSelected, setFilterPoliticSelected] = useState(1);
  const [checkPolitic, setCheckPolitic] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(0);
  const [managers, setManagers] = useState([]);
  const [indexManager, setIndexManager] = useState(0);
  const [showManagers, setShowManagers] = useState(true);
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
      setCheckPolitic(Array(politicsAll.length).fill(false));
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

  const isTwoPoliticSelected = () => {
    let counter = 0;
    checkPolitic.forEach(item => {
      if (item) counter++;
      if (counter >= 2) return;
    });
    if (counter >= 2) return true;
    return false;
  };

  const handleCheckChangePolitic = (event, value, indexList) => {
    let list = checkPolitic;
    list[indexList] = value;
    setCheckPolitic(list);
    if (isTwoPoliticSelected()) {  
      setManagers([]);
      setHireds([]);
    }
  };

  const handleManagerListCheck = (event, index) => {
    setIndexManager(index);
    setHireds(managers[index].contratados);
  };

  const handleFilterClick = event => {
    setOpenDialog(true);
  };

  const handleFilterCity = event => {
    setCitySelected(event.currentTarget.innerText);
  };

  const handleFilterPolitic = event => {
    setFilterPoliticSelected(event.target.value);
  };

  const handleFilters = event => {
    if (citySelected === "" && filterPoliticSelected === 1) {
      setOpenDialog(false);
      return;
    }
    let list = [];
    if (citySelected !== "") {
      politics.forEach(item =>
        item.cidade === citySelected ? list.push(item) : undefined
      );
      setCitySelected("");
    }
    if (filterPoliticSelected !== 1) {
      const n = filterPoliticSelected - 1;
      politics.forEach(item =>
        item.categoria === n ? list.push(item) : undefined
      );
      setFilterPoliticSelected(1);
    }
    list.sort(function(a, b) {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });
    console.log(list);
    setPolitics(list);
    setOpenDialog(false);
  };

  return (
    <>
      <AppBar position="static">
        <TitleAppBar>
          <Button>{user.nome}</Button>
        </TitleAppBar>
      </AppBar>
      <StyledGrid container item justify="center">
        <Grid item xs={3} sm={3} md={4}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Button onClick={handleFilterClick}>
                <strong>Filtrar</strong>
              </Button>
              <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
                <DialogTitle>
                  <Grid container direction="column">
                    <FilterPolitics onChange={handleFilterPolitic} />
                    <div style={{ height: "16px" }}></div>
                    <FilterCities
                      onChange={handleFilterCity}
                      list={cities}
                    ></FilterCities>
                    <div style={{ height: "16px" }}></div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleFilters}
                    >
                      OK
                    </Button>
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
            indexSelected={indexPolitic}
            list={politics}
            onCheckChange={handleCheckChangePolitic}
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
