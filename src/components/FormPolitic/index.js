import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid, TextField } from "@material-ui/core";
import FilterPolitics from "../DropdownPolitics";
import { Container, StyledButton, FontButton } from "../FormHired/styles";
import DropdownCities from "../DropdownCities";
import { validationSchema } from "./validation_schema";

export default function FormPolitic(props) {
  const initialValues = {
    name: "",
    city: "",
    cpf: "",
    group: "",
    type: ""
  };

  const { cities } = props;

  const handleSubmit = values => {
   console.log("oi")  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => console.log("values")}
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
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs sm md>
              <Field name="cpf">
                {({ field }) => (
                  <TextField
                    style={{ background: "white" }}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    {...field}
                    label="CPF"
                    variant="outlined"
                    error={Boolean(errors.cpf)}
                    helperText={errors.cpf}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs sm md>
              <Field name="city">
                {({ field }) => (
                  <DropdownCities
                    list={cities}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                    {...field}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs sm md>
              <Field name="group">
                {({ field }) => (
                  <TextField
                    style={{ background: "white" }}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    {...field}
                    label="Partido/Coligação"
                    variant="outlined"
                    error={Boolean(errors.group)}
                    helperText={errors.group}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs sm md style={{ paddingTop: 0 }}>
              <Field name="type">
                {({ field }) => (
                  <FilterPolitics
                    isFilter={false}
                    error={Boolean(errors.type)}
                    helperText={errors.type}
                    {...field}
                  />
                )}
              </Field>
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
