import { Grid } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { apiStates } from "../../services/api";
import FilterPolitics from "../DropdownPolitics";
import {
  Container,
  StyledLargeTextField,
  StyledButton,
  FontButton
} from "../FormHired/styles";
import FilterCities from "../DropdownCities";

export default function FormManager(props) {
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
        <StyledLargeTextField label="Nome completo" variant="outlined" />
      </Grid>
      <Grid item>
        <StyledLargeTextField label="CPF" variant="outlined" />
      </Grid>
      <Grid item>
        <FilterCities list={cities} onChange={() => {}} />
      </Grid>
      <Grid item>
        <StyledLargeTextField label="Partido/Coligação" variant="outlined" />
      </Grid>
      <Grid item>
        <FilterPolitics isFilter={false} onChange={() => {}} />
      </Grid>
      <div style={{ height: 8 }}></div>
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
