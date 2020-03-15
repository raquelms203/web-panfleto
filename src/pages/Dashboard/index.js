import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  AppBar,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { apiCities, apiADM } from "../../services/api";
import {
  StyledGrid,
  Separator,
  Subtitle,
  LabelFilter,
  Footer,
  Logo,
  FontButton,
  StyledButton
} from "./styles";
import SmallScreenDash from "../SmallScreenDash";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import DropdownPolitics from "../../components/DropdownPolitics";
import DropdownCities from "../../components/DropdownCities";
import FormHired from "../../components/FormHired/index";
import FormManager from "../../components/FormManager";
import FormPolitic from "../../components/FormPolitic";
import { useHistory } from "react-router-dom";
import ConfirmDelete from "../../components/ConfirmDelete";

export default function Dashboard() {
  const isLessThan500 = window.screen.availWidth < 500;
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [user, setUser] = useState({});
  const [politics, setPolitics] = useState([]);
  const [filterPoliticSelected, setFilterPoliticSelected] = useState(1);
  const [checkPolitic, setCheckPolitic] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(0);
  const [managers, setManagers] = useState([]);
  const [indexManager, setIndexManager] = useState(0);
  const [checkManager, setCheckManager] = useState([]);
  const [hireds, setHireds] = useState([]);
  const [indexHired, setIndexHired] = useState(0);
  const [checkHired, setCheckHired] = useState([]);
  const [openDialogFilter, setOpenDialogFilter] = useState(false);
  const [openDialogAddHired, setOpenDialogAddHired] = useState(false);
  const [openDialogAddManager, setOpenDialogAddManager] = useState(false);
  const [openDialogAddPolitic, setOpenDialogAddPolitic] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState({
    open: false,
    list: [],
    type: ""
  });
  const history = useHistory();

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiCities.get();
      let names = response.data.map(
        item =>
          item.nome + " - " + item.municipio.microrregiao.mesorregiao.UF.sigla
      );
      setCities(names);
    }
  }, [cities]);

  const fetchPolitics = async () => {
    let response = await apiADM.get();
    let politicsAll = [];

    response.data.politicos.forEach(item => {
      let p = {
        nome: item.nome,
        categoria: item.categoria,
        cpf: item.cpf,
        cidade: item.cidade,
        gestores: item.gestores,
        token: item.token
      };
      politicsAll.push(p);
    });

    return politicsAll;
  };

  const fetchUser = useCallback(async () => {
    if (Object.entries(user).length === 0) {
      let response = await apiADM.get();
      let user = {
        nome: response.data.nome,
        partido: response.data.partido,
        corPrimaria: response.data.corPrimaria
      };
      let politicsAll = await fetchPolitics();

      setUser(user);
      setPolitics(politicsAll);
      setManagers(politicsAll[0].gestores);
      setHireds(politicsAll[0].gestores[0].contratados);
      setCheckPolitic(
        Array(politicsAll.length).fill({ isSelected: false, id: "" })
      );
    }
  }, [user]);

  useEffect(() => {
    fetchCities();
    fetchUser();
  }, [fetchCities, fetchUser]);

  const handlePoliticListClick = (event, index) => {
    setIndexPolitic(index);
    setIndexManager(0);
    setManagers(politics[index].gestores);
    setCheckManager(
      Array(politics[index].gestores.length).fill({ isSelected: false, id: "" })
    );
    setHireds(politics[index].gestores[0].contratados);
  };

  const isTwoPoliticsSelected = () => {
    let counter = 0;
    checkPolitic.forEach(item => {
      if (item.isChecked) counter++;
      if (counter >= 2) return;
    });
    if (counter >= 2) return true;
    return false;
  };

  const handleCheckChangePolitic = (event, value, indexList) => {
    let list = checkPolitic;
    list[indexList] = { isChecked: value, id: politics[indexList].token };
    setCheckPolitic(list);
    if (isTwoPoliticsSelected()) {
      setManagers([]);
      setHireds([]);
    }
  };

  const handleManagerListClick = (event, index) => {
    setIndexManager(index);
    setHireds(managers[index].contratados);
    setCheckHired(
      Array(managers[index].contratados.length).fill({
        isSelected: false,
        id: ""
      })
    );
  };

  const isTwoManagersSelected = () => {
    let counter = 0;
    checkManager.forEach(item => {
      if (item.isChecked) counter++;
      if (counter >= 2) return;
    });
    if (counter >= 2) return true;
    return false;
  };

  const handleCheckChangeManager = (event, value, indexList) => {
    let list = checkManager;
    list[indexList] = { isChecked: value, id: managers[indexList].id };
    setCheckManager(list);
    if (isTwoManagersSelected()) {
      setHireds([]);
    }
  };

  const handleHiredListClick = (event, index) => {
    setIndexHired(index);
  };

  const handleCheckChangeHired = (event, value, indexList) => {
    let list = checkHired;
    list[indexList] = { isChecked: value, id: hireds[indexList].id };
    setCheckHired(list);
    console.log(list);
  };

  const handleFilterClick = event => {
    setOpenDialogFilter(true);
  };

  const handleFilterCity = event => {
    setCitySelected(event.currentTarget.innerText);
  };

  const handleFilterPolitic = event => {
    setFilterPoliticSelected(event.target.value);
  };

  const handleFilters = async event => {
    if (citySelected === "" && filterPoliticSelected === 1) {
      setOpenDialogFilter(false);
      return;
    }
    let fetch = await fetchPolitics();
    let list = [];
    console.log("cidade" + citySelected);
    console.log(`tipo ${filterPoliticSelected}`);
    if (citySelected !== "" && filterPoliticSelected !== 1) {
      fetch.forEach(item => {
        if (item.cidade === citySelected) {
          if (list.indexOf(item) === -1) {
            let n = filterPoliticSelected - 1;
            if (item.categoria === n) {
              if (list.indexOf(item) === -1) list.push(item);
            }
          }
        }
      });
    } else if (filterPoliticSelected !== 1 && citySelected === "") {
      let n = filterPoliticSelected - 1;
      fetch.forEach(item => {
        if (item.categoria === n) {
          if (list.indexOf(item) === -1) list.push(item);
        }
      });
    } else if (filterPoliticSelected === 1 && citySelected !== "") {
      fetch.forEach(item => {
        if (item.cidade === citySelected) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
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
    if (list.length === 0) {
      setManagers([]);
      setHireds([]);
    } else {
      setManagers(list[0].gestores);
      setHireds(list[0].gestores[0].contratados);
    }
    setOpenDialogFilter(false);
  };

  const removeFilterCity = async () => {
    setCitySelected("");
    let fetch = await fetchPolitics();
    if (filterPoliticSelected !== 1) {
      let list = [];
      let n = filterPoliticSelected - 1;
      fetch.forEach(item => {
        if (item.categoria === n) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
      setPolitics(list);
      if (list.length !== 0) {
        setManagers(list[0].gestores);
        setHireds(list[0].gestores[0].contratados);
      }
    } else {
      setPolitics(fetch);
      setManagers(fetch[0].gestores);
      setHireds(fetch[0].gestores[0].contratados);
    }
  };

  const removeFilterPolitic = async () => {
    setFilterPoliticSelected(1);

    let fetch = await fetchPolitics();
    if (citySelected !== "") {
      let list = [];
      fetch.forEach(item => {
        if (item.cidade === citySelected) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
      setPolitics(list);
      if (list.length !== 0) {
        setManagers(list[0].gestores);
        setHireds(list[0].gestores[0].contratados);
      }
    } else {
      setPolitics(fetch);
      setManagers(fetch[0].gestores);
      setHireds(fetch[0].gestores[0].contratados);
    }
  };

  return isLessThan500 ? (
    <SmallScreenDash
      onClick={() => {
        window.location.reload();
      }}
    />
  ) : (
    <>
      <AppBar position="static" style={{ height: "42px" }}>
        <Grid container justify="space-between" alignItems="baseline">
          <Grid item>
            <Logo>E - CONTRATO</Logo>
          </Grid>
          <Grid item>
            <div style={{ marginRight: "20px" }}>
              <Button color="inherit" onClick={() => {}}>
                <p>{String(user.nome).split(" ")[0]}</p>
              </Button>
            </div>
          </Grid>
        </Grid>
      </AppBar>

      <StyledGrid container item justify="center">
        <Grid item xs={4} sm={4} md={4}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Button onClick={handleFilterClick}>
                <strong>Filtrar</strong>
              </Button>
              <Dialog
                onClose={() => setOpenDialogFilter(false)}
                open={openDialogFilter}
              >
                <DialogTitle>
                  <Grid container direction="column" spacing={3}>
                    <div style={{ width: 400 }}></div>
                    <Grid item xs sm={12} md={12}>
                      <DropdownPolitics
                        isFilter
                        onChange={handleFilterPolitic}
                      />
                    </Grid>
                    <Grid item xs>
                      <DropdownCities
                        onChange={handleFilterCity}
                        list={cities}
                      ></DropdownCities>
                    </Grid>
                    <Grid item container direction="row-reverse">
                      <StyledButton
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={event => handleFilters(event)}
                      >
                        <FontButton>OK</FontButton>
                      </StyledButton>
                    </Grid>
                  </Grid>
                </DialogTitle>
              </Dialog>
              {citySelected !== "" ? (
                <Button onClick={removeFilterCity}>
                  {citySelected.length > 10 ? (
                    <LabelFilter>
                      {citySelected.substring(0, 10) + "... X"}
                    </LabelFilter>
                  ) : (
                    <LabelFilter>{citySelected} X</LabelFilter>
                  )}
                </Button>
              ) : (
                undefined
              )}
              {filterPoliticSelected !== 1 ? (
                <Button onClick={() => removeFilterPolitic()}>
                  {filterPoliticSelected === 2 ? (
                    <LabelFilter>Prefeitos X</LabelFilter>
                  ) : (
                    <LabelFilter>Vereadores X</LabelFilter>
                  )}
                </Button>
              ) : (
                undefined
              )}
            </Grid>
            <Grid item>
              <ActionButton
                onClicks={[
                  () => {
                    setOpenDialogAddPolitic(true);
                  },
                  () => {
                    setOpenDialogDelete({
                      open: true,
                      list: checkPolitic.filter(item => item.isChecked),
                      type: "politic"
                    });
                  }
                ]}
              />
            </Grid>
          </Grid>
          <Subtitle>Campanhas</Subtitle>
          <CustomList
            onClick={handlePoliticListClick}
            indexSelected={indexPolitic}
            list={politics}
            onCheckChange={handleCheckChangePolitic}
            dropdownNames={["Adicionar assinatura", "Editar"]}
            dropdownOnChange={[
              index => {
                history.push(`/assinatura/${politics[index].token}`, {
                  token: politics[index].token
                });
              },
              () => {}
            ]}
          />
          <Dialog
            onClose={() => setOpenDialogAddPolitic(false)}
            open={openDialogAddPolitic}
          >
            <DialogTitle>
              <FormPolitic
                cities={cities}
                onClick={() => {
                  setOpenDialogAddPolitic(false);
                }}
              />
            </DialogTitle>
          </Dialog>
          <Dialog
            onClose={() =>
              setOpenDialogDelete({ open: false, list: [], type: "" })
            }
            open={openDialogDelete.open}
          >
            <DialogTitle>
              <ConfirmDelete
                type={openDialogDelete.type}
                list={openDialogDelete.list}
                onClickNo={() => setOpenDialogDelete({ open: false, list: [], type: "" })}
                onClickYes={() => {}}

              />
            </DialogTitle>
          </Dialog>
        </Grid>
        <Separator />

        <Grid item xs={3} sm={3} md={4}>
          <div style={{ height: 4 }}></div>
          <ActionButton
            onClicks={[
              () => {
                setOpenDialogAddManager(true);
              },
              () => {}
            ]}
          />
          <div style={{ height: "4.4px" }}></div>
          <Subtitle>Gestores</Subtitle>
          <CustomList
            onClick={handleManagerListClick}
            indexSelected={indexManager}
            list={managers}
            onCheckChange={handleCheckChangeManager}
            dropdownNames={["Editar"]}
            dropdownOnChange={[() => {}]}
          />
          <Dialog
            onClose={() => setOpenDialogAddManager(false)}
            open={openDialogAddManager}
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <FormManager
                onClick={() => {
                  setOpenDialogAddManager(false);
                }}
              />
            </DialogTitle>
          </Dialog>
        </Grid>
        <Separator />

        <Grid item xs={3} sm={3} md={3}>
          <div style={{ height: 4 }}></div>
          <ActionButton
            onClicks={[
              () => {
                setOpenDialogAddHired(true);
              },
              () => {}
            ]}
          />
          <div style={{ height: "4.4px" }}></div>
          <Subtitle>Contratados</Subtitle>
          <CustomList
            onClick={handleHiredListClick}
            indexSelected={indexHired}
            list={hireds}
            onCheckChange={handleCheckChangeHired}
            dropdownNames={[
              "Adicionar assinatura",
              "Adicionar comprovante",
              "Ver PDF",
              "Editar"
            ]}
            dropdownOnChange={[
              index => {
                history.push(`/assinatura/${hireds[index].token}`, {
                  token: hireds[index].token
                });
              },
              index => {},
              index => {
                window.open(hireds[index].contrato);
              },
              index => {}
            ]}
          />
          <Dialog
            onClose={() => setOpenDialogAddHired(false)}
            open={openDialogAddHired}
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <FormHired
                cities={cities}
                onClick={() => {
                  setOpenDialogAddHired(false);
                }}
              />
            </DialogTitle>
          </Dialog>
        </Grid>
      </StyledGrid>
      <Footer>
        Site desenvolvido por<pre> Easycode </pre>- 2020
      </Footer>
    </>
  );
}
