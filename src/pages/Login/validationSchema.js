export const validateEmail = value => {
  if (value === "") return "Campo obrigatório";
  else if (!value.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/))
    return "Email inválido";
  else return "";
};

export const validatePassword = value => {
  if (value === "") return "Campo obrigatório";
  else if (!value.match(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/)) return "Senha deve ter 6 caracteres com letras e números";
  return "";
};
