import * as yup from "yup";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    city: yup.string().required("Selecione uma cidade"),
    cpf: yup.string().test("cpf", "Campo obrigatório", value => value !== undefined && !value.includes("_") ),
    group: yup.string().required("Campo obrigatório"),
    type: yup.string().required("Campo obrigatório")
  });
};
