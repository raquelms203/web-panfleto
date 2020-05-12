import * as yup from "yup";
import CpfValidator from "cpf";

export const validationSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/(.{1}[ ].{1})/, "Campo incompleto")
      .required("Campo obrigatório"),
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
