import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid, TextField } from "@material-ui/core";
import FilterPolitics from "../DropdownPolitics";
import { Container, StyledButton, FontButton } from "../FormHired/styles";
import DropdownCities from "../DropdownCities";
import { validationSchema } from "./validation_schema";

export default function FormManager(props) {
  const initialValues = {
    name: "",
    city: ""
  };
  // const [cities, setCities] = useState([]);
  const [cities] = useState([]);

  const handleSubmit = values => {
    console.log(values);
  };
  // const fetchCities = useCallback(async () => {
  //   if (cities.length === 0) {
  //     let response = await apiCities.get();
  //     let names = response.data.map(item => item.nome);
  //     setCities(names);
  //   }
  // }, [cities]);

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
            <Grid item xs sm md>
              <div style={{ width: 400 }}></div>
            </Grid>
            <Grid item xs sm md>
              <Field name="name">
                {({ field }) => (
                  <TextField
                    style={{ background: "white" }}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    {...field}
                    label="Nome completo"
                    variant="outlined"
                    error={errors.name}
                    helperText={errors.name}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs sm md>
              <TextField
                style={{ background: "white" }}
                InputLabelProps={{ shrink: true }}
                size="small"
                fullWidth
                label="CPF"
                variant="outlined"
              />
            </Grid>
            <Grid item xs sm md>
              <DropdownCities list={cities} onChange={() => {}} />
            </Grid>
            <Grid item xs sm md>
              <TextField
                style={{ background: "white" }}
                InputLabelProps={{ shrink: true }}
                size="small"
                fullWidth
                label="Partido/Coligação"
                variant="outlined"
              />
            </Grid>
            <Grid item xs sm md style={{ paddingTop: 0 }}>
              <FilterPolitics isFilter={false} onChange={() => {}} />
            </Grid>
            <div style={{ height: 8 }}></div>
            <Grid item container direction="row-reverse" xs sm md>
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
