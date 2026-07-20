import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Brain, MessageSquare } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../../context/ChatContext";

const WELCOME_SUGGESTIONS = [
  "What are the main topics in my documents?",
  "Summarize the uploaded content",
  "What conclusions can be drawn?",
];

function WelcomeScreen({ onSuggest }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 shadow-xl shadow-indigo-600/25">
        <Brain size={28} className="text-white" />
      </div>
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        Your AI Knowledge Assistant
      </h2>
      <p className="text-sm text-slate-400 max-w-sm mb-8">
        Ask questions about your uploaded documents. The AI will find relevant
        information and answer with citations.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {WELCOME_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-sm px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-slate-300 hover:bg-indigo-500/12 hover:border-indigo-500/30 hover:text-slate-100 transition-all text-left flex items-center gap-3"
          >
            <MessageSquare size={14} className="text-indigo-400 shrink-0" />
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Main scrollable message area.
 */
function ChatWindow({ onSuggest }) {
  const { messages, loading } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return <WelcomeScreen onSuggest={onSuggest} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
