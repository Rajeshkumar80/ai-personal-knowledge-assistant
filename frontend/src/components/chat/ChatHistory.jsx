import { Trash2, MessageSquare, Clock } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { truncate, timeAgo } from "../../utils/format";
import { Skeleton } from "../common/Loader";

/**
 * Sidebar panel listing past chat history entries.
 */
function ChatHistory() {
  const { history, historyLoading, clearAllHistory } = useChat();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock size={13} className="text-fg-faint" />
          <span className="text-xs font-semibold text-fg-dim uppercase tracking-wider">History</span>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-fg-faint hover:text-danger hover:bg-danger/10 transition-colors"
            title="Clear history"
            aria-label="Clear chat history"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {historyLoading ? (
          <div className="px-2 py-3 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-2/3" />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 px-4 text-center">
            <MessageSquare size={20} className="text-fg-faint" />
            <p className="text-xs text-fg-dim">No history yet</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="px-3 py-2.5 rounded-xl hover:bg-glow cursor-pointer transition-colors group"
            >
              <p className="text-xs font-medium text-fg leading-snug">
                {truncate(item.question, 52)}
              </p>
              <p className="text-[10px] text-fg-faint mt-1">
                {timeAgo(item.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default ChatHistory;
