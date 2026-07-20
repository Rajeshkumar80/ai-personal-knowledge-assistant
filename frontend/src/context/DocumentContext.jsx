import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getDocuments, uploadDocument, deleteDocument } from "../api/documentApi";
import toast from "../utils/toast";

const DocumentContext = createContext(null);

export function DocumentProvider({ children }) {
  const [documents, setDocuments]   = useState([]);
  const [loading, setLoading]       = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError]           = useState(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDocuments();
      setDocuments(res.data ?? []);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to load documents.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = useCallback(async (file) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const res = await uploadDocument(file, setUploadProgress);
      const newDoc = res.data;
      setDocuments((prev) => [newDoc, ...prev]);
      toast.success(`"${file.name}" uploaded successfully.`);
      return newDoc;
    } catch (err) {
      const msg = err.response?.data?.error || "Upload failed. Please try again.";
      toast.error(msg);
      throw err;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast.success("Document deleted.");
    } catch (err) {
      toast.error("Failed to delete document.");
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loading,
        uploading,
        uploadProgress,
        error,
        fetchDocuments,
        upload,
        remove,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocuments must be used inside <DocumentProvider>");
  return ctx;
}
