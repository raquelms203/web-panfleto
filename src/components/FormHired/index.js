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

export default function FormHired(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [CPF, setCPF] = useState("");
  const [phone, setPhone] = useState("");
  const [CEP, setCEP] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [office, setOffice] = useState("");
  const [payment, setPayment] = useState("");
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
    console.log(value);
    if (!String(value).includes("_")) {
      console.log("oi");
      fetchCEP(value);
    }
  };

  const handleChangeName = event => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z" "]/gi, "");

    setName(value);
  };

  const handleChangeNumber = event => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/gi, "");

    setNumber(value);
  };

  const { onClick, cities } = props;

  return (
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
              value={name}
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
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item container spacing={1} justify="space-between">
            <Grid item xs={12} sm={6} md={6}>
              <InputMask
                mask="999.999.999-99"
                value={CPF}
                onChange={event => setCPF(event.target.value)}
              >
                {() => (
                  <StyledTextField
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
                onChange={event => setPhone(event.target.value)}
                value={phone}
              >
                {() => (
                  <StyledTextField
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
                onChange={handleChangeCEP}
              >
                {() => (
                  <StyledTextField
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
                value={payment}
                currencySymbol="R$ "
                //minimumValue="0"
                outputFormat="string"
                decimalCharacter=","
                digitGroupSeparator="."
                onChange={(event, value) => setPayment(value)}
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
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {
            if (!openDialogConfirmInfo.open)
              setOpenDialogConfirmInfo({
                open: true,
                info: [{ field: "Nome", value: "Raquel Martins dos Santos" }]
              });
            else onClick();
          }}
        >
          <FontButton>OK</FontButton>
        </StyledButton>
      </Grid>
    </Container>
  );
}
