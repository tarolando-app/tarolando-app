import axios from "axios";
import { useLocation } from "./../contexts/LocationContext"; // Ajuste o caminho conforme necessário

const api = axios.create({
  baseURL: "https://its-happening-api-hml-mu3gmf3jma-rj.a.run.app", // Defina a URL base da API
});


export default api;
