import { useDocuments } from "../../context/DocumentContext";
import { useChat } from "../../context/ChatContext";
import { FileText, MessageSquare, Upload, Clock } from "lucide-react";
import { timeAgo, truncate } from "../../utils/format";
import { Skeleton } from "../common/Loader";
import EmptyState from "../common/EmptyState";

function ActivityItem({ icon: Icon, color, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-200 font-medium truncate">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>}
      </div>
      {time && (
        <span className="text-xs text-slate-600 shrink-0">{time}</span>
      )}
    </div>
  );
}

function RecentActivity() {
  const { documents, loading: docLoading } = useDocuments();
  const { history, historyLoading } = useChat();

  const loading = docLoading || historyLoading;

  // Merge and sort by date desc, take top 6
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
    <div className="rounded-2xl border border-white/7 bg-white/3 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-200">Recent Activity</h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-xl" />
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
        <div className="divide-y divide-white/5">
          {activities.map((a, i) => (
            <ActivityItem
              key={i}
              icon={a.type === "upload" ? Upload : MessageSquare}
              color={
                a.type === "upload"
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-emerald-500/15 text-emerald-400"
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
