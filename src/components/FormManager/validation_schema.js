import * as yup from "yup";
import CpfValidator from "cpf";

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
      ).test("valid", "Campo inválido", (value) => CpfValidator.isValid(value)),
    email: yup
      .string()
      .matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Email inválido")
      .required("Campo obrigatório"),
  });
};
