import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import {
  Container,
  StyledTextField,
  StyledButton,
  Title,
  FontButton
} from "./styles";
import DropdownCities from "../DropdownCities";
import axios from "axios";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import ConfirmInfo from "../ConfirmInfo";
import * as validate from "./validationSchema";

export default function FormHired(props) {
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
    info: []
  });

  const fetchCEP = async cep => {
    let api = axios.create({
      baseURL: `https://viacep.com.br/ws/${cep}/json/`
    });
    let response = await api.get();
    if (response.hasOwnProperty("erro")) {
      return;
    }
    setFilledColor("#dfdfdf");
    setStreet(response.data.logradouro);
    setCity(response.data.localidade + " - " + response.data.uf);
    setVisibleButtonCity(true);
    setDistrict(response.data.bairro);
  };

  const handleChangeCEP = event => {
    let value = event.target.value;
    setCEP(value);
    if (!String(value).includes("_")) {
      fetchCEP(value);
    }
  };

  const handleChangeName = event => {
    let name = event.target.value;
    setName({ value: name, error: name.error });
  };

  const handleChangeNumber = event => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/gi, "");

    setNumber(value);
  };

  const validateFields = () => {
    let allValid = true;
    if (validate.validateName(name.value) !== "") {
      setName({ value: name.value, error: validate.validateName(name.value) });
      allValid = false;
    }
    if (validate.validateEmail(email.value) !== "") {
      setEmail({
        value: email.value,
        error: validate.validateEmail(email.value)
      });
      allValid = false;
    }
    if (validate.validateMask(CPF.value) !== "") {
      setCPF({ value: CPF.value, error: validate.validateMask(CPF.value) });
      allValid = false;
    }
    if (validate.validateMask(phone.value) !== "") {
      setPhone({
        value: phone.value,
        error: validate.validateMask(phone.value)
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
        error: validate.validateSelect(city.value)
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(street.value) !== "") {
      setStreet({
        value: street.value,
        error: validate.validateNotEmpty(street.value)
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(number.value) !== "") {
      setNumber({
        value: number.value,
        error: validate.validateNotEmpty(number.value)
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(district.value) !== "") {
      setDistrict({
        value: district.value,
        error: validate.validateNotEmpty(district.value)
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(office.value) !== "") {
      setCPF({
        value: office.value,
        error: validate.validateNotEmpty(office.value)
      });
      allValid = false;
    }
    if (validate.validateNotEmpty(payment.value) !== "") {
      setPayment({
        value: payment.value,
        error: validate.validateNotEmpty(payment.value)
      });
      allValid = false;
    }
    console.log(allValid);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event);
    validateFields();
  };

  const { onClick, cities } = props;

  return (
    <form onSubmit={handleSubmit}>
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
              <Title>[PSDB] Prefeito 1 | Gerente 1</Title>
            </Grid>
            <Grid item xs sm md>
              <StyledTextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Nome completo"
                variant="outlined"
                value={name.name}
                error={Boolean(name.error)}
                helperText={name.error}
                onChange={event => handleChangeName(event)}
              />
            </Grid>

            <Grid item xs sm md>
              <StyledTextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Email"
                variant="outlined"
                value={email.value}
                error={Boolean(email.error)}
                helperText={email.error}
                onChange={event =>
                  setEmail({ value: event.target.value, error: email.error })
                }
              />
            </Grid>
            <Grid item container spacing={1} justify="space-between">
              <Grid item xs={12} sm={6} md={6}>
                <InputMask
                  mask="999.999.999-99"
                  value={CPF.value}
                  onChange={event =>
                    setCPF({ value: event.target.value, error: CPF.error })
                  }
                >
                  {() => (
                    <StyledTextField
                      error={Boolean(cpf.error)}
                      helperText={cpf.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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
                  onChange={event => setPhone({value: event.target.value, error: phone.error})}
                  value={phone}
                >
                  {() => (
                    <StyledTextField
                     error={Boolean(phone.error)}
                      helperText={phone.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      label="Celular (Opcional)"
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
                  value={CEP}
                  onChange={set}
                >
                  {() => (
                    <StyledTextField
                     error={Boolean(cep.error)}
                      helperText={cep.error}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
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
                      setCity("");
                    }}
                  >
                    <TextField
                      fullWidth
                      style={{ background: filledColor }}
                      value={city}
                      InputLabelProps={{ shrink: true, readOnly: true }}
                      size="small"
                      variant="outlined"
                      label="Cidade"
                    ></TextField>
                  </div>
                ) : (
                  <DropdownCities
                    list={cities}
                    onChange={event => {
                      setCity(event.currentTarget.innerText);
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
                  size="small"
                  label="Rua"
                  variant="outlined"
                  style={{ background: filledColor }}
                  value={street}
                  onChange={event => setStreet(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Número"
                  variant="outlined"
                  value={number}
                  onChange={event => handleChangeNumber(event)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Complemento (Opcional)"
                  variant="outlined"
                  value={complement}
                  onChange={event => setComplement(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  style={{ background: filledColor }}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Bairro"
                  variant="outlined"
                  value={district}
                  onChange={event => setDistrict(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={1} justify="space-between">
              <Grid item xs={12} sm={4} md={4}>
                <CurrencyTextField
                  fullWidth
                  size="small"
                  style={{ background: "white" }}
                  label="Pagamento"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={payment.value}
                  currencySymbol="R$ "
                  //minimumValue="0"
                  outputFormat="string"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(event, input) =>
                    setPayment({ value: input, error: payment.error })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={8} md={8}>
                <StyledTextField
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  label="Cargo"
                  variant="outlined"
                  value={office}
                  onChange={event => setOffice(event.target.value)}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <ConfirmInfo info={openDialogConfirmInfo.info} />
        )}

        <Grid item container direction="row-reverse">
          <StyledButton
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
          >
            <FontButton>OK</FontButton>
          </StyledButton>
        </Grid>
      </Container>
    </form>
  );
}
