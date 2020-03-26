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
    name: yup.string().matches(/^[A-Za-z" "]/, "Campo obrigatório"),
    cpf: yup.string().test("cpf", "Campo obrigatório", value => value !== undefined && !value.includes("_") ),
    email: yup.string().email().required("Campo obrigatório"),
  });
};
