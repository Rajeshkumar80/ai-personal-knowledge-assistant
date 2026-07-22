import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Plus, PanelLeft } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import ChatHistory from "../components/chat/ChatHistory";
import Button from "../components/common/Button";
import { useChat } from "../context/ChatContext";

function Chat() {
  const { sendMessage, clearMessages, loading } = useChat();
  const [showHistory, setShowHistory] = useState(true);

  const handleSuggest = useCallback((text) => {
    sendMessage(text);
  }, [sendMessage]);

  return (
    <DashboardLayout>
      <div className="flex flex-1 min-h-0 -mx-6 -mb-6 -mt-6">
        <motion.div
          animate={{ width: showHistory ? 260 : 0, opacity: showHistory ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden shrink-0"
        >
          <ChatHistory />
        </motion.div>

        <div className="flex flex-col flex-1 min-w-0 bg-base">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/40 backdrop-blur-sm shrink-0">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-fg-faint hover:text-fg hover:bg-glow transition-colors"
              aria-label="Toggle history panel"
            >
              <PanelLeft size={14} />
            </button>
            <Button variant="ghost" size="xs" icon={Plus} onClick={clearMessages}>
              New Chat
            </Button>
          </div>
          <ChatWindow onSuggest={handleSuggest} />
          <ChatInput onSend={sendMessage} loading={loading} disabled={false} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;
