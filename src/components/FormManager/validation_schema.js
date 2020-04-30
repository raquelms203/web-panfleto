import * as yup from "yup";
import CpfValidator from "cpf";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Apenas letras permitidas"
      )
      .required("Campo obrigatório")
      .test("sobrenome", "Campo incompleto", (value) => {
        if (value !== undefined) return !value.includes(" ");
      }),
    cpf: yup
      .string()
      .test("cpf", "Campo obrigatório", (value) => {
        if (value !== undefined) return !value.includes("_");
      })
      .test("valid", "Campo inválido", (value) => CpfValidator.isValid(value)),
    email: yup
      .string()
      .matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, "Email inválido")
      .required("Campo obrigatório"),
  });
};
