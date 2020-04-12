import React, { useEffect, useCallback, useState } from "react";
import { Button, Grid, Dialog, DialogTitle, AppBar } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  StyledGrid,
  Separator,
  Subtitle,
  LabelFilter,
  Footer,
  Logo,
  FontButton,
  StyledButton,
} from "./styles";
import SmallScreenAlert from "../SmallScreenAlert";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import DropdownPolitics from "../../components/DropdownPolitics";
import DropdownCities from "../../components/DropdownCities";
import FormHired from "../../components/FormHired/index";
import FormManager from "../../components/FormManager";
import FormPolitic from "../../components/FormPolitic";
import ConfirmDelete from "../../components/ConfirmDelete";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";

import { apiADM, apiCities } from "../../services/api";
import LogoImg from "../../assets/logo.svg";

export default function Dashboard() {
  const history = useHistory();
  const [listener, setListener] = useState(true);
  const [isLessThan500, setIsLessThan500] = useState(false);
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [politics, setPolitics] = useState(undefined);
  const [filterPoliticSelected, setFilterPoliticSelected] = useState(0);
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
  const [openDialogAddManager, setOpenDialogAddManager] = useState({
    open: false,
    action: "",
  });
  const [openDialogAddPolitic, setOpenDialogAddPolitic] = useState({
    open: false,
    action: "",
  });
  const [openDialogDelete, setOpenDialogDelete] = useState({
    open: false,
    list: [],
    type: "",
  });

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiCities.get();
      let names = response.data.map(
        (item) =>
          item.nome + " - " + item.municipio.microrregiao.mesorregiao.UF.sigla
      );
      setCities(names);
    }
  }, [cities]);

  const fetchHireds = useCallback(
    async (idManager) => {
      let hiredsAll = [];
      await apiADM
        .get(`hired?hiredId=${idManager}`)
        .then((response) => {
          response.data.forEach((item) => {
            hiredsAll.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      setHireds(hiredsAll);
    },
    [setHireds]
  );

  const fetchManagers = useCallback(
    async (idPolitic) => {
      console.log("fetch manager");
      let managersAll = [];
      await apiADM
        .get(`manager?politicId=${idPolitic}`)
        .then((response) => {
          response.data.forEach((item) => {
            managersAll.push(item);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      setManagers(managersAll);
    },
    [setManagers]
  );

  const fetchPolitics = useCallback(async () => {
    let politicsAll = [];
    await apiADM
      .get(`/politic?adminId=${localStorage.getItem("userId")}`)
      .then(async (response) => {
        response.data.forEach(async (item) => {
          let p = {
            name: item.name,
            id: item.id,
            group: item.group,
            document: item.document,
            type: item.type,
            city: item.city,
            street: item.street,
            district: item.district,
            number: item.number,
            zipcode: item.zipcode,
          };
          politicsAll.push(p);
        });
        setPolitics(politicsAll);
        if (!politicsAll.isEmpty){ 
          await fetchManagers(politicsAll[0].id);
          if(!managers.isEmpty) {  
            fetchHireds(managers[0].id);
          }
        };
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 401) {
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
        } else toast.error("Ocorreu um erro ao carregar os dados.");
        console.log(error);
      });
  }, [history, setPolitics, fetchManagers]);

  const onOrientationChange = useCallback(() => {
    console.log("oi");
    if (window.screen.availWidth < 500) {
      setIsLessThan500(true);
      return;
    }
    console.log("change");
    setIsLessThan500(false);
    if (window.matchMedia("(orientation: landscape)").matches) {
      // if (allow) {
      console.log("oi");
      setIsLessThan500(false);
      return;
      //}
      // if (window.screen.availWidth < 500) {
      //   setIsLessThan500(true);
      // }
    }
  }, [setIsLessThan500]);

  const handlePoliticListClick = async (event, index) => {
    setIndexPolitic(index);
    await fetchManagers(politics[index].id);
  };

  const handleCheckChangePolitic = (event, value, indexList) => {
    let list = checkPolitic;
    if (list === undefined) list = [];
    if (value) {
      list.push(politics[indexList].id);
    } else {
      let indexRemove = list.findIndex(
        (item) => item === politics[indexList].id
      );
      list.splice(indexRemove, 1);
    }
    setCheckPolitic(list);

    console.log(list);
  };

  const handleManagerListClick = (event, index) => {
    setIndexManager(index);
    // setHireds(managers[index].contratados);
  };

  const handleCheckChangeManager = (event, value, indexList) => {
    let list = checkManager;
    if (list === undefined) list = [];
    if (value) {
      list.push(managers[indexList].id);
    } else {
      let indexRemove = list.findIndex(
        (item) => item === managers[indexList].id
      );
      list.splice(indexRemove, 1);
    }
    setCheckManager(list);
  };

  const handleHiredListClick = (event, index) => {
    setIndexHired(index);
  };

  const handleCheckChangeHired = (event, value, indexList) => {
    let list = checkHired;
    if (list === undefined) list = [];
    if (value) {
      list.push(hireds[indexList].id);
    } else {
      let indexRemove = list.findIndex((item) => item === hireds[indexList].id);
      list.splice(indexRemove, 1);
    }
    setCheckHired(list);
  };

  const handleFilterClick = (event) => {
    setOpenDialogFilter(true);
  };

  const handleFilterCity = (event, value) => {
    setCitySelected(value);
  };

  const handleFilterPolitic = (event) => {
    setFilterPoliticSelected(event.target.value);
  };

  const handleFilters = async (event) => {
    if (citySelected === "" && filterPoliticSelected === 0) {
      setOpenDialogFilter(false);
      return;
    }
    await fetchPolitics();
    let fetch = politics;
    let list = [];
    if (citySelected !== "" && filterPoliticSelected !== 0) {
      fetch.forEach((item) => {
        if (item.city === citySelected) {
          if (!list.includes(item)) {
            if (item.type === filterPoliticSelected) {
              if (!list.includes(item)) list.push(item);
            }
          }
        }
      });
    } else if (filterPoliticSelected !== 0 && citySelected === "") {
      let n = filterPoliticSelected;
      fetch.forEach((item) => {
        if (item.type === n) {
          if (list.indexOf(item) === -1) list.push(item);
        }
      });
    } else if (filterPoliticSelected === 0 && citySelected !== "") {
      fetch.forEach((item) => {
        if (item.city === citySelected) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
    }
    setPolitics(list);
    setOpenDialogFilter(false);
    // if (list.length === 0) {
    //   setManagers([]);
    //   setHireds([]);
    // } else {
    //   setManagers(list[0].gestores);
    //   setHireds(list[0].gestores[0].contratados);
    // }
  };

  const removeFilterCity = async () => {
    setCitySelected("");
    let fetch = await fetchPolitics();
    if (filterPoliticSelected !== 0) {
      let list = [];
      let n = filterPoliticSelected + 1;
      fetch.forEach((item) => {
        if (item.type === n) {
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
      // setManagers(fetch[0].gestores);
      // setHireds(fetch[0].gestores[0].contratados);
    }
  };

  const removeFilterPolitic = async () => {
    setFilterPoliticSelected(0);

    let fetch = await fetchPolitics();
    if (citySelected !== "") {
      let list = [];
      fetch.forEach((item) => {
        if (item.city === citySelected) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
      setPolitics(list);
      // if (list.length !== 0) {
      //   setManagers(list[0].gestores);
      //   setHireds(list[0].gestores[0].contratados);
      // }
    } else {
      setPolitics(fetch);
      // setManagers(fetch[0].gestores);
      // setHireds(fetch[0].gestores[0].contratados);
    }
  };

  useEffect(() => {
    fetchPolitics();
    fetchCities();
    onOrientationChange();
  }, []);

  useEffect(() => {
    if (listener)
      window.addEventListener("orientationchange", onOrientationChange, false);
    else
      window.removeEventListener(
        "orientationchange",
        onOrientationChange,
        false
      );

    //  return  window.removeEventListener("orientationchange", onOrientationChange, false);
  }, [listener, onOrientationChange]);

  if (!politics) return <Loading />;
  else {
    if (isLessThan500) return <SmallScreenAlert />;
    else {
      return (
        <>
          <AppBar position="static">
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ height: 42 }}
            >
              <Grid item>
                <Logo src={LogoImg} />
              </Grid>
              <Grid item>
                <div style={{ marginRight: "20px" }}>
                  <Button color="inherit" onClick={() => {}}>
                    <p>{localStorage.getItem("username").split(" ")[0]}</p>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </AppBar>
          <div
            style={{
              marginLeft: 45,
              marginTop: 10,
              marginBottom: 0,
              paddingBottom: 0,
            }}
          >
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
            ) : undefined}
            {filterPoliticSelected !== 0 ? (
              <Button onClick={() => removeFilterPolitic()}>
                {filterPoliticSelected === 1 ? (
                  <LabelFilter>Prefeitos X</LabelFilter>
                ) : (
                  <LabelFilter>Vereadores X</LabelFilter>
                )}
              </Button>
            ) : undefined}
          </div>
          <StyledGrid container item justify="center">
            <Grid item xs={4} sm={4} md={4}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Button onClick={handleFilterClick}>
                    <strong>Filtrar</strong>
                  </Button>
                  <Dialog
                    onClose={() => {
                      setOpenDialogFilter(false);
                    }}
                    open={openDialogFilter}
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <Grid container direction="column" spacing={3}>
                        <div style={{ width: 400 }}></div>
                        <Grid item xs sm={12} md={12}>
                          <DropdownPolitics
                            isFilter={1}
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
                            onClick={async (event) =>
                              await handleFilters(event)
                            }
                          >
                            <FontButton>OK</FontButton>
                          </StyledButton>
                        </Grid>
                      </Grid>
                    </DialogTitle>
                  </Dialog>
                </Grid>
                <Grid item>
                  <ActionButton
                    onClicks={[
                      () => {
                        setOpenDialogAddPolitic({ open: true, action: "add" });
                        setListener(false);
                      },
                      () => {
                        setOpenDialogDelete({
                          open: true,
                          list: checkPolitic,
                          type: "politic",
                        });
                      },
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
                  (index) => {
                    history.push(`/assinatura/${politics[index].token}`, {
                      token: politics[index].token,
                    });
                  },
                  () => {
                    setOpenDialogAddPolitic({ open: true, action: "edit" });
                  },
                ]}
              />
              <Dialog
                onClose={() => {
                  setOpenDialogAddPolitic({ open: false });
                }}
                open={openDialogAddPolitic.open}
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <FormPolitic
                    cities={cities}
                    onCancel={() => {
                      setListener(true);
                      onOrientationChange();
                      setOpenDialogAddPolitic({ open: false });
                    }}
                    onClose={async () => {
                      setOpenDialogAddPolitic({ open: false });
                      fetchPolitics();
                    }}
                    editPolitic={
                      openDialogAddPolitic.action === "edit"
                        ? politics[indexPolitic]
                        : undefined
                    }
                  />
                </DialogTitle>
              </Dialog>
              <Dialog
                onClose={() =>
                  setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: "",
                  })
                }
                open={
                  openDialogDelete.open && openDialogDelete.type === "politic"
                }
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <ConfirmDelete
                    type={openDialogDelete.type}
                    list={openDialogDelete.list}
                    onBack={async () => {
                      setOpenDialogDelete({
                        open: false,
                        list: undefined,
                        type: "",
                      });
                      window.location.reload();
                    }}
                    overId={localStorage.getItem("userId")}
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
                    setOpenDialogAddManager({ open: true, action: "add" });
                  },
                  () => {
                    setOpenDialogDelete({
                      open: true,
                      list: checkManager,
                      type: "manager",
                    });
                  },
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
                dropdownOnChange={[
                  () => {
                    setOpenDialogAddManager({ open: true, action: "edit" });
                  },
                ]}
              />
              <Dialog
                onClose={() => setOpenDialogAddManager({ open: false })}
                open={openDialogAddManager.open}
              >
                {!politics.isEmpty ? (
                  <DialogTitle style={{ background: "#f5f3f3" }}>
                    <FormManager
                      politic={politics[indexPolitic]}
                      onClose={async () => {
                        setOpenDialogAddManager({ open: false });
                        await fetchManagers(politics[indexPolitic].id);
                      }}
                      onCancel={() => {
                        setOpenDialogAddManager({ open: false });
                      }}
                      editManager={
                        openDialogAddManager.action === "edit"
                          ? managers[indexManager]
                          : undefined
                      }
                    />
                  </DialogTitle>
                ) : (
                  <></>
                )}
              </Dialog>
              <Dialog
                onClose={() =>
                  setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: "",
                  })
                }
                open={
                  openDialogDelete.open && openDialogDelete.type === "manager"
                }
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <ConfirmDelete
                    type={openDialogDelete.type}
                    list={openDialogDelete.list}
                    onBack={async () => {
                      setOpenDialogDelete({
                        open: false,
                        list: undefined,
                        type: "",
                      });
                      window.location.reload();
                    }}
                    overId={politics[indexPolitic].id}
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
                  () => {
                    setOpenDialogDelete({
                      open: true,
                      list: checkHired,
                      type: "hired",
                    });
                  },
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
                  "Editar",
                ]}
                dropdownOnChange={[
                  (index) => {
                    history.push(`/assinatura/${hireds[index].token}`, {
                      token: hireds[index].token,
                    });
                  },
                  (index) => {},
                  (index) => {
                    window.open(hireds[index].contrato);
                  },
                  (index) => {},
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
                      // setOpenDialogAddHired(false);
                    }}
                  />
                </DialogTitle>
              </Dialog>
              <Dialog
                onClose={() =>
                  setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: "",
                  })
                }
                open={
                  openDialogDelete.open && openDialogDelete.type === "hired"
                }
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <ConfirmDelete
                    type={openDialogDelete.type}
                    list={openDialogDelete.list}
                    onClickNo={() =>
                      setOpenDialogDelete({
                        open: false,
                        list: undefined,
                        type: "",
                      })
                    }
                    onClickYes={() => {}}
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
  }
}
