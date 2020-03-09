import { Grid } from "@material-ui/core";
import React, { useState, } from "react";
import FilterPolitics from "../DropdownPolitics";
import {
  Container,
  StyledButton,
  FontButton,
  StyledTextField
} from "../FormHired/styles";
import DropdownCities from "../DropdownCities";
import InputMask from "react-input-mask";

export default function FormManager(props) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [type, setType] = useState("");
  const [CPF, setCPF] = useState("");
  const { onClick, cities } = props;

  const handleChangeName = event => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z" "]/gi, "");

    setName(value);
  };

  return (
    <Container container direction="column" justify="flex-start" spacing={2}>
      <div style={{ width: 400 }}></div>
      <Grid item xs>
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
      <Grid item xs>
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
      <Grid item xs>
        <DropdownCities list={cities} onChange={() => {}} />
      </Grid>
      <Grid item xs>
        <StyledTextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          size="small"
          label="Nome completo"
          variant="outlined"
          value={group}
          onChange={event => setGroup(event.target.value)}
        />
      </Grid>
      <Grid item xs sm={12} md={12}>
        <FilterPolitics
          isFilter={false}
          onChange={event => setType(event.target.value)}
        />
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
