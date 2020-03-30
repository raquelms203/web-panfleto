import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import InputMask from "react-input-mask";
import { Formik, Form, Field } from "formik";

import { validationSchema } from "./validation_schema";
import ConfirmInfo from "../ConfirmInfo";
import {
  Container,
  StyledTextField,
  Title,
  FontButton,
  StyledButton
} from "../FormHired/styles";

export default function FormManager(props) {
  const initialValues = {
    name: "",
    cpf: "",
    email: ""
  };
  const [openDialogConfirmInfo, setOpenDialogConfirmInfo] = useState({
    open: false,
    info: {}
  });
  const handleSubmit = values => {
    let inputs = [
      { field: "Nome completo:", value: values.name },
      { field: "CPF:", value: values.cpf },
      { field: "Email:", value: values.email }
    ];
    setOpenDialogConfirmInfo({ open: true, info: inputs });
  };

  return !openDialogConfirmInfo.open ? (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form autoComplete="off">
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
                <Field name="name">
                  {({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      label="Nome completo"
                      variant="outlined"
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs>
                <Field name="cpf">
                  {({ field }) => (
                    <InputMask
                      mask="999.999.999-99"
                      onChange={event =>
                        setFieldValue(
                          "cpf",
                          event.target.value !== null
                            ? event.target.value
                            : initialValues.cpf
                        )
                      }
                    >
                      {() => (
                        <StyledTextField
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          size="small"
                          label="CPF"
                          variant="outlined"
                          error={Boolean(errors.cpf)}
                          helperText={errors.cpf}
                        />
                      )}
                    </InputMask>
                  )}
                </Field>
              </Grid>
              <Grid item xs sm md={12}>
                <Field name="email">
                  {({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      label="Email"
                      variant="outlined"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  )}
                </Field>
              </Grid>
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
        );
      }}
    </Formik>
  ) : (
    <ConfirmInfo info={openDialogConfirmInfo.info} />
  );
}
