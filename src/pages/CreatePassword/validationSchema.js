export const validatePassword = (value1, value2) => {
  if (value1 === "") return "Campo obrigatório";
  else if(value1 !== value2) return "Senhas não correspondem"
  else if (!value1.match(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/)) return "Senha deve ter pelo menos 6 caracteres com letras e números";
  return "";
};
