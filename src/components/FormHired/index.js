import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Button,
  InputAdornment,
  withStyles,
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
  FontButton
} from "./styles";
import { DropdownCities } from "../DropdownCities";
import { apiStates, apiCEP } from "../../services/api";
import axios from "axios";
import CurrencyInput from "react-currency-input";

const styles = theme => ({
  input: {
    height: 8
  }
});

export var FormHired = withStyles(styles)(props => {
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
  const [filledFields, setFilledFields] = useState(false);
  const [visibleButtonCity, setVisibleButtonCity] = useState(false);

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
    setFilledFields(true);
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

  const { classes } = props;

  return (
    <Container container direction="column" justify="flex-start" spacing={2}>
      <Grid item>
        <Title>[PSDB] Prefeito 1 | Gerente 1</Title>
      </Grid>

      <Grid item>
        <StyledLargeTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Nome completo"
          variant="outlined"
          value={name}
          onChange={event => handleChangeName(event)}
        />
      </Grid>

      <Grid item>
        <StyledLargeTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </Grid>
      <Grid item>
        <InputMask
          mask="999.999.999-99"
          value={CPF}
          onChange={event => setCPF(event.target.value)}
        >
          {() => (
            <StyledMediumTextField
              inputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
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
              inputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
              label="Telefone"
              variant="outlined"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item>
        <InputMask mask="99999-999" value={CEP} onChange={handleChangeCEP}>
          {() => (
            <StyledSmallTextField
              inputProps={{ className: classes.input }}
              InputLabelProps={{ shrink: true }}
              label="CEP"
              variant="outlined"
            />
          )}
        </InputMask>
      </Grid>
      <Grid item>
        {visibleButtonCity ? (
          <button
            style={{ padding: 0, margin: 0, border: "none" }}
            onClick={() => {
              setVisibleButtonCity(false);
              setCity("");
            }}
          >
            <TextField
              style={{ width: 255 }}
              value={city}
              InputLabelProps={{ shrink: true }}
              variant="filled"
              label="Cidade"
            ></TextField>
          </button>
        ) : (
          <DropdownCities
            list={cities}
            onChange={event => {
              setCity(event.currentTarget.innerText);
            }}
          />
        )}
      </Grid>
      <Grid item>
        <StyledLargeTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Rua"
          variant={filledFields ? "filled" : "outlined"}
          value={street}
          onChange={event => setStreet(event.target.value)}
        />
      </Grid>
      <Grid item>
        <StyledSmallTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Número"
          variant="outlined"
          value={number}
          onChange={event => handleChangeNumber(event)}
        />
      </Grid>
      <Grid item>
        <StyledLargeTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Complemento (Opcional)"
          variant="outlined"
          value={complement}
          onChange={event => setComplement(event.target.value)}
        />
      </Grid>
      <Grid item>
        <StyledMediumTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
          label="Bairro"
          variant={filledFields ? "filled" : "outlined"}
          value={district}
          onChange={event => setDistrict(event.target.value)}
        />
      </Grid>
      <Grid item container spacing={1} justify="space-between">
        <Grid item>
          <StyledSmallTextField
            inputProps={{ className: classes.input }}
            InputLabelProps={{ shrink: true }}
            label="Cargo"
            variant="outlined"
            value={office}
            onChange={event => setOffice(event.target.value)}
          />
        </Grid>

        <Grid item>
          

       
          <CurrencyInput
          style={{ height: 60, border:"none", font: "12px", background:"white" }}
              decimalSeparator=","
              thousandSeparator="."
              prefix="R$ "
              value={payment}
              onChangeEvent={(event, maskedValue, floatValue) =>
                setPayment(maskedValue)
              }
            ></CurrencyInput>
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
});
