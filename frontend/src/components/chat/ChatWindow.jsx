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
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-6 shadow-sm">
        <Brain size={22} className="text-white" />
      </div>
      <h2 className="text-xl font-semibold text-fg mb-2 tracking-tight">
        Your AI Knowledge Assistant
      </h2>
      <p className="text-sm text-fg-dim max-w-sm mb-8 leading-relaxed">
        Ask questions about your uploaded documents. The AI will find relevant
        information and answer with citations.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {WELCOME_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-sm px-4 py-3 rounded-xl border border-border bg-glow text-fg-dim hover:bg-card hover:border-border-hover hover:text-fg transition-all text-left flex items-center gap-3"
          >
            <MessageSquare size={14} className="text-fg-faint shrink-0" />
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ onSuggest }) {
  const { messages, loading } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return <WelcomeScreen onSuggest={onSuggest} />;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-5">
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
