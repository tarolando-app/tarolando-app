import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { log } from "console";

const api = axios.create({
  baseURL: "https://its-happening-api-hml-mu3gmf3jma-rj.a.run.app",
});

api.interceptors.request.use(
  async (config) => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const storedUser = await AsyncStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && user.refreshToken) {
        try {
          const response = await api.post(`/api/v1/auth/refresh-token`, {
            refreshToken: user.refreshToken,
          });

          const newUser = {
            ...user,
            token: response.data.data.token,
            refreshToken: response.data.data.refreshToken,
          };

          console.log("atualizou o bendito token");
          await AsyncStorage.setItem("user", JSON.stringify(newUser));

          originalRequest.headers.Authorization = `Bearer ${newUser.token}`;
          return axios(originalRequest);
        } catch (error) {
          // Fazer ação para deslogar

          console.log(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
