import api from "./api";

export const getDashboard = async () => {
  const response = await api.get("/interview/dashboard");

  return response.data;
};