import axios from "axios";

export const apiCities = axios.create({  
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/distritos"
});

export const apiADM = axios.create({  
  baseURL: "http://localhost:3333/user"
});

