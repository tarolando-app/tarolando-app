import api from "./apiService";

export const fetchGoogleAutocomplete = async (body: any): Promise<any> => {
  try {
    const response = await api.post<any>(
      "/api/v1/google-place/autocomplete",
      body
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar google places:", error);
    throw error;
  }
};


export const fetchGooglePlaceRegister = async (body: any): Promise<any> => {
    try {
      const response = await api.post<any>(
        "/api/v1/google-place",
        body
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar place id:", error);
      throw error;
    }
  };