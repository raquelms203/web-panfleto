import axios from "axios";
import { requestSuccessInterceptor } from "./interceptors";

export const apiCities = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/distritos",
});

const apiADM = axios.create({
  baseURL: "http://161.35.5.72/api/v1",
});

apiADM.interceptors.request.use(requestSuccessInterceptor);

export { apiADM };
