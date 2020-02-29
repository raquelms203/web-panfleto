import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button, AppBar } from "@material-ui/core";
import {
  Container,
  StyledSmallTextField,
  StyledMediumTextField,
  StyledLargeTextField,
  StyledButton,
  Title,
  FontButton
} from "./styles";
import { Link } from "react-router-dom";
import FilterCities from "../FilterCities";
import { apiStates, apiADM } from "../../services/api";

export default function FormHired() {
  const [cities, setCities] = useState([]);

  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiStates.get();
      let names = response.data.map(item => item.nome);
      setCities(names);
    }
  }, [cities]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Container container direction="column" justify="flex-start" spacing={2}>
      <Grid item>
        <Title>[PSDB] Prefeito 1 | Gerente 1</Title>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <StyledLargeTextField label="Nome completo" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledLargeTextField label="CPF" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <StyledLargeTextField label="Telefone" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledLargeTextField label="CEP" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item container justify="space-between" spacing={2}>
        <Grid item>
          <StyledMediumTextField label="Rua" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledSmallTextField label="Número" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledMediumTextField label="Bairro" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <FilterCities list={cities} onChange={() => {}} />
        </Grid>
      </Grid>
      <Grid item container justify="space-between" spacing={2}>
        <Grid item>
          <StyledLargeTextField label="Email" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledSmallTextField label="Função" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledSmallTextField label="Pagamento" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item container direction="row-reverse">
        <Link to="/dashboard">
          <StyledButton variant="contained" size="large" color="secondary">
            <FontButton>OK</FontButton>
          </StyledButton>
        </Link>
      </Grid>
    </Container>
  );
}
