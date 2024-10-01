import api from "./apiService";

export const authUser = async (body: any): Promise<any> => {
  try {
    const response = await api.post<any>("/api/v1/auth", body);
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
};


