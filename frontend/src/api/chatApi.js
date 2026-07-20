import api from "./api";

/**
 * Ask a question via RAG.
 * @param {string} question
 */
export const askQuestion = async (question) => {
  const response = await api.post("/chat/ask", { question });
  return response.data; // ApiResponse<ChatResponse>
};

/**
 * Fetch all chat history.
 */
export const getHistory = async () => {
  const response = await api.get("/chat/history");
  return response.data; // ApiResponse<ChatHistory[]>
};

/**
 * Clear all chat history.
 */
export const clearHistory = async () => {
  const response = await api.delete("/chat/history");
  return response.data;
};
