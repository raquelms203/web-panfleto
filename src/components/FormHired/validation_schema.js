export const validateName = (value) => {
  if (value === "") return "Campo obrigatório";
  else if (!value.match(/^[A-Za-z" "]+$/)) {
    return "Apenas letras permitidas";
  } else return "";
};

export const validateEmail = (value) => {
  if (value === "") return "Campo obrigatório";
  else if (!value.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/))
    return "Email inválido";
  else return "";
};

export const validateMask = (value) => {
  if (value === "" || value.includes("_")) return "Campo obrigatório";

  return "";
};

export const validatePhoneIncomplete = (value) => {
  if (value === "") return "Campo obrigatório";
  if (value.match(/[0-9]/) && value.includes("_")) return "Campo incompleto";
  else return "";
};

export const validateSelect = (value) => {
  if (value === "") return "Selecione uma opção";
  else return "";
};

export const validateNotEmpty = (value) => {
  if (value === "") return "Campo obrigatório";
  return "";
};
