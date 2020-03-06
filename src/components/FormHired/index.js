import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  TextField
} from "@material-ui/core";
import InputMask from "react-input-mask";
import {
  Container,
  StyledSmallTextField,
  StyledMediumTextField,
  StyledLargeTextField,
  StyledButton,
  Title,
  FontButton,
} from "./styles";
import { DropdownCities } from "../DropdownCities";
import { apiStates } from "../../services/api";
import axios from "axios";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

export default function FormHired(props) {
  const [cities, setCities] = useState([]);
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

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiStates.get();
      let names = response.data.map(item => item.nome);
      setCities(names);
    }
  }, [cities]);

  const fetchCEP = async cep => {
    let api = axios.create({
      baseURL: `https://viacep.com.br/ws/${cep}/json/`
    });
    let response = await api.get();
    console.log(response);
    if (response.hasOwnProperty("erro")) {
      console.log("oi");
      return;
    }
    setFilledColor("#dfdfdf");
    setStreet(response.data.logradouro);
    setCity(response.data.localidade);
    setVisibleButtonCity(true);
    setDistrict(response.data.bairro);
  };

  const handleChangeCEP = event => {
    let value = event.target.value;
    setCEP(value);
    if (value[8] !== "_") {
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

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const { onClick } = props;

  return (
    <Container container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
      <Grid item>
        <Title>[PSDB] Prefeito 1 | Gerente 1</Title>
      </Grid>

      <Grid item >
        <StyledLargeTextField
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Nome completo"
          variant="outlined"
          value={name}
          onChange={event => handleChangeName(event)}
        />
      </Grid>

      <Grid item>
        <StyledLargeTextField
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Email"
          variant="outlined"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </Grid>
      <Grid item container spacing={1} justify="space-between">
        {" "}
        <Grid item>
          <InputMask
            mask="999.999.999-99"
            value={CPF}
            onChange={event => setCPF(event.target.value)}
          >
            {() => (
              <StyledMediumTextField
                InputLabelProps={{ shrink: true }}
                size="small"
                label="CPF"
                variant="outlined"
              />
            )}
          </InputMask>
        </Grid>
        <Grid item>
          <InputMask
            mask="(99)99999-9999"
            onChange={event => setPhone(event.target.value)}
            value={phone}
          >
            {() => (
              <StyledMediumTextField
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
        <Grid item>
          <InputMask mask="99999-999" value={CEP} onChange={handleChangeCEP}>
            {() => (
              <StyledSmallTextField
                InputLabelProps={{ shrink: true }}
                size="small"
                label="CEP"
                variant="outlined"
              />
            )}
          </InputMask>
        </Grid>
        <Grid item>
          {visibleButtonCity ? (
            <div
              onClick={() => {
                setVisibleButtonCity(false);
                setCity("");
              }}
            >
              <TextField
                style={{ width: 255, background: filledColor }}
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
        <Grid item>
          <StyledLargeTextField
            InputLabelProps={{ shrink: true }}
            size="small"
            label="Rua"
            variant="outlined"
            style={{ background: filledColor }}
            value={street}
            onChange={event => setStreet(event.target.value)}
          />
        </Grid>
        <Grid item>
          <StyledSmallTextField
            InputLabelProps={{ shrink: true }}
            size="small"
            label="Número"
            variant="outlined"
            value={number}
            onChange={event => handleChangeNumber(event)}
          />
        </Grid>
      </Grid>
      <Grid item>
        <StyledLargeTextField
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Complemento (Opcional)"
          variant="outlined"
          value={complement}
          onChange={event => setComplement(event.target.value)}
        />
      </Grid>
      <Grid item>
        <StyledMediumTextField
          style={{ background: filledColor }}
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Bairro"
          variant="outlined"
          value={district}
          onChange={event => setDistrict(event.target.value)}
        />
      </Grid>
      <Grid item container spacing={1} justify="space-between">
        <Grid item>
          <StyledMediumTextField
            InputLabelProps={{ shrink: true }}
            size="small"
            label="Cargo"
            variant="outlined"
            value={office}
            onChange={event => setOffice(event.target.value)}
          />
        </Grid>

        <Grid item>
          {/* <CurrencyInput
            style={{
              height: 60,
              border: "none",
              font: "12px",
              background: "white"
            }}
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            value={payment}
            onChangeEvent={(event, maskedValue, floatValue) =>
              setPayment(maskedValue)
            }
          ></CurrencyInput> */}
          <CurrencyTextField
            size="small"
            style={{ background: "white", width: 180 }}
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
      </Grid>

      <Grid item container direction="row-reverse">
        <StyledButton
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => onClick()}
        >
          <FontButton>OK</FontButton>
        </StyledButton>
      </Grid>
    </Container>
  );
}
