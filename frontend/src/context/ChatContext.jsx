import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { askQuestion, getHistory, clearHistory } from "../api/chatApi";
import toast from "../utils/toast";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  // messages are {id, role: "user"|"assistant", content, sourceFile, pageNumber, timestamp}
  const [messages, setMessages]     = useState([]);
  const [history, setHistory]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError]           = useState(null);

  const fetchHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await getHistory();
      setHistory(res.data ?? []);
    } catch {
      // non-critical
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (question) => {
    if (!question.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const res = await askQuestion(question);
      const data = res.data;

      const aiMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.answer,
        sourceFile: data.sourceFile,
        pageNumber: data.pageNumber,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Refresh sidebar history
      fetchHistory();
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(msg);

      const errorMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: `⚠️ ${msg}`,
        isError: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, fetchHistory]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const clearAllHistory = useCallback(async () => {
    try {
      await clearHistory();
      setHistory([]);
      setMessages([]);
      toast.success("Chat history cleared.");
    } catch {
      toast.error("Failed to clear history.");
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        history,
        loading,
        historyLoading,
        error,
        sendMessage,
        clearMessages,
        clearAllHistory,
        fetchHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
