import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import InputMask from "react-input-mask";
import axios from "axios";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { toast } from "react-toastify";

import {
  Container,
  StyledTextField,
  StyledButton,
  Title,
  FontButton,
} from "./styles";
import DropdownCities from "../DropdownCities";
import { apiADM } from "../../services/api";
import ConfirmInfo from "../ConfirmInfo";
import * as validate from "./validation_schema";

export default function FormHired(props) {
  const { cities, manager, onClose, viewHired, onCancel, title, groupPolitic } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [CPF, setCPF] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [CEP, setCEP] = useState({ value: "", error: "" });
  const [city, setCity] = useState({ value: "", error: "" });
  const [street, setStreet] = useState({ value: "", error: "" });
  const [number, setNumber] = useState({ value: "", error: "" });
  const [complement, setComplement] = useState({ value: "", error: "" });
  const [district, setDistrict] = useState({ value: "", error: "" });
  const [office, setOffice] = useState({ value: "", error: "" });
  const [payment, setPayment] = useState({ value: "", error: "" });
  const [visibleButtonCity, setVisibleButtonCity] = useState(false);
  const [filledColor, setFilledColor] = useState("white");
  const [openDialogConfirmInfo, setOpenDialogConfirmInfo] = useState({
    open: false,
    info: [],
  });

  const fetchCEP = async (cep) => {
    if (cep[8] === "_") return;
    let api = axios.create({
      baseURL: `https://viacep.com.br/ws/${cep}/json/`,
    });
    let response = await api.get();
    if (response.hasOwnProperty("erro")) {
      return;
    }
    setFilledColor("#dfdfdf");
    setStreet({ value: response.data.logradouro, error: street.error });
    setCity({
      value: response.data.localidade + " - " + response.data.uf,
      error: city.error,
    });
    setVisibleButtonCity(true);
    setDistrict({ value: response.data.bairro, error: district.error });
  };

  const initValues = () => {
    let number = "";
    let complement = "";

    if (viewHired !== undefined) {
      if (viewHired.number.includes(" ")) {
        let local = viewHired.number.split(" ");
        number = local[0];
        local.shift();
        complement = local.join(" ");
      } else number = viewHired.number;
      setIsEdit(true);
      setName({ value: viewHired.name, error: "" });
      setEmail({ value: viewHired.email, error: "" });
      setCPF({ value: viewHired.document, error: "" });
      setPhone({ value: viewHired.phone, error: "" });
      setCEP({ value: viewHired.zipCode, error: "" });
      setCity({ value: viewHired.city, error: "" });
      setStreet({ value: viewHired.street, error: "" });
      setNumber({ value: number, error: "" });
      setComplement({ value: complement, error: "" });
      setDistrict({ value: viewHired.district, error: "" });
      setOffice({ value: viewHired.office, error: "" });
      setPayment({ value: viewHired.payment, error: "" });
      setVisibleButtonCity(true);
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
    let complementPosition = 7;
    
    if (validate.validateName(name.value) !== "") {
      setName({ value: name.value, error: validate.validateName(name.value) });
      allValid = false;
    }
    if (validate.validateEmail(email.value) !== "") {
      setEmail({
        value: email.value,
        error: validate.validateEmail(email.value),
      });
      allValid = false;
    }
    if (validate.validateMask(CPF.value) !== "") {
      setCPF({ value: CPF.value, error: validate.validateMask(CPF.value) });
      allValid = false;
    }
    if (validate.validatePhoneIncomplete(phone.value) !== "") {
      setPhone({
        value: phone.value,
        error: validate.validatePhoneIncomplete(phone.value),
      });
      allValid = false;
    }

    if (validate.validateMask(CEP.value) !== "") {
      setCEP({ value: CEP.value, error: validate.validateMask(CEP.value) });
      allValid = false;
    }
    if (validate.validateSelect(city.value) !== "") {
      setCity({
        value: city.value,
        error: validate.validateSelect(city.value),
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(street.value) !== "") {
      setStreet({
        value: street.value,
        error: validate.validateNotEmpty(street.value),
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(number.value) !== "") {
      setNumber({
        value: number.value,
        error: validate.validateNotEmpty(number.value),
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(district.value) !== "") {
      setDistrict({
        value: district.value,
        error: validate.validateNotEmpty(district.value),
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(office.value) !== "") {
      setOffice({
        value: office.value,
        error: validate.validateNotEmpty(office.value),
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(payment.value) !== "") {
      setPayment({
        value: payment.value,
        error: validate.validateNotEmpty(payment.value),
      });
      allValid = false;
    }
    if (allValid) {
      const formatter = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });      
    
      let p = formatter.format(parseFloat(payment.value));
      values = [
        { field: "Nome completo:", value: name.value },
        { field: "Email:", value: email.value },
        { field: "CPF:", value: CPF.value },
        { field: "Celular", value: phone.value },
        { field: "CEP:", value: CEP.value },
        { field: "Cidade:", value: city.value },
        { field: "Rua", value: street.value },
        { field: "Número:", value: number.value },
        { field: "Bairro:", value: district.value },
        { field: "Pagamento:", value: p },
        { field: "Cargo", value: office.value },
      ];

      if (complement.value.length !== 0)
        values.splice(complementPosition, 0, {
          field: "Complemento:",
          value: " " + complement.value,
        });

      setOpenDialogConfirmInfo({
        open: true,
        info: values,
      });
    }
  };

  const sendHired = async () => {
    let date = new Date();
    let dayFormatted = date.getDate().toString();
    if(dayFormatted.length === 1) dayFormatted = "0" + dayFormatted;
    let month = date.toLocaleString("pt-br", { month: "long" });
    let monthFormatted = month[0].toUpperCase() + month.substring(1, month.length);
    await apiADM
      .post(`/hired?managerId=${manager.id}`, {
        name: name.value,
        email: email.value,
        office: office.value,
        document: CPF.value,
        payment: payment.value,
        zipCode: CEP.value,
        group: groupPolitic,
        day: dayFormatted,
        month: monthFormatted,
        city: city.value,
        street: street.value,
        district: district.value,
        phone: phone.value,
        urlDocument: "test",
        number: number.value + complement.value,
      })
      .then((response) => {
        toast.success("Contratado criada com sucesso!");
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao criar contratado!");
        console.log(error);
      });
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFields();
  };

  useEffect(() => {
    initValues();
  }, []);

  return (
    <form autoComplete="on" onSubmit={handleSubmit}>
      <Container
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        {!openDialogConfirmInfo.open ? (
          <>
            <Grid item>
              <Title>{title}</Title>
            </Grid>
            <Grid item xs sm md>
              <StyledTextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: isEdit,
                }}
                size="small"
                label="Nome completo"
                variant="outlined"
                value={name.value}
                error={Boolean(name.error)}
                helperText={name.error}
                onChange={(event) => handleChangeName(event)}
              />
            </Grid>

            <Grid item xs sm md>
              <StyledTextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: isEdit,
                }}
                size="small"
                label="Email"
                variant="outlined"
                value={email.value}
                error={Boolean(email.error)}
                helperText={email.error}
                onChange={(event) =>
                  setEmail({ value: event.target.value, error: email.error })
                }
              />
            </Grid>
            <Grid item container spacing={1} justify="space-between">
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
                      InputProps={{
                        readOnly: isEdit,
                      }}
                      size="small"
                      label="CPF"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InputMask
                  mask="(99)99999-9999"
                  value={phone.value}
                  onChange={(event) =>
                    setPhone({ value: event.target.value, error: phone.error })
                  }
                >
                  {() => (
                    <StyledTextField
                      error={Boolean(phone.error)}
                      helperText={phone.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: isEdit,
                      }}
                      size="small"
                      label="Celular"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems="center">
              <Grid item xs={12} sm={4} md={4}>
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
                      InputProps={{
                        readOnly: isEdit,
                      }}
                      size="small"
                      label="CEP"
                      variant="outlined"
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                {visibleButtonCity ? (
                  <div
                    onClick={() => {
                      setVisibleButtonCity(false);
                      setCity({ value: "", error: city.error });
                    }}
                  >
                    <TextField
                      fullWidth
                      style={{ background: filledColor }}
                      value={city.value}
                      InputLabelProps={{ shrink: true, readOnly: true }}
                      InputProps={{
                        readOnly: isEdit,
                      }}
                      size="small"
                      variant="outlined"
                      label="Cidade"
                    ></TextField>
                  </div>
                ) : (
                  <DropdownCities
                    error={Boolean(city.error)}
                    helperText={city.error}
                    list={cities}
                    onChange={(event, input) => {
                      setCity({ value: input, error: city.error });
                    }}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={8} md={8}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isEdit,
                  }}
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
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  size="small"
                  label="Número"
                  variant="outlined"
                  value={number.value}
                  onChange={(event) => handleChangeNumber(event)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  error={Boolean(complement.error)}
                  helperText={complement.error}
                  size="small"
                  label="Complemento (Opcional)"
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
                  style={{ background: filledColor }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  size="small"
                  label="Bairro"
                  variant="outlined"
                  value={district.value}
                  error={Boolean(district.error)}
                  helperText={district.error}
                  onChange={(event) =>
                    setDistrict({
                      value: event.target.value,
                      error: district.error,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1} justify="space-between">
              <Grid item xs={12} sm={4} md={4}>
                <CurrencyTextField
                  fullWidth
                  error={Boolean(payment.error)}
                  helperText={payment.error}
                  size="small"
                  style={{ background: "white" }}
                  label="Pagamento"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  value={payment.value}
                  currencySymbol="R$ "
                  outputFormat="string"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(event, input) => {
                    setPayment({ value: input, error: payment.error });
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={8} md={8}>
                <StyledTextField
                  error={Boolean(office.error)}
                  helperText={office.error}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: isEdit,
                  }}
                  size="small"
                  label="Cargo"
                  variant="outlined"
                  value={office.value}
                  onChange={(event) =>
                    setOffice({
                      value: event.target.value,
                      error: office.error,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid item container justify="flex-end">
              <Button
                size="large"
                style={{ background: "#958a94", color: "white" }}
                onClick={() => onCancel()}
              >
                Voltar
              </Button>
              <div style={{ width: 16 }}></div>
              {isEdit ? (
                <></>
              ) : (
                <StyledButton
                  type="submit"
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  <FontButton>OK</FontButton>
                </StyledButton>
              )}
            </Grid>
          </>
        ) : (
          <ConfirmInfo
            info={openDialogConfirmInfo.info}
            onClick={() => sendHired()}
            onBack={() => {
              setVisibleButtonCity(true);
              setOpenDialogConfirmInfo({ open: false });
            }}
          />
        )}
      </Container>
    </form>
  );
}
