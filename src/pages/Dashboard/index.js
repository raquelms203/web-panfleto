import React, { useEffect, useCallback } from "react";
import { Button, Grid, Dialog, DialogTitle, AppBar } from "@material-ui/core";
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
import SmallScreenAlert from "../SmallScreenAlert";
import ActionButton from "../../components/ActionButton";
import CustomList from "../../components/CustomList";
import DropdownPolitics from "../../components/DropdownPolitics";
import DropdownCities from "../../components/DropdownCities";
import FormHired from "../../components/FormHired/index";
import FormManager from "../../components/FormManager";
import FormPolitic from "../../components/FormPolitic";
import ConfirmDelete from "../../components/ConfirmDelete";
import * as functions from "./functions";
import { useHistory } from "react-router-dom";

export const history = useHistory();

export default function Dashboard() {
  // const fetchCities = useCallback(async () => {
  //   if (functions.cities.length === 0) {
  //     let response = await functions.apiCities.get();
  //     let names = response.data.map(
  //       item =>
  //         item.nome + " - " + item.municipio.microrregiao.mesorregiao.UF.sigla
  //     );
  //     functions.setCities(names);
  //   }
  // }, []);

  // const fetchPolitics = async () => {
  //   let response = await functions.apiADM.get();
  //   let politicsAll = [];

  //   response.data.politicos.forEach(item => {
  //     let p = {
  //       nome: item.nome,
  //       categoria: item.categoria,
  //       cpf: item.cpf,
  //       cidade: item.cidade,
  //       gestores: item.gestores,
  //       token: item.token
  //     };
  //     politicsAll.push(p);
  //   });

  //   return politicsAll;
  // };

  // const fetchUser = useCallback(async () => {
  //   if (Object.entries(user).length === 0) {
  //     let response = await apiADM.get();
  //     let user = {
  //       nome: response.data.nome,
  //       partido: response.data.partido,
  //       corPrimaria: response.data.corPrimaria
  //     };
  //     let politicsAll = await fetchPolitics();

  //     setUser(user);
  //     setPolitics(politicsAll);
  //     setManagers(politicsAll[0].gestores);
  //     setHireds(politicsAll[0].gestores[0].contratados);
  //   }
  // }, [user]);

  // const onOrientationChange = useCallback(() => {
  //   if (window.screen.availWidth < 500) {
  //     setIsLessThan500(true);
  //   }
  //   window.addEventListener("orientationchange", function() {
  //     if (window.matchMedia("(orientation: landscape)").matches)
  //       if (window.screen.availWidth < 500) {
  //         setIsLessThan500(true);
  //       } else setIsLessThan500(false);
  //     else setIsLessThan500(false);
  //   });
  // }, [setIsLessThan500]);

  const test = useCallback(async ()  => {
    await functions.fetchCities();
  }, []);

  useEffect(() => {
    test();
   
  }, [
    test
  ]);

  return functions.isLessThan500 ? (
    <SmallScreenAlert />
  ) : (
    <>
      <AppBar position="static" style={{ height: "42px" }}>
        <Grid container justify="space-between" alignItems="baseline">
          <Grid item>
            <Logo>E - Contrato</Logo>
          </Grid>
          <Grid item>
            <div style={{ marginRight: "20px" }}>
              <Button color="inherit" onClick={() => {}}>
                {String(functions.user.nome) === "undefined" ? (
                  <p></p>
                ) : (
                  <p>{String(functions.user.nome).split(" ")[0]}</p>
                )}
              </Button>
            </div>
          </Grid>
        </Grid>
      </AppBar>

      <StyledGrid container item justify="center">
        <Grid item xs={4} sm={4} md={4}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Button onClick={functions.handleFilterClick}>
                <strong>Filtrar</strong>
              </Button>
              <Dialog
                onClose={() => functions.setOpenDialogFilter(false)}
                open={functions.openDialogFilter}
              >
                <DialogTitle style={{ background: "#f5f3f3" }}>
                  <Grid container direction="column" spacing={3}>
                    <div style={{ width: 400 }}></div>
                    <Grid item xs sm={12} md={12}>
                      <DropdownPolitics
                        isFilter
                        onChange={functions.handleFilterPolitic}
                      />
                    </Grid>
                    <Grid item xs>
                      <DropdownCities
                        onChange={functions.handleFilterCity}
                        list={functions.cities}
                      ></DropdownCities>
                    </Grid>
                    <Grid item container direction="row-reverse">
                      <StyledButton
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={event => functions.handleFilters(event)}
                      >
                        <FontButton>OK</FontButton>
                      </StyledButton>
                    </Grid>
                  </Grid>
                </DialogTitle>
              </Dialog>
              {functions.citySelected !== "" ? (
                <Button onClick={functions.removeFilterCity}>
                  {functions.citySelected.length > 10 ? (
                    <LabelFilter>
                      {functions.citySelected.substring(0, 10) + "... X"}
                    </LabelFilter>
                  ) : (
                    <LabelFilter>{functions.citySelected} X</LabelFilter>
                  )}
                </Button>
              ) : (
                undefined
              )}
              {functions.filterPoliticSelected !== 0 ? (
                <Button onClick={() => functions.removeFilterPolitic()}>
                  {functions.filterPoliticSelected === 1 ? (
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
                    functions.setOpenDialogAddPolitic(true);
                  },
                  () => {
                    functions.setOpenDialogDelete({
                      open: true,
                      list: functions.checkPolitic,
                      type: "politic"
                    });
                  }
                ]}
              />
            </Grid>
          </Grid>
          <Subtitle>Campanhas</Subtitle>
          <CustomList
            onClick={functions.handlePoliticListClick}
            indexSelected={functions.indexPolitic}
            list={functions.politics}
            onCheckChange={functions.handleCheckChangePolitic}
            dropdownNames={["Adicionar assinatura", "Editar"]}
            dropdownOnChange={[
              index => {
                history.push(`/assinatura/${functions.politics[index].token}`, {
                  token: functions.politics[index].token
                });
              },
              () => {}
            ]}
          />
          <Dialog
            onClose={() => functions.setOpenDialogAddPolitic(false)}
            open={functions.openDialogAddPolitic}
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <FormPolitic
                cities={functions.cities}
                onClick={() => {
                  functions.setOpenDialogAddPolitic(false);
                }}
              />
            </DialogTitle>
          </Dialog>
          <Dialog
            onClose={() =>
              functions.setOpenDialogDelete({
                open: false,
                list: undefined,
                type: ""
              })
            }
            open={
              functions.openDialogDelete.open &&
              functions.openDialogDelete.type === "politic"
            }
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <ConfirmDelete
                type={functions.openDialogDelete.type}
                list={functions.openDialogDelete.list}
                onClickNo={() =>
                  functions.setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: ""
                  })
                }
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
                functions.setOpenDialogAddManager(true);
              },
              () => {
                functions.setOpenDialogDelete({
                  open: true,
                  list: functions.checkManager,
                  type: "manager"
                });
              }
            ]}
          />
          <div style={{ height: "4.4px" }}></div>
          <Subtitle>Gestores</Subtitle>
          <CustomList
            onClick={functions.handleManagerListClick}
            indexSelected={functions.indexManager}
            list={functions.managers}
            onCheckChange={functions.handleCheckChangeManager}
            dropdownNames={["Editar"]}
            dropdownOnChange={[() => {}]}
          />
          <Dialog
            onClose={() => functions.setOpenDialogAddManager(false)}
            open={functions.openDialogAddManager}
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <FormManager
                onClick={() => {
                  functions.setOpenDialogAddManager(false);
                }}
              />
            </DialogTitle>
          </Dialog>
          <Dialog
            onClose={() =>
              functions.setOpenDialogDelete({
                open: false,
                list: undefined,
                type: ""
              })
            }
            open={
              functions.openDialogDelete.open &&
              functions.openDialogDelete.type === "manager"
            }
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <ConfirmDelete
                type={functions.openDialogDelete.type}
                list={functions.openDialogDelete.list}
                onClickNo={() =>
                  functions.setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: ""
                  })
                }
                onClickYes={() => {}}
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
                functions.setOpenDialogAddHired(true);
              },
              () => {
                functions.setOpenDialogDelete({
                  open: true,
                  list: functions.checkHired,
                  type: "hired"
                });
              }
            ]}
          />
          <div style={{ height: "4.4px" }}></div>
          <Subtitle>Contratados</Subtitle>
          <CustomList
            onClick={functions.handleHiredListClick}
            indexSelected={functions.indexHired}
            list={functions.hireds}
            onCheckChange={functions.handleCheckChangeHired}
            dropdownNames={[
              "Adicionar assinatura",
              "Adicionar comprovante",
              "Ver PDF",
              "Editar"
            ]}
            dropdownOnChange={[
              index => {
                history.push(`/assinatura/${functions.hireds[index].token}`, {
                  token: functions.hireds[index].token
                });
              },
              index => {},
              index => {
                window.open(functions.hireds[index].contrato);
              },
              index => {}
            ]}
          />
          <Dialog
            onClose={() => functions.setOpenDialogAddHired(false)}
            open={functions.openDialogAddHired}
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <FormHired
                cities={functions.cities}
                onClick={() => {
                  functions.setOpenDialogAddHired(false);
                }}
              />
            </DialogTitle>
          </Dialog>
          <Dialog
            onClose={() =>
              functions.setOpenDialogDelete({
                open: false,
                list: undefined,
                type: ""
              })
            }
            open={
              functions.openDialogDelete.open &&
              functions.openDialogDelete.type === "hired"
            }
          >
            <DialogTitle style={{ background: "#f5f3f3" }}>
              <ConfirmDelete
                type={functions.openDialogDelete.type}
                list={functions.openDialogDelete.list}
                onClickNo={() =>
                  functions.setOpenDialogDelete({
                    open: false,
                    list: undefined,
                    type: ""
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
