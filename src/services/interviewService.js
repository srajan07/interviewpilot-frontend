import api from "./api";

export const startInterview = async (interviewData) => {
  const response = await api.post("/interview/start", interviewData);

  return response.data;
};

export const submitAnswer = async (answerData) => {
  const response = await api.post("/interview/submit-answer", answerData);

  return response.data;
};

export const getInterviewCredits = async () => {
  const response = await api.get("/interview/credits");

  return response.data;
};

export const askAIDsaCoach = async (coachData) => {
  const response = await api.post("/interview/dsa-ai-coach", coachData);

  return response.data;
};