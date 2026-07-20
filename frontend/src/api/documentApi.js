import api from "./api";

/**
 * Upload a document file.
 * @param {File} file
 * @param {Function} onProgress  - (percent: number) => void
 */
export const uploadDocument = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/document/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });

  return response.data; // ApiResponse<DocumentDto>
};

/**
 * Fetch all active documents.
 */
export const getDocuments = async () => {
  const response = await api.get("/document");
  return response.data; // ApiResponse<DocumentDto[]>
};

/**
 * Soft-delete a document by ID.
 * @param {number} id
 */
export const deleteDocument = async (id) => {
  const response = await api.delete(`/document/${id}`);
  return response.data; // ApiResponse<void>
};

/**
 * Fetch dashboard statistics.
 */
export const getStats = async () => {
  const response = await api.get("/document/stats");
  return response.data; // ApiResponse<DashboardStatsDto>
};
