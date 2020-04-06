import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import InputMask from "react-input-mask";
import { Grid, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import DropdownPolitics from "../DropdownPolitics";
import { Container, StyledButton, FontButton } from "../FormHired/styles";
import DropdownCities from "../DropdownCities";
import { validationSchema } from "./validation_schema";
import ConfirmInfo from "../ConfirmInfo";
import { apiADM } from "../../services/api";

export default function FormPolitic(props) {
  const initialValues = {
    name: "",
    city: "",
    cpf: "",
    group: "",
    type: "",
  };

  const { cities, onClose, onCancel } = props;
  const [openDialogConfirmInfo, setOpenDialogConfirmInfo] = useState({
    open: false,
    info: {},
    values: {},
  });

  const handleSubmit = (values) => {
    let inputs = [
      { field: "Nome completo:", value: values.name },
      { field: "CPF:", value: values.cpf },
      { field: "Cidade:", value: values.city },
      { field: "Categoria:", value: values.type },
      { field: "Partido/coligação:", value: values.group },
    ];
    setOpenDialogConfirmInfo({ open: true, info: inputs, values: values });
  };

  const sendPolitic = async (values) => {
    let rawCPF = values.cpf.split("-").join("").split(".").join("");
    let typeNumber;
    if (values.type === "Prefeitos") typeNumber = 1;
    if (values.type === "Vereadores") typeNumber = 2;

    await apiADM
      .post(`/politic?adminId=${localStorage.getItem("userId")}`, {
        name: values.name,
        type: typeNumber,
        group: values.group,
        city: values.city,
        document: rawCPF,
      })
      .then((response) => {
        onClose();
        toast.success("Campanha criada com sucesso!");
      })
      .catch((error) => toast.error("Ocorreu um erro ao criar campanha!"));
  };

  return !openDialogConfirmInfo.open ? (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form autoComplete="off">
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
                    <InputMask
                      mask="999.999.999-99"
                      onChange={(event) => {
                        setFieldValue(
                          "cpf",
                          event.target.value !== null
                            ? event.target.value
                            : initialValues.cpf
                        );
                      }}
                    >
                      {() => (
                        <TextField
                          style={{ background: "white" }}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
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
              <Grid item xs sm md>
                <Field name="city">
                  {({ field }) => (
                    <DropdownCities
                      list={cities}
                      error={Boolean(errors.city)}
                      helperText={errors.city}
                      {...field}
                      onChange={(event, value) => {
                        setFieldValue(
                          "city",
                          value !== null ? value : initialValues.city
                        );
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs sm md style={{ paddingTop: 0 }}>
                <Field name="type">
                  {({ field }) => (
                    <DropdownPolitics
                      isFilter={false}
                      error={Boolean(errors.type)}
                      onChange={(event) => {
                        let number = event.target.value;
                        if (number === 1) setFieldValue("type", "Prefeitos");
                        else if (number === 2)
                          setFieldValue("type", "Vereadores");
                      }}
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
              <div style={{ height: 8 }}></div>
              <Grid item container justify="flex-end" xs sm md>
                <Button
                  size="large"
                  style={{ background: "#958a94", color: "white" }}
                  onClick={onCancel}
                >
                  Voltar
                </Button>
                <div style={{ width: 15 }}></div>
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
    <ConfirmInfo
      info={openDialogConfirmInfo.info}
      onClick={() => sendPolitic(openDialogConfirmInfo.values)}
  //   onBack={() => console.log("oi")}
    />
  );
}
