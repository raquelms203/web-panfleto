import axios from "axios";
import { requestSuccessInterceptor } from "./interceptors";

export const apiCities = axios.create({  
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/distritos"
});

const apiADM = axios.create({  
  baseURL: "https://econtracts.herokuapp.com"
});

apiADM.interceptors.request.use(requestSuccessInterceptor);

export { apiADM };

