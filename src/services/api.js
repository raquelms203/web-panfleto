import axios from "axios";

export const apiStates = axios.create({  
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/distritos"
});

export const apiADM = axios.create({  
  baseURL: "http://localhost:3333/user"
});

