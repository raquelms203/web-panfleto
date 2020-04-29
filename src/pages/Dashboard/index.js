import React, { useEffect, useCallback, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  AppBar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
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
  FontToken,
  SpaceDiv,
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
  const [isLessThan500, setIsLessThan500] = useState(false);
  const [listener, setListener] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [politics, setPolitics] = useState(undefined);
  const [filterPoliticSelected, setFilterPoliticSelected] = useState(0);
  const [checkPolitic, setCheckPolitic] = useState([]);
  const [indexPolitic, setIndexPolitic] = useState(0);
  const [managers, setManagers] = useState(undefined);
  const [indexManager, setIndexManager] = useState(0);
  const [checkManager, setCheckManager] = useState([]);
  const [hireds, setHireds] = useState(undefined);
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
  const [openDialogSign, setOpenDialogSign] = useState({
    open: false,
    token: "",
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
          if (Boolean(error.response) && error.response.status === 401) {
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          } else toast.error("Ocorreu um erro ao carregar os dados!");
        });
    },
    [setHireds, history]
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
          if (Boolean(error.response) && error.response.status === 401) {
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          } else toast.error("Ocorreu um erro ao carregar os dados!");
        });
    },
    [setManagers, fetchHireds, history]
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
          setHireds([]);
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
        } else toast.error("Ocorreu um erro ao carregar os dados!");
      });
  }, [history, setPolitics, fetchManagers]);

  const sendEmailManager = async () => {
    await apiADM
      .get(
        `/manager/${managers[indexManager].id}?politicId=${politics[indexPolitic].id}&action=new-token`
      )
      .then(() => {
        toast.success("Email enviado para o gestor com sucesso!");
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 401)
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
        else toast.error("Ocorreu um erro ao enviar email!");
      });
  };

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
    }
  }, [setIsLessThan500]);

  const fetchTokenPolitic = async () => {
    let token = "";
    await apiADM
      .get(
        `/politic/${politics[indexPolitic].id}?adminId=${localStorage.getItem(
          "userId"
        )}action=new-token`
      )
      .then((response) => {
        token = response.data.token;
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 400) {
          toast.info("Político já assinou!");
          return;
        } else if (Boolean(error.response) && error.response.status === 401)
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
        else toast.error("Ocorreu um erro ao gerar token");
      });
    return token;
  };

  const fetchTokenHired = async () => {
    let token = "";
    await apiADM
      .get(
        `/hired/${hireds[indexHired].id}?managerId=${managers[indexManager].id}` +
          `&action=new-token`
      )
      .then((response) => {
        token = response.data.token;
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 400) {
          toast.info("Contratado já assinou!");
          return;
        } else if (Boolean(error.response) && error.response.status === 401)
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
        toast.error("Ocorreu um erro ao gerar token");
      });
    return token;
  };

  const handlePoliticListClick = async (event, index) => {
    setIndexPolitic(index);
    setIndexManager(0);
    setIndexHired(0);
    await fetchManagers(politics[index].id);
  };

  const handleCheckChangePolitic = (event, value, indexList) => {
    let list = [...checkPolitic];
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
    let list = [...checkManager];
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
    let list = [...checkHired];
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
    setListener(false);
  };

  const handleFilterCity = (event, value) => {
    setCitySelected(value);
  };

  const handleFilterPolitic = (event) => {
    setFilterPoliticSelected(event.target.value);
  };

  const handleFilters = async (event) => {
    setListener(true);
    onOrientationChange();
    if (citySelected === "" && filterPoliticSelected === 0) {
      setOpenDialogFilter(false);
      return;
    }
    await fetchPolitics();
    let list = [];
    let p = [...politics];
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
    if (list.length !== 0) {
      setPolitics(list);
      await fetchManagers(list[0].id);
    } else {
      p.splice(0, p.length);
      setPolitics(p);
      setManagers([]);
      setHireds([]);
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
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          else toast.error("Ocorreu um erro ao carregar os dados!");
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
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                },
              }
            );
          else toast.error("Ocorreu um erro ao carregar os dados!");
        });
      setPolitics(list);
      setIndexPolitic(0);

      if (list.length !== 0) {
        await fetchManagers(list[0].id);
      }
    } else await fetchPolitics();
  };

  const sendEmailContract = async () => {
    await apiADM
      .post(
        `/hired/${hireds[indexHired].id}?managerId=${managers[indexManager].id}&action=sendContract`
      )
      .then(() => {
        toast.success("Email enviado com sucesso!");
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 400) {
          toast.error("Erro. É necessário assinar e validar antes.");
        } else if (Boolean(error.response) && error.response.status === 401)
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
        else toast.error("Ocorreu um erro ao enviar email!");
      });
  };

  const expiresToken = () => {
    let d = new Date().toLocaleTimeString("pt-br", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });
    let hour = parseInt(d.split(":")[0]);
    let nextHour;
    let nextTime;
    if (hour === 23) nextHour = "00";
    else if (hour === 0) nextHour = "01";
    else {
      if (d.split(":")[0].length === 1) {
        nextHour = "0" + (1 + hour).toString();
      } else {
        nextHour = (1 + hour).toString();
      }
    }
    nextTime = nextHour + ":" + d.split(":")[1];
    return `Código gerado às ${d}. Válido até ${nextTime}.`;
  };

  useEffect(() => {
    fetchPolitics();
    fetchCities();
    onOrientationChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listener)
      window.addEventListener("orientationchange", onOrientationChange);
    else {
      window.removeEventListener("orientationchange", onOrientationChange);
    }

    return () =>
      window.removeEventListener("orientationchange", onOrientationChange);
  }, [listener, onOrientationChange]);

  if (localStorage.length === 0) {
    history.push("/");
    return null;
  } else if (!politics) return <Loading />;
  else if (politics) {
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
                  <Button
                    color="inherit"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    <p>{localStorage.getItem("username").split(" ")[0]}</p>
                    <ArrowDropDown style={{ marginTop: -3 }} />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        localStorage.clear();
                        history.push("/");
                        setAnchorEl(null);
                      }}
                    >
                      Sair
                    </MenuItem>
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </AppBar>
          <SpaceDiv>
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
          </SpaceDiv>
          <StyledGrid container item justify="center">
            <Grid item xs={4} sm={4} md={4}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  {politics.length > 0 ? (
                    <Button onClick={(event) => handleFilterClick(event)}>
                      <strong>Filtrar</strong>
                    </Button>
                  ) : (
                    <div style={{ height: 36 }} />
                  )}
                  <Dialog
                    onClose={() => {
                      setOpenDialogFilter(false);
                      setListener(true);
                      onOrientationChange();
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
                            onClick={async (event) => {
                              await handleFilters(event);
                            }}
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
                    remove={Boolean(checkPolitic.length > 0)}
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
                  async (index) => {
                    let token = await fetchTokenPolitic();
                    if (token.length > 0) {
                      setOpenDialogSign({ open: true, token: token });
                      setListener(false);
                    }
                  },
                  () => {
                    setOpenDialogAddPolitic({ open: true, action: "edit" });
                    setListener(false);
                  },
                ]}
              />
              <Dialog
                onClose={() => {
                  setOpenDialogAddPolitic({ open: false, action: "" });
                  setListener(true);
                  onOrientationChange();
                }}
                open={openDialogAddPolitic.open}
              >
                <DialogTitle style={{ background: "#f5f3f3", padding: 0 }}>
                  <FormPolitic
                    cities={cities}
                    onCancel={() => {
                      setOpenDialogAddPolitic({ open: false, action: "" });
                      setListener(true);
                      onOrientationChange();
                    }}
                    onClose={async () => {
                      setOpenDialogAddPolitic({ open: false, action: "" });
                      fetchPolitics();
                      setListener(true);
                      onOrientationChange();
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
                onClose={() => {
                  setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: "",
                  });
                }}
                open={
                  openDialogDelete.open && openDialogDelete.type === "politic"
                }
              >
                <DialogTitle>
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
                        type: "politic",
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
                remove={Boolean(checkManager.length > 0)}
                disabledAdd={!Boolean(politics) || politics.length === 0}
                overType="campanhas"
                onClicks={[
                  () => {
                    setOpenDialogAddManager({ open: true, action: "add" });
                    setListener(false);
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
                dropdownNames={["Detalhes", "Reenviar email cadastro"]}
                dropdownOnChange={[
                  () => {
                    setOpenDialogAddManager({ open: true, action: "edit" });
                    setListener(false);
                  },
                  async () => {
                    await sendEmailManager();
                  },
                ]}
              />
              {politics.length === 0 ? (
                <></>
              ) : (
                <>
                  <Dialog
                    onClose={() => {
                      setOpenDialogAddManager({ open: false });
                      setListener(true);
                      onOrientationChange();
                    }}
                    open={openDialogAddManager.open}
                  >
                    <DialogTitle style={{ background: "#f5f3f3", padding: 0 }}>
                      <FormManager
                        politic={politics[indexPolitic]}
                        onClose={async () => {
                          setListener(true);
                          onOrientationChange();
                          setOpenDialogAddManager({ open: false });
                          await fetchManagers(politics[indexPolitic].id);
                        }}
                        onCancel={() => {
                          setListener(true);
                          onOrientationChange();
                          setOpenDialogAddManager({ open: false });
                        }}
                        viewManager={
                          openDialogAddManager.action === "edit"
                            ? managers[indexManager]
                            : undefined
                        }
                      />
                    </DialogTitle>
                  </Dialog>
                  <Dialog
                    onClose={() => {
                      setOpenDialogDelete({
                        open: false,
                        list: undefined,
                        type: "",
                      });
                    }}
                    open={
                      openDialogDelete.open &&
                      openDialogDelete.type === "manager"
                    }
                  >
                    <DialogTitle>
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
                disabledAdd={!Boolean(managers) || managers.length === 0}
                overType="gestores"
                remove={Boolean(checkHired.length !== 0)}
                onClicks={[
                  () => {
                    setOpenDialogAddHired({ open: true, action: "add" });
                    setListener(false);
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
                  "Validar informações",
                  "Adicionar comprovante",
                  "Concluir contrato",
                ]}
                dropdownOnChange={[
                  async (index) => {
                    let token = await fetchTokenHired();
                    if (token.length > 0)
                      setOpenDialogSign({ open: true, token: token });
                  },
                  (index) => {
                    setOpenDialogAddHired({ open: true, action: "edit" });
                    setListener(false);
                  },
                  (index) => {
                    setOpenDialogReceipt(true);
                  },
                  (index) => {
                    sendEmailContract();
                  },
                ]}
              />
              {politics.length === 0 || !managers || managers.length === 0 ? (
                <></>
              ) : (
                <>
                  <Dialog
                    onClose={async () => {
                      setOpenDialogAddHired({ open: false });
                      setListener(true);
                      onOrientationChange();
                    }}
                    open={openDialogAddHired.open}
                  >
                    <DialogTitle style={{ background: "#f5f3f3", padding: 0 }}>
                      <FormHired
                        groupPolitic={politics[
                          indexPolitic
                        ].group.toUpperCase()}
                        title={`Campanha: (${politics[
                          indexPolitic
                        ].group.toUpperCase()}) ${
                          politics[indexPolitic].name.split(" ")[0]
                        } | ${managers[indexManager].name.split(" ")[0]}`}
                        managerId={managers[indexManager].id}
                        cities={cities}
                        onClose={async () => {
                          setListener(true);
                          onOrientationChange();
                          setOpenDialogAddHired({ open: false });
                          await fetchHireds(managers[indexManager].id);
                        }}
                        onCancel={() => {
                          setListener(true);
                          onOrientationChange();
                          setOpenDialogAddHired({ open: false });
                        }}
                        viewHired={
                          openDialogAddHired.action === "edit"
                            ? hireds[indexHired]
                            : undefined
                        }
                      />
                    </DialogTitle>
                  </Dialog>
                  <Dialog
                    onClose={() => {
                      setOpenDialogDelete({
                        open: false,
                        list: undefined,
                        type: "",
                      });
                    }}
                    open={
                      openDialogDelete.open && openDialogDelete.type === "hired"
                    }
                  >
                    <DialogTitle>
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
                  {hireds && hireds.length > 0 ? (
                    <Dialog
                      onClose={() => {
                        setOpenDialogReceipt(false);
                        setListener(true);
                        onOrientationChange();
                      }}
                      open={openDialogReceipt}
                    >
                      <DialogTitle>
                        <Receipt
                          idManager={managers[indexManager].id}
                          idHired={hireds[indexHired].id}
                          onBack={() => {
                            setOpenDialogReceipt(false);
                          }}
                        />
                      </DialogTitle>
                    </Dialog>
                  ) : undefined}
                </>
              )}
              <Dialog
                onClose={async () => {
                  setOpenDialogSign({ open: false, token: ` ` });
                  setListener(true);
                  onOrientationChange();
                }}
                open={openDialogSign.open}
              >
                <DialogTitle>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <p>
                        Para concluir o cadastro baixe o aplicativo e-Contrato
                        para celular e use o código:
                      </p>
                      <FontToken>{`${openDialogSign.token}`}</FontToken>
                      <p>{expiresToken()}</p>
                    </Grid>
                    <Grid item>
                      <Grid item container direction="row-reverse">
                        <StyledButton
                          style={{ background: "#958a94" }}
                          variant="contained"
                          size="large"
                          onClick={async (event) => {
                            setOpenDialogSign({ open: false, token: ` ` });
                            setListener(true);
                            onOrientationChange();
                          }}
                        >
                          <FontButton>Voltar</FontButton>
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogTitle>
              </Dialog>
            </Grid>
          </StyledGrid>
          <Footer>Site desenvolvido por Easycode - 2020</Footer>
        </>
      );
    }
  }
}
