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
} from "../Dashboard/styles";
import SmallScreenAlert from "../SmallScreenAlert";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import DropdownPolitics from "../../components/DropdownPolitics";
import FormHired from "../../components/FormHired/index";
import Loading from "../../components/Loading";
import { apiADM, apiCities } from "../../services/api";
import LogoImg from "../../assets/logo.svg";

export default function DashManager(props) {
  const history = useHistory();
  const [isLessThan500, setIsLessThan500] = useState(false);
  const [cities, setCities] = useState("");
  const [listener, setListener] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hireds, setHireds] = useState(undefined);
  const [indexHired, setIndexHired] = useState(0);
  const [openDialogAddHired, setOpenDialogAddHired] = useState({
    open: false,
    action: "",
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
    [setHireds]
  );

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
  }, [setIsLessThan500, listener]);

  const fetchTokenHired = async () => {
    let token = "";
    await apiADM
      .get(
        `/hired/${hireds[indexHired].id}?managerId=${localStorage.getItem(
          "userId"
        )}` + `&action=new-token`
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

  const handleHiredListClick = (event, index) => {
    setIndexHired(index);
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
    fetchHireds(localStorage.getItem("userId"));
    fetchCities();
    onOrientationChange();
  }, []);

  useEffect(() => {
    if (listener)
      window.addEventListener("orientationchange", onOrientationChange);
    else {
      console.log("remove");
      window.removeEventListener("orientationchange", onOrientationChange);
    }

    return () =>
      window.removeEventListener("orientationchange", onOrientationChange);
  }, [listener, onOrientationChange]);

  if (localStorage.length === 0) {
    history.push("/");
    return null;
  } else if (!hireds) return <Loading />;
  else if (hireds) {
    if (isLessThan500) return <SmallScreenAlert />;

    return (
      <>
        <Grid container direction="column">
          <Grid item xs={12} sm={12} md={12}>
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
          </Grid>
          <div style={{ height: 20 }} />
        </Grid>
        <Grid item style={{ paddingRight: 20, paddingLeft: 20 }}>
          <SpaceDiv>
            <ActionButton
              remove={false}
              onClicks={[
                () => {
                  setOpenDialogAddHired({ open: true, action: "add" });
                  setListener(false);
                },
                () => {},
              ]}
            />
            <Subtitle>Contratados</Subtitle>
            <CustomList
              disableCheckBox={1}
              onClick={handleHiredListClick}
              indexSelected={indexHired}
              list={hireds}
              dropdownNames={["Adicionar assinatura"]}
              dropdownOnChange={[
                async (index) => {
                  let token = await fetchTokenHired();
                  if (token.length > 0)
                    setOpenDialogSign({ open: true, token: token });
                },
              ]}
            />
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
                  groupPolitic={" "}
                  title={""}
                  managerId={localStorage.getItem("userId")}
                  cities={cities}
                  onClose={async () => {
                    setListener(true);
                    onOrientationChange();
                    setOpenDialogAddHired({ open: false });
                    await fetchHireds(localStorage.getItem("userId"));
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
              onClose={async () => {
                setOpenDialogSign({ open: false, token: "" });
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
                          setOpenDialogSign({ open: false, token: "" });
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
          </SpaceDiv>
        </Grid>
        <Footer style={{ marginTop: 10 }}>Site desenvolvido por Easycode - 2020</Footer>
      </>
    );
  }
}
