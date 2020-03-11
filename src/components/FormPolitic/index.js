import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { Grid } from "@material-ui/core";
import { apiStates } from "../../services/api";
import FilterPolitics from "../DropdownPolitics";
import {
  Container,
  StyledButton,
  FontButton,
  StyledTextField
} from "../FormHired/styles";
import { DropdownCities } from "../DropdownCities";
import { validationSchema } from "./validation_schema";

export default function FormManager(props) {
  const initialValues = {
    name: "",
    city: ""
  };
  const [cities, setCities] = useState([]);

  const handleSubmit = values => {
    console.log(values);
  };
  const fetchCities = useCallback(async () => {
    if (cities.length === 0) {
      let response = await apiStates.get();
      let names = response.data.map(item => item.nome);
      setCities(names);
    }
  }, [cities]);

    setName(value);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors }) => (
        <Form>
          <Container
            container
            direction="column"
            justify="flex-start"
            spacing={2}
          >
            <Grid item>
              <Field name="name">
                {({ field }) => (
                  <StyledLargeTextField
                    {...field}
                    label="Nome completo"
                    variant="outlined"
                    error={errors.name}
                    helperText={errors.name}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <StyledLargeTextField label="CPF" variant="outlined" />
            </Grid>
            <Grid item>
              <DropdownCities list={cities} onChange={() => {}} />
            </Grid>
            <Grid item>
              <StyledLargeTextField
                label="Partido/Coligação"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <FilterPolitics isFilter={false} onChange={() => {}} />
            </Grid>
            <div style={{ height: 8 }}></div>
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
        </Form>
      )}
    </Formik>
  );
}
