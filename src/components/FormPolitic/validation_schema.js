import * as yup from "yup";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Selecione uma cidade"),
    cpf: yup.string().required("Campo obrigatório"),
    group: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Campo obrigatório")
  });
};
