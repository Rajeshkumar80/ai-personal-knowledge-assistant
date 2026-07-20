import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Brain, User, Copy, Check, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";
import { timeAgo } from "../../utils/format";
import SourceCard from "./SourceCard";

function MessageBubble({ message }) {
  const { role, content, sourceFile, pageNumber, timestamp, isError } = message;
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-end gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row",
        "max-w-full"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mb-1",
          isUser
            ? "bg-elevated order-last"
            : "bg-accent"
        )}
      >
        {isUser
          ? <User size={13} className="text-fg-dim" />
          : <Brain size={13} className="text-base" />
        }
      </div>

      {/* Bubble */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start", "max-w-[78%]")}>
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-accent text-base rounded-br-sm"
              : isError
                ? "bg-danger/10 border border-danger/20 text-danger rounded-bl-sm"
                : "bg-glow border border-border text-fg rounded-bl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : isError ? (
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-[#ee0000] mt-0.5 shrink-0" />
              <p>{content}</p>
            </div>
          ) : (
            <div className="prose max-w-none text-fg [&_code]:text-fg-dim [&_pre]:bg-elevated [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg [&_pre]:p-3 [&_a]:text-fg">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}

          {!isUser && !isError && (
            <button
              onClick={handleCopy}
              className={cn(
                "absolute -top-2 -right-2 w-6 h-6 rounded-md bg-elevated border border-border flex items-center justify-center",
                "text-fg-dim hover:text-fg hover:border-border-hover transition-all",
                "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              )}
              aria-label="Copy response"
            >
              {copied ? <Check size={11} className="text-success" /> : <Copy size={11} />}
            </button>
          )}
        </div>

        {!isUser && sourceFile && (
          <SourceCard sourceFile={sourceFile} pageNumber={pageNumber} />
        )}

        <span className="text-[10px] text-fg-faint px-1">
          {timeAgo(timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

export default MessageBubble;
