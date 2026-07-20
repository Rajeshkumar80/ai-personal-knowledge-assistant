import { useDocuments } from "../../context/DocumentContext";
import { useChat } from "../../context/ChatContext";
import { MessageSquare, Upload, Clock } from "lucide-react";
import { timeAgo, truncate } from "../../utils/format";
import { Skeleton } from "../common/Loader";
import EmptyState from "../common/EmptyState";

function ActivityItem({ icon: Icon, color, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={13} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-fg font-medium truncate">{title}</p>
        {subtitle && <p className="text-xs text-fg-faint truncate mt-0.5">{subtitle}</p>}
      </div>
      {time && (
        <span className="text-xs text-fg-faint shrink-0">{time}</span>
      )}
    </div>
  );
}

function RecentActivity() {
  const { documents, loading: docLoading } = useDocuments();
  const { history, historyLoading } = useChat();

  const loading = docLoading || historyLoading;

  const activities = [
    ...documents.slice(0, 3).map((d) => ({
      type: "upload",
      title: `Uploaded ${truncate(d.fileName, 40)}`,
      subtitle: `${d.chunkCount ?? 0} chunks indexed`,
      time: timeAgo(d.uploadDate),
      date: d.uploadDate,
    })),
    ...history.slice(0, 3).map((h) => ({
      type: "chat",
      title: truncate(h.question, 48),
      subtitle: h.sourceFile ? `Source: ${h.sourceFile}` : null,
      time: timeAgo(h.createdAt),
      date: h.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="rounded-xl border border-border bg-glow p-5">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={15} className="text-fg-faint" />
        <h2 className="text-sm font-semibold text-fg">Recent Activity</h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-7 h-7 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2.5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No activity yet"
          description="Upload a document or start a chat to see your activity here."
          className="py-8"
        />
      ) : (
        <div className="divide-y divide-theme-border">
          {activities.map((a, i) => (
            <ActivityItem
              key={i}
              icon={a.type === "upload" ? Upload : MessageSquare}
              color={
                a.type === "upload"
                  ? "bg-glow text-fg-dim"
                  : "bg-emerald-500/10 text-emerald-400"
              }
              title={a.title}
              subtitle={a.subtitle}
              time={a.time}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
