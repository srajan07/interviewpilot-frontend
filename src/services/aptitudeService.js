import api from "./api";

export const getAptitudeCategories = async () => {
  const response = await api.get("/aptitude/categories");
  return response.data;
};

export const startAptitudeTest = async (data) => {
  const response = await api.post("/aptitude/start", data);
  return response.data;
};

export const submitAptitudeTest = async (data) => {
  const response = await api.post("/aptitude/submit", data);
  return response.data;
};

export const getAptitudeHistory = async (page = 1, limit = 10) => {
  const response = await api.get(`/aptitude/history?page=${page}&limit=${limit}`);
  return response.data;
};

export const getAptitudeAttemptResult = async (attemptId) => {
  const response = await api.get(`/aptitude/attempts/${attemptId}`);
  return response.data;
};
