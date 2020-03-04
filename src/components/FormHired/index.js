import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button, InputAdornment, OutlinedInput, InputLabelProps, InputProps, withStyles } from "@material-ui/core";
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
import FilterCities from "../DropdownCities";
import { apiStates, apiCEP } from "../../services/api";
import axios from "axios";

const styles = theme => ({  
  input: {  
    height: 5
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
      <Grid item container spacing={2}>
        <Grid item>
          <StyledLargeTextField
          inputProps={{ className: classes.input }}
          InputLabelProps={{ shrink: true }}
            label="Nome completo"
            variant="outlined"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Grid>
        <Grid item>
          <StyledLargeTextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item>
          <InputMask
            mask="999.999.999-99"
            value={CPF}
            onChange={event => setCPF(event.target.value)}
          >
            {() => <StyledMediumTextField label="CPF" variant="outlined" />}
          </InputMask>
        </Grid>
        <Grid item>
          <InputMask
            mask="(99)99999-9999"
            onChange={event => setPhone(event.target.value)}
            value={phone}
          >
            {() => (
              <StyledMediumTextField label="Telefone" variant="outlined" />
            )}
          </InputMask>
        </Grid>
        <Grid item>
          <InputMask mask="99999-999" value={CEP} onChange={handleChangeCEP}>
            {() => <StyledSmallTextField label="CEP" variant="outlined" />}
          </InputMask>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          {visibleButtonCity ? (
            <Button
              onClick={() => {
                setVisibleButtonCity(false);
                setCity("");
              }}
            >
              {city}
            </Button>
          ) : (
            <FilterCities
              list={cities}
              onChange={event => {
                setCity(event.currentTarget.innerText);
              }}
            />
          )}
        </Grid>
        <Grid item>
          <StyledLargeTextField
            label="Rua"
            variant="outlined"
            value={street}
            onChange={event => setStreet(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item container justify="space-between">
        <Grid item>
          <StyledSmallTextField
            label="Número"
            variant="outlined"
            value={number}
            onChange={event => setNumber(event.target.value)}
          />
        </Grid>
        <Grid item>
          <StyledMediumTextField
            label="Complemento"
            variant="outlined"
            value={complement}
            onChange={event => setComplement(event.target.value)}
          />
        </Grid>
        <Grid item>
          <StyledMediumTextField
            label="Bairro"
            variant="outlined"
            value={district}
            onChange={event => setDistrict(event.target.value)}
          />
        </Grid>
      </Grid>

      <Grid item container justify="space-between">
        <Grid item>
          <StyledLargeTextField
            label="Cargo"
            variant="outlined"
            value={office}
            onChange={event => setOffice(event.target.value)}
          />
        </Grid>

        <Grid item>
          <StyledLargeTextField
            label="Pagamento"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              )
            }}
            value={payment}
            onChange={event => setPayment(event.target.value)}
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
});
