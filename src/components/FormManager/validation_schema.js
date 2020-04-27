import * as yup from "yup";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Apenas letras permitidas")
      .test(
        "sobrenome",
        "Campo incompleto",
        (value) => value.includes(" ")
      )
      .required("Campo obrigatório"),
    cpf: yup
      .string()
      .test(
        "cpf",
        "Campo obrigatório",
        (value) => value !== undefined && !value.includes("_")
      ),
    email: yup
      .string()
      .matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Email inválido")
      .required("Campo obrigatório"),
  });
};
