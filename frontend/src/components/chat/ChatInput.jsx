import { useState, useRef, useCallback } from "react";
import { Send, Square } from "lucide-react";
import { cn } from "../../utils/cn";

const SUGGESTIONS = [
  "Summarize the main points of the uploaded documents",
  "What are the key topics covered?",
  "Explain the most important concepts",
  "What conclusions can be drawn?",
];

function ChatInput({ onSend, loading, disabled }) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const el = e.target;
    setValue(el.value);
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
      {showSuggestions && !value && (
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => pickSuggestion(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-glow text-fg-dim hover:text-fg hover:border-border-hover hover:bg-glow/80 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-end gap-3 rounded-xl border border-border bg-glow backdrop-blur-sm px-4 py-3 focus-within:border-border-hover focus-within:bg-glow/80 transition-all duration-150">
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
            "flex-1 resize-none bg-transparent text-sm text-fg placeholder:text-fg-faint",
            "focus:outline-none leading-relaxed",
            "disabled:opacity-40 disabled:cursor-not-allowed",
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
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150",
            loading
              ? "bg-danger hover:opacity-90 text-white cursor-pointer"
              : canSend
                ? "bg-accent hover:opacity-90 text-base cursor-pointer"
                : "bg-glow text-fg-faint cursor-not-allowed"
          )}
        >
          {loading
            ? <Square size={13} fill="currentColor" />
            : <Send size={14} />
          }
        </button>
      </div>

      <p className="text-[10px] text-fg-faint text-center mt-2">
        AI answers are based on your uploaded documents only.
      </p>
    </div>
  );
}

export default ChatInput;
