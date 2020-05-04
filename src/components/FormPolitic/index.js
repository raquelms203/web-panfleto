import React, { useState, useEffect, useCallback } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import InputMask from "react-input-mask";
import axios from "axios";
import { apiADM } from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import {
  Container,
  StyledTextField,
  StyledButton,
  FontButton,
} from "../FormHired/styles";
import DropdownCities from "../DropdownCities";
import DropdownPolitics from "../DropdownPolitics";
import ConfirmInfo from "../ConfirmInfo";
import * as validate from "./validation_schema";

export default function FormHired(props) {
  const history = useHistory();
  const { cities, editPolitic, onClose, onCancel } = props;
  const [name, setName] = useState({ value: "", error: "" });
  const [CPF, setCPF] = useState({ value: "", error: "" });
  const [CEP, setCEP] = useState({ value: "", error: "" });
  const [city, setCity] = useState({ value: "", error: "" });
  const [street, setStreet] = useState({ value: "", error: "" });
  const [number, setNumber] = useState({ value: "", error: "" });
  const [complement, setComplement] = useState({ value: "", error: "" });
  const [district, setDistrict] = useState({ value: "", error: "" });
  const [type, setType] = useState({ value: "", error: "" });
  const [numberType, setNumberType] = useState(0);
  const [group, setGroup] = useState({ value: "", error: "" });
  const [filledColor, setFilledColor] = useState("white");
  const [openDialogConfirmInfo, setOpenDialogConfirmInfo] = useState({
    open: false,
    info: [],
  });

  const fetchCEP = async (cep) => {
    if (cep.includes("_")) return;
    let api = axios.create({
      baseURL: `https://viacep.com.br/ws/${cep}/json/`,
    });
    let response = await api.get();
    if (response.hasOwnProperty("erro")) {
      return;
    }
    let streetFormatted = response.data.logradouro;
    if(streetFormatted.substring(0,3).toUpperCase() === "RUA")
      streetFormatted = streetFormatted.substring(4, streetFormatted.length);

    setFilledColor("#dfdfdf");
    setStreet({ value: streetFormatted, error: street.error });
    setCity({
      value: response.data.localidade + " - " + response.data.uf,
      error: city.error,
    });
    setDistrict({ value: response.data.bairro, error: district.error });
  };

  const sendPolitic = async () => {
    let typeNumber;
    if (type.value === "Prefeito") typeNumber = 1;
    if (type.value === "Vereador") typeNumber = 2;

    let streetFormatted = street.value;
    if (streetFormatted.substring(0, 3).toUpperCase() === "RUA") {
      streetFormatted = streetFormatted.substring(4, streetFormatted.length);
    }

    if (editPolitic === undefined) {
      await apiADM
        .post(`/politic?adminId=${localStorage.getItem("userId")}`, {
          name: name.value.toUpperCase(),
          document: CPF.value,
          type: typeNumber,
          group: group.value,
          zipcode: CEP.value,
          city: city.value,
          street: streetFormatted,
          number: number.value + " " + complement.value,
          district: district.value,
        })
        .then((response) => {
          toast.success("Campanha criada com sucesso!");
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                  localStorage.setItem("isLogged", false);
                },
              }
            );
          else if (Boolean(error.response) && error.response.status === 409)
            toast.error("Houve conflito com um usuário já cadastrado!");
          else toast.error("Ocorreu um erro ao criar campanha!");
        });
      onClose();
    } else {
      await apiADM
        .put(
          `/politic/${editPolitic.id}?adminId=${localStorage.getItem(
            "userId"
          )}`,
          {
            name: name.value,
            document: CPF.value,
            type: typeNumber,
            group: group.value,
            zipcode: CEP.value,
            city: city.value,
            street: street.value,
            number: number.value + " " + complement.value,
            district: district.value,
          }
        )
        .then((response) => {
          toast.success("Campanha editada com sucesso!");
        })
        .catch((error) => {
          if (Boolean(error.response) && error.response.status === 401)
            toast.info(
              "Após 1h a sessão expira. Você será redirecionado para a página de login.",
              {
                onClose: function () {
                  history.push("/");
                  localStorage.setItem("isLogged", false);
                },
              }
            );
          else toast.error("Ocorreu um erro ao editar campanha!");
        });
      onClose();
    }
  };

  const handleChangeName = (event) => {
    let name = event.target.value;
    setName({ value: name, error: name.error });
  };

  const handleChangeNumber = (event) => {
    let input = event.target.value;
    input = input.replace(/[^0-9]/gi, "");

    setNumber({ value: input, error: number.error });
  };

  const validateFields = () => {
    let allValid = true;
    let values = [];
    let complementPosition = 9;
    if (validate.validateName(name.value) !== "") {
      allValid = false;
    }

    if (validate.validateCPF(CPF.value) !== "") {
      allValid = false;
    }
    if (validate.validateNotEmpty(type.value) !== "") {
      allValid = false;
    }
    if (validate.validateNotEmpty(group.value) !== "") {
    }
    if (validate.validateMask(CEP.value) !== "") {
      allValid = false;
    }
    if (validate.validateSelect(city.value) !== "") {
      allValid = false;
    }
    if (validate.validateNotEmpty(street.value) !== "") {
      allValid = false;
    }
    if (validate.validateNotEmpty(number.value) !== "") {
      allValid = false;
    }
    if (validate.validateNotEmpty(district.value) !== "") {
      allValid = false;
    }
    setName({ value: name.value, error: validate.validateName(name.value) });

    setCPF({ value: CPF.value, error: validate.validateCPF(CPF.value) });

    setType({
      value: type.value,
      error: validate.validateNotEmpty(type.value),
    });

    setGroup({
      value: group.value,
      error: validate.validateNotEmpty(group.value),
    });
    setCEP({ value: CEP.value, error: validate.validateMask(CEP.value) });

    setCity({
      value: city.value,
      error: validate.validateSelect(city.value),
    });
    setStreet({
      value: street.value,
      error: validate.validateNotEmpty(street.value),
    });
    setNumber({
      value: number.value,
      error: validate.validateNotEmpty(number.value),
    });
    setDistrict({
      value: district.value,
      error: validate.validateNotEmpty(district.value),
    });
    if (allValid) {
      values = [
        { field: "Nome completo:", value: name.value },
        { field: "Categoria:", value: type.value },
        { field: "Partido ou coligação:", value: group.value },
        { field: "CPF:", value: CPF.value },
        { field: "CEP:", value: CEP.value },
        { field: "Cidade:", value: city.value },
        { field: "Rua:", value: street.value },
        { field: "Número:", value: number.value },
        { field: "Bairro:", value: district.value },
      ];
      if (complement.value.length !== 0)
        values.splice(complementPosition, 0, {
          field: "Complemento:",
          value: complement.value,
        });
      setOpenDialogConfirmInfo({
        open: true,
        info: values,
      });
    }
  };
  const initValues = useCallback(() => {
    if (editPolitic !== undefined) {
      let number = "";
      let complement = "";
      let typeName = "";

      if (editPolitic.number.includes(" ")) {
        let local = editPolitic.number.split(" ");
        number = local[0];
        local.shift();
        complement = local.join(" ");
      } else number = editPolitic.number;

      if (editPolitic.type === 1) setNumberType(1);
      else setNumberType(2);

      setName({ value: editPolitic.name, error: "" });
      setCPF({ value: editPolitic.document, error: "" });
      setCEP({ value: editPolitic.zipcode, error: "" });
      setCity({ value: editPolitic.city, error: "" });
      setStreet({ value: editPolitic.street, error: "" });
      setNumber({ value: number, error: "" });
      setComplement({ value: complement, error: "" });
      setDistrict({ value: editPolitic.district, error: "" });
      setType({ value: typeName, error: "" });
      setGroup({ value: editPolitic.group, error: "" });
    }
  }, [
    editPolitic,
    setName,
    setCPF,
    setCEP,
    setCity,
    setStreet,
    setNumber,
    setComplement,
    setDistrict,
    setType,
    setGroup,
  ]);

  useEffect(() => {
    initValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFields();
  };

  return (
    <form
      autoComplete="on"
      onSubmit={handleSubmit}
      style={{ padding: "16px 24px" }}
    >
      <Container
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        {!openDialogConfirmInfo.open ? (
          <>
            <Grid item xs sm md>
              <StyledTextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Nome completo"
                variant="outlined"
                value={name.value}
                error={Boolean(name.error)}
                helperText={name.error}
                onChange={(event) => handleChangeName(event)}
              />
            </Grid>

            <Grid item container spacing={2} justify="space-between">
              <Grid item xs={12} sm={6} md={6}>
                <InputMask
                  mask="999.999.999-99"
                  value={CPF.value}
                  onChange={(event) =>
                    setCPF({ value: event.target.value, error: CPF.error })
                  }
                >
                  {() => (
                    <StyledTextField
                      error={Boolean(CPF.error)}
                      helperText={CPF.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      label="CPF"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={6} md={6} style={{ marginTop: -17 }}>
                <DropdownPolitics
                  value={numberType}
                  isFilter={false}
                  error={Boolean(type.error)}
                  onChange={(event) => {
                    setNumberType(event.target.value)
                    if (event.target.value === 1)
                      setType({ value: "Prefeito", error: type.error });
                    else setType({ value: "Vereador", error: type.error });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  error={Boolean(group.error)}
                  helperText={group.error}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Partido ou coligação"
                  variant="outlined"
                  value={group.value}
                  onChange={(event) =>
                    setGroup({
                      value: event.target.value,
                      error: group.error,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InputMask
                  mask="99999-999"
                  value={CEP.value}
                  onChange={(event) => {
                    setCEP({ value: event.target.value, error: CEP.error });
                    fetchCEP(event.target.value);
                  }}
                >
                  {() => (
                    <StyledTextField
                      error={Boolean(CEP.error)}
                      helperText={CEP.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      label="CEP"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
            </Grid>
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={12} sm={12} md={12}>
                <DropdownCities
                  filledColor={filledColor}
                  citySelected={city.value}
                  error={Boolean(city.error)}
                  helperText={city.error}
                  list={cities}
                  onChange={(event, input) => {
                    setCity({ value: input, error: city.error });
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={8} md={8}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Rua"
                  variant="outlined"
                  error={Boolean(street.error)}
                  helperText={street.error}
                  style={{ background: filledColor }}
                  value={street.value}
                  onChange={(event) =>
                    setStreet({
                      value: event.target.value,
                      error: street.error,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <StyledTextField
                  fullWidth
                  error={Boolean(number.error)}
                  helperText={number.error}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Número"
                  variant="outlined"
                  value={number.value}
                  onChange={(event) => handleChangeNumber(event)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={Boolean(complement.error)}
                  helperText={complement.error}
                  size="small"
                  label="Complemento(Opcional)"
                  variant="outlined"
                  value={complement.value}
                  onChange={(event) =>
                    setComplement({
                      value: event.target.value,
                      error: complement.error,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  error={Boolean(district.error)}
                  helperText={district.error}
                  style={{ background: filledColor }}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Bairro"
                  variant="outlined"
                  value={district.value}
                  onChange={(event) =>
                    setDistrict({
                      value: event.target.value,
                      error: district.error,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid item container justify="flex-end" spacing={2}>
              <Grid item>
                {" "}
                <Button
                  size="large"
                  style={{ background: "#958a94", color: "white" }}
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Voltar
                </Button>
              </Grid>
              <Grid item>
                <StyledButton
                  type="submit"
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  <FontButton>CONTINUAR</FontButton>
                </StyledButton>
              </Grid>
            </Grid>
          </>
        ) : (
          <ConfirmInfo
          open={openDialogConfirmInfo.info}
            info={openDialogConfirmInfo.info}
            onClick={() => sendPolitic(openDialogConfirmInfo.values)}
            onBack={() => {
              setOpenDialogConfirmInfo({ open: false });
            }}
          />
        )}
      </Container>
    </form>
  );
}
