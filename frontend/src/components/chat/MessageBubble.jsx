import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Brain, User, Copy, Check, AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";
import { timeAgo } from "../../utils/format";
import SourceCard from "./SourceCard";

/**
 * Single chat message — handles both user and assistant roles.
 */
function MessageBubble({ message }) {
  const { role, content, sourceFile, pageNumber, timestamp, isError } = message;
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in some environments
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={cn(
        "flex items-end gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row",
        "max-w-full"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mb-1",
          isUser
            ? "bg-gradient-to-br from-slate-600 to-slate-700 order-last"
            : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-600/20"
        )}
      >
        {isUser
          ? <User size={14} className="text-slate-300" />
          : <Brain size={14} className="text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start", "max-w-[78%]")}>

        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-indigo-600 text-white rounded-br-sm"
              : isError
                ? "bg-red-500/10 border border-red-500/20 text-red-300 rounded-bl-sm"
                : "bg-white/5 border border-white/8 text-slate-100 rounded-bl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : isError ? (
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
              <p>{content}</p>
            </div>
          ) : (
            <div className="prose max-w-none text-slate-100 [&_code]:text-indigo-300 [&_pre]:bg-[#0d1117] [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-3 [&_a]:text-indigo-300">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}

          {/* Copy button — shown on hover for assistant */}
          {!isUser && !isError && (
            <button
              onClick={handleCopy}
              className={cn(
                "absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-[#1a2235] border border-white/10 flex items-center justify-center",
                "text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all",
                "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              )}
              aria-label="Copy response"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          )}
        </div>

        {/* Source citation */}
        {!isUser && sourceFile && (
          <SourceCard sourceFile={sourceFile} pageNumber={pageNumber} />
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-slate-600 px-1">
          {timeAgo(timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

export default MessageBubble;
