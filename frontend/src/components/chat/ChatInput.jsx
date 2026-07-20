import { useState, useRef, useCallback } from "react";
import { Send, Square } from "lucide-react";
import { cn } from "../../utils/cn";

const SUGGESTIONS = [
  "Summarize the main points of the uploaded documents",
  "What are the key topics covered?",
  "Explain the most important concepts",
  "What conclusions can be drawn?",
];

/**
 * Chat input bar with auto-resize, suggestions, and send button.
 */
function ChatInput({ onSend, loading, disabled }) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const el = e.target;
    setValue(el.value);
    // Auto-resize
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
    setShowSuggestions(false);
  };

  const submit = useCallback(() => {
    const q = value.trim();
    if (!q || loading) return;
    onSend(q);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, loading, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const pickSuggestion = (s) => {
    setValue(s);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const canSend = value.trim().length > 0 && !loading && !disabled;

  return (
    <div className="px-4 pb-4">
      {/* Suggestions */}
      {showSuggestions && !value && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => pickSuggestion(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/4 text-slate-400 hover:text-slate-200 hover:border-indigo-500/40 hover:bg-indigo-500/8 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex items-end gap-3 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm px-4 py-3 focus-within:border-indigo-500/50 focus-within:bg-white/6 transition-all duration-200 shadow-lg shadow-black/20">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Ask anything about your documents… (Enter to send, Shift+Enter for new line)"
          disabled={disabled || loading}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500",
            "focus:outline-none leading-relaxed",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "max-h-[180px] overflow-y-auto"
          )}
          style={{ height: "auto" }}
          aria-label="Ask a question"
        />

        <button
          onClick={loading ? undefined : submit}
          disabled={loading ? false : !canSend}
          aria-label={loading ? "Stop generation" : "Send message"}
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
            loading
              ? "bg-red-600/80 hover:bg-red-500 text-white cursor-pointer"
              : canSend
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 cursor-pointer"
                : "bg-white/5 text-slate-600 cursor-not-allowed"
          )}
        >
          {loading
            ? <Square size={14} fill="currentColor" />
            : <Send size={15} />
          }
        </button>
      </div>

      <p className="text-[10px] text-slate-600 text-center mt-2">
        AI answers are based on your uploaded documents only.
      </p>
    </div>
  );
}

export default ChatInput;
