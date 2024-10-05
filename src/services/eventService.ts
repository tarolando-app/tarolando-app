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

export const fetchEventType = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/api/v1/event-type");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tipos de eventos:", error);
    throw error;
  }
};

export const fetchMusicalGenreType = async (): Promise<any> => {
  try {
    const response = await api.get<any>("/api/v1/musical-genre");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os generos musicais:", error);
    throw error;
  }
};

export const fetchEventById = async (
  eventId: string,
  params: any
): Promise<any> => {
  try {
    const response = await api.get<any>(`/api/v1/event/detail/${eventId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o evento:", error);
    throw error;
  }
};

export const submitEventForm = async (body: any): Promise<any> => {
  const formData = new FormData();

  console.log(body);

  // Adiciona campos ao formData
  formData.append("EventTypeId", body.stepTypeEvent.EventTypeId);
  formData.append("Name", body.stepAboutEvent.Name);
  formData.append("DateAndTime", body.stepDateEvent.DateAndTime);
  formData.append("SellAtTheEntrance", "false"); // Valor padrão
  formData.append("ClosingDate", body.stepDateEvent.ClosingDate);
  formData.append("GooglePlaceId", body.googlePlaceId);
  // Adiciona os gêneros musicais
  body.stepTypeEvent.MusicaGenresIds.forEach((genreId: string) => {
    formData.append("MusicalGenresIds", genreId);
  });

  // Verifica se a imagem é do Google ou sugerida
  if (body.stepPhotoEvent.isGoogle) {
    formData.append("GooglePlaceImageId", body.stepPhotoEvent.id);
  } else {
    formData.append("SuggestedImageId", body.stepPhotoEvent.id);
  }

  console.log(formData);

  try {
    const response = await api.post("/api/v1/event/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o formulário do evento:", error);
    throw error;
  }
};
