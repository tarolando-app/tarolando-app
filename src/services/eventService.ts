import api from "./apiService";

export const fetchHappeningNow = async (params: any): Promise<any> => {
  try {
    const response = await api.get<any>("/api/v1/event/happening-now", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export const fetchUpcoming = async (params: any): Promise<any> => {
  try {
    const response = await api.get<any>("/api/v1/event/upcoming", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export const fetchTrending = async (params: any): Promise<any> => {
  try {
    const response = await api.get<any>("/api/v1/event/trending", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};
