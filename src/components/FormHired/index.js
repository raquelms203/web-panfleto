import React, { useState, useEffect, useCallback } from "react";
import { Grid, InputLabel, InputAdornment,
  OutlinedInput } from "@material-ui/core";
import {
  Container,
  StyledSmallTextField,
  StyledMediumTextField,
  StyledLargeTextField,
  StyledButton,
  Title,
  FontButton
} from "./styles";
import FilterCities from "../DropdownCities";
import { apiStates } from "../../services/api";

export default function FormHired(props) {
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

  const { onClick } = props;

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
          <StyledLargeTextField label="Email" variant="outlined" />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <StyledLargeTextField label="CEP" variant="outlined" />
        </Grid>
        <Grid item>
          <FilterCities list={cities} onChange={() => {}} />
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

      <Grid item container justify="space-between" spacing={2}>
        <Grid item>
          <StyledLargeTextField label="Email" variant="outlined" />
        </Grid>
        <Grid item>
          <StyledSmallTextField label="Cargo" variant="outlined" />
        </Grid>
        <Grid item>
        <StyledSmallTextField label="Pagamento" variant="outlined" />
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
