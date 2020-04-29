import React, { useState, useEffect, useCallback } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { validationSchema } from "./validation_schema";
import ConfirmInfo from "../ConfirmInfo";
import {
  Container,
  StyledTextField,
  Title,
  FontButton,
} from "../FormHired/styles";
import { apiADM } from "../../services/api";

export default function FormManager(props) {
  const { onClose, onCancel, politic, viewManager } = props;
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    cpf: "",
    email: "",
  });
  const [openDialogConfirmInfo, setOpenDialogConfirmInfo] = useState({
    open: false,
    info: {},
    values: {},
  });
  const handleSubmit = (values) => {
    let inputs = [
      { field: "Nome completo:", value: values.name },
      { field: "CPF:", value: values.cpf },
      { field: "Email:", value: values.email },
    ];

    setOpenDialogConfirmInfo({ open: true, info: inputs, values: values });
  };

  const sendManager = async (values) => {
    await apiADM
      .post(`/manager?politicId=${politic.id}`, {
        name: values.name.toUpperCase(),
        email: values.email,
        document: values.cpf,
      })
      .then((response) => {
        toast.success("Gestor criado com sucesso!");
      })
      .catch((error) => {
        if (Boolean(error.response) && error.response.status === 401)
          toast.info(
            "Após 1h a sessão expira. Você será redirecionado para a página de login.",
            {
              onClose: function () {
                history.push("/");
              },
            }
          );
          else if (Boolean(error.response) && error.response.status === 409)
          toast.error("Houve conflito com um usuário já cadastrado!");
        else toast.error("Ocorreu um erro ao criar gestor!");
      });
    onClose();
  };

  const initValues = useCallback(() => {
    if (viewManager !== undefined) {
      setInitialValues({
        name: viewManager.name,
        cpf: viewManager.document,
        email: viewManager.email,
      });
      setIsEdit(true);
    }
  }, [setInitialValues, setIsEdit, viewManager]);

  useEffect(() => {
    initValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !openDialogConfirmInfo.open ? (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form autoComplete="off" style={{ padding: "16px 24px" }}>
            <Container
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item xs>
                <Title>{`Campanha: (${politic.group.toUpperCase()}) ${
                  politic.name.split(" ")[0]
                }`}</Title>
              </Grid>
              <div style={{ width: 400 }}></div>
              <Grid item xs>
                <Field name="name">
                  {({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: isEdit,
                      }}
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
                      {...field}
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
                          InputProps={{
                            readOnly: isEdit,
                          }}
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
              <Grid item xs sm md={12}>
                <Field name="email">
                  {({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        readOnly: isEdit,
                      }}
                      size="small"
                      label="Email"
                      variant="outlined"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  )}
                </Field>
              </Grid>
              <Grid
                item
                container
                justify="flex-end"
                xs
                sm
                md={12}
                spacing={1}
                style={{ paddingRight: 0 }}
              >
                <Grid item>
                  <Button
                    size="large"
                    style={{ background: "#958a94", color: "white" }}
                    onClick={() => {
                      onCancel();
                    }}
                  >
                    Voltar
                  </Button>
                </Grid>
                {!isEdit ? (
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="secondary"
                    >
                      <FontButton>CONTINUAR</FontButton>
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
            </Container>
          </Form>
        );
      }}
    </Formik>
  ) : (
    <Container
      container
      direction="column"
      justify="flex-start"
      style={{ overflow: "hidden" }}
    >
      <Grid item>
        <ConfirmInfo
          info={openDialogConfirmInfo.info}
          onClick={() => sendManager(openDialogConfirmInfo.values)}
          onBack={() => {
            setOpenDialogConfirmInfo({ open: false });
            setInitialValues({
              name: openDialogConfirmInfo.values.name,
              cpf: openDialogConfirmInfo.values.cpf,
              email: openDialogConfirmInfo.values.email,
            });
          }}
        />
      </Grid>
    </Container>
  );
}
