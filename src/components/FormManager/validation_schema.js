import * as yup from "yup";

// setLocale({
//   mixed: {
//     default: 'Não é válido',
//   },
//   number: {
//     min: 'Deve ser maior que ${min}',
//   },
// });

export const validationSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z" "]/, "Apenas letras permitidas")
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
