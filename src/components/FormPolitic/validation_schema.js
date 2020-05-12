import CpfValidator from "cpf";

export const validateName = (value) => {
  if (value === "") return "Campo obrigatório";
  else if (!value.match(/(.{1}[ ].{1})/)) return "Campo incompleto";
  else return "";
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

export const validateCPF = (value) => {
  if (value === "" || value.includes("_")) return "Campo obrigatório";
  if (!CpfValidator.isValid(value)) {
    return "Campo inválido";
  }
  return "";
};

export const validatePhoneIncomplete = (value) => {
  if (value.match(/[0-9]/) && value.includes("_")) return "Campo incompleto";
  else return "";
};

export const validateSelect = (value) => {
  if (value === "") return "Selecione uma opção";
  else return "";
};

export const validateType = (value) => {  
  if(value === 0) return "Selecione uma opção";
  else return "";
}

export const validateNotEmpty = (value) => {
  if (value === "") return "Campo obrigatório";
  return "";
};
