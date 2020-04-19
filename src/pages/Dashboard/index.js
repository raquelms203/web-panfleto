import React, { useEffect, useCallback, useState } from "react";
import { Button, Grid, Dialog, DialogTitle, AppBar } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router-dom";

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
import Receipt from "../../components/Receipt/index";
import FormManager from "../../components/FormManager";
import FormPolitic from "../../components/FormPolitic";
import ConfirmDelete from "../../components/ConfirmDelete";
import Loading from "../../components/Loading";
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
  const [openDialogReceipt, setOpenDialogReceipt] = useState(false);
  const [openDialogAddHired, setOpenDialogAddHired] = useState({
    open: false,
    action: "",
  });
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
        .get(`hired?managerId=${idManager}`)
        .then((response) => {
          response.data.forEach((item) => {
            hiredsAll.push(item);
          });
          setHireds(hiredsAll);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setHireds]
  );

  const fetchManagers = useCallback(
    async (idPolitic) => {
      let managersAll = [];
      await apiADM
        .get(`manager?politicId=${idPolitic}`)
        .then(async (response) => {
          response.data.forEach((item) => {
            let m = {
              id: item.id,
              name: item.name,
              document: item.document,
              email: item.email,
            };
            managersAll.push(m);
          });
          setManagers(managersAll);
          if (managersAll.length !== 0) {
            await fetchHireds(managersAll[0].id);
          } else {
            setHireds([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setManagers]
  );

  const fetchPolitics = useCallback(async () => {
    let politicsAll = [];
    await apiADM
      .get(`/politic?adminId=${localStorage.getItem("userId")}`)
      .then(async (response) => {
        response.data.forEach((item) => {
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
        if (politicsAll.length !== 0) {
          await fetchManagers(politicsAll[0].id);
        } else {
          setManagers([]);
        }
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
  }, [history, setPolitics, fetchManagers, fetchHireds, managers]);

  const onOrientationChange = useCallback(() => {
    if (window.screen.availWidth < 500) {
      setIsLessThan500(true);
      return;
    }
    setIsLessThan500(false);
    if (window.matchMedia("(orientation: landscape)").matches) {
      // if (allow) {
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
    setIndexManager(0);
    setIndexHired(0);
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
  };

  const handleManagerListClick = async (event, index) => {
    setIndexManager(index);
    setIndexHired(0);
    await fetchHireds(managers[index].id);
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
    let list = [];
    if (citySelected !== "" && filterPoliticSelected !== 0) {
      politics.forEach((item) => {
        if (item.city === citySelected) {
          if (!list.includes(item)) {
            if (item.type === filterPoliticSelected) {
              if (!list.includes(item)) {
                list.push(item);
              }
            }
          }
        }
      });
    } else if (filterPoliticSelected !== 0 && citySelected === "") {
      let n = filterPoliticSelected;
      politics.forEach((item) => {
        if (item.type === n) {
          if (list.indexOf(item) === -1) list.push(item);
        }
      });
    } else if (filterPoliticSelected === 0 && citySelected !== "") {
      politics.forEach((item) => {
        if (item.city === citySelected) {
          if (list.indexOf(item) === -1) {
            list.push(item);
          }
        }
      });
    }
    setPolitics(list);
    if (list.length !== 0) {
      await fetchManagers(list[0].id);
    }
    setOpenDialogFilter(false);
    setIndexPolitic(0);
  };

  const removeFilterCity = async () => {
    setCitySelected("");
    let list = [];

    if (filterPoliticSelected !== 0) {
      await apiADM
        .get(`/politic?adminId=${localStorage.getItem("userId")}`)
        .then(async (response) => {
          let resp = response.data;
          for (let i = 0; i < resp.length; i++) {
            if (resp[i].type === filterPoliticSelected) {
              if (list.indexOf(resp[i]) === -1) {
                let p = {
                  name: resp[i].name,
                  id: resp[i].id,
                  group: resp[i].group,
                  document: resp[i].document,
                  type: resp[i].type,
                  city: resp[i].city,
                  street: resp[i].street,
                  district: resp[i].district,
                  number: resp[i].number,
                  zipcode: resp[i].zipcode,
                };
                list.push(p);
              }
            }
          }
        })
        .catch((error) => {
          toast.error("Ocorreu um erro ao carregar os dados!");
          console.log(error);
        });

      setPolitics(list);
      setIndexPolitic(0);
      if (list.length !== 0) {
        await fetchManagers(list[0].id);
      }
    } else {
      await fetchPolitics();
    }
  };

  const removeFilterPolitic = async () => {
    setFilterPoliticSelected(0);
    if (citySelected !== "") {
      let list = [];
      await apiADM
        .get(`/politic?adminId=${localStorage.getItem("userId")}`)
        .then(async (response) => {
          let resp = response.data;
          for (let i = 0; i < resp.length; i++) {
            if (resp[i].city === citySelected) {
              if (list.indexOf(resp[i]) === -1) {
                let p = {
                  name: resp[i].name,
                  id: resp[i].id,
                  group: resp[i].group,
                  document: resp[i].document,
                  type: resp[i].type,
                  city: resp[i].city,
                  street: resp[i].street,
                  district: resp[i].district,
                  number: resp[i].number,
                  zipcode: resp[i].zipcode,
                };
                list.push(p);
              }
            }
          }
        });
      setPolitics(list);
      setIndexPolitic(0);

      if (list.length !== 0) {
        await fetchManagers(list[0].id);
      }
    } else await fetchPolitics();
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

  if (!Boolean(politics)) return <Loading />;
  else if (Boolean(politics)) {
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
                  setOpenDialogAddPolitic({ open: false, action: "" });
                }}
                open={openDialogAddPolitic.open}
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <FormPolitic
                    cities={cities}
                    onCancel={() => {
                      setListener(true);
                      onOrientationChange();
                      setOpenDialogAddPolitic({ open: false, action: "" });
                    }}
                    onClose={async () => {
                      setOpenDialogAddPolitic({ open: false, action: "" });
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
                      });
                      window.location.reload();
                    }}
                    overId={localStorage.getItem("userId")}
                    onClickNo={() =>
                      setOpenDialogDelete({
                        open: false,
                        type: "",
                      })
                    }
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
                dropdownNames={["Detalhes"]}
                dropdownOnChange={[
                  () => {
                    setOpenDialogAddManager({ open: true, action: "edit" });
                  },
                ]}
              />
              {politics.length === 0 ? (
                <></>
              ) : (
                <>
                  <Dialog
                    onClose={() => setOpenDialogAddManager({ open: false })}
                    open={openDialogAddManager.open}
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <FormManager
                        politic={politics[indexPolitic]}
                        onClose={async () => {
                          setOpenDialogAddManager({ open: false });
                          await fetchManagers(politics[indexPolitic].id);
                        }}
                        onCancel={() =>
                          setOpenDialogAddManager({ open: false })
                        }
                        viewManager={
                          openDialogAddManager.action === "edit"
                            ? managers[indexManager]
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
                      openDialogDelete.open &&
                      openDialogDelete.type === "manager"
                    }
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <ConfirmDelete
                        overId={politics[indexPolitic].id}
                        type={openDialogDelete.type}
                        list={openDialogDelete.list}
                        onBack={async () => {
                          setOpenDialogDelete({
                            open: false,
                          });
                          window.location.reload();
                        }}
                        onClickNo={() =>
                          setOpenDialogDelete({
                            open: false,
                            type: "",
                          })
                        }
                      />
                    </DialogTitle>
                  </Dialog>
                </>
              )}
            </Grid>
            <Separator />

            <Grid item xs={3} sm={3} md={3}>
              <div style={{ height: 4 }}></div>
              <ActionButton
                onClicks={[
                  () => {
                    setOpenDialogAddHired({ open: true, action: "add" });
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
                  "Detalhes",
                ]}
                dropdownOnChange={[
                  (index) => {
                    history.push(`/assinatura/${hireds[index].token}`, {
                      token: hireds[index].token,
                    });
                  },
                  (index) => {  
                    setOpenDialogReceipt(true);
                  },
                  (index) => {
                    setOpenDialogAddHired({ open: true, action: "edit" });
                  },
                ]}
              />
              {managers.length === 0 ? (
                <></>
              ) : (
                <>
                  <Dialog
                    onClose={async () => {
                      setOpenDialogAddHired({ open: false });
                    }}
                    open={openDialogAddHired.open}
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <FormHired
                        groupPolitic={politics[indexPolitic].group.toUpperCase()}
                        title={`Campanha: (${politics[indexPolitic].group.toUpperCase()}) ${
                          politics[indexPolitic].name.split(" ")[0]
                        } | ${managers[indexManager].name.split(" ")[0]}`}
                        manager={managers[indexManager]}
                        cities={cities}
                        onClose={async () => {
                          setOpenDialogAddHired({ open: false });
                          await fetchHireds(managers[indexManager].id);
                        }}
                        onCancel={() => setOpenDialogAddHired({ open: false })}
                        viewHired={
                          openDialogAddHired.action === "edit"
                            ? hireds[indexHired]
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
                      openDialogDelete.open && openDialogDelete.type === "hired"
                    }
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <ConfirmDelete
                        onBack={() => {
                          setOpenDialogDelete({ open: false });
                          window.location.reload();
                        }}
                        overId={managers[indexManager].id}
                        type={openDialogDelete.type}
                        list={openDialogDelete.list}
                        onClickNo={() =>
                          setOpenDialogDelete({
                            open: false,
                            type: "",
                          })
                        }
                      />
                    </DialogTitle>
                  </Dialog>
                  <Dialog
                    onClose={() =>
                      setOpenDialogReceipt(false)
                    }
                    open={
                      openDialogReceipt
                    }
                  >
                    <DialogTitle style={{ background: "#f5f3f3" }}>
                      <Receipt
                        onBack={() => {
                          setOpenDialogReceipt(false);
                        }}
                      />
                    </DialogTitle>
                  </Dialog>
                </>
              )}
            </Grid>
          </StyledGrid>
          <Footer>Site desenvolvido por Easycode - 2020</Footer>
        </>
      );
    }
  }
}
