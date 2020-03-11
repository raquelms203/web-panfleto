import * as yup from "yup";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    // city: yup.string().required("Selecione uma opção")
  });
};
