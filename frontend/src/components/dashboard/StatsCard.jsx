import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

function StatsCard({ title, value, icon: Icon, trend, color = "default", loading = false }) {
  const colors = {
    default: { bg: "bg-glow", border: "border-border", icon: "text-fg-dim" },
    emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/15", icon: "text-emerald-400" },
    blue:    { bg: "bg-blue-500/5",    border: "border-blue-500/15",    icon: "text-blue-400" },
    amber:   { bg: "bg-amber-500/5",   border: "border-amber-500/15",   icon: "text-amber-400" },
  };
  const c = colors[color] || colors.default;

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 h-[116px] animate-pulse">
        <div className="skeleton h-3 w-20 mb-3 rounded" />
        <div className="skeleton h-8 w-14 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn("rounded-2xl border p-5 transition-all duration-200", c.bg, c.border)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-fg-dim uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-fg leading-none tracking-tight">{value ?? "—"}</p>
          {trend && <p className="text-xs text-fg-faint">{trend}</p>}
        </div>
        {Icon && (
          <div className={cn("w-9 h-9 rounded-xl bg-glow border border-border flex items-center justify-center", c.icon)}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatsCard;
