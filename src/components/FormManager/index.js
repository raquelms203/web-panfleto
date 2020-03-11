import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import {
  Container,
  StyledTextField,
  Title,
  FontButton,
  StyledButton
} from "../FormHired/styles";
import InputMask from "react-input-mask";

export default function FormManager(props) {
  const { onClick } = props;
  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeName = event => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z" "]/gi, "");

    setName(value);
  };

  return (
    <Container
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item xs>
        <Title>[PSDB] Prefeito 1</Title>
      </Grid>
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
      <Grid item xs sm md={12}>
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
