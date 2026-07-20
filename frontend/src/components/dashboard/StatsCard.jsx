import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

function StatsCard({ title, value, icon: Icon, trend, color = "default", loading = false }) {
  const colors = {
    default:  { bg: "from-glow to-glow/30",   border: "border-border",  icon: "text-fg-dim" },
    emerald:  { bg: "from-emerald-500/8 to-emerald-500/3", border: "border-emerald-500/15", icon: "text-emerald-400" },
    blue:     { bg: "from-blue-500/8 to-blue-500/3",       border: "border-blue-500/15",    icon: "text-blue-400" },
    amber:    { bg: "from-amber-500/8 to-amber-500/3",     border: "border-amber-500/15",   icon: "text-amber-400" },
  };

  const c = colors[color] || colors.default;

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-glow p-5 h-[110px] animate-pulse">
        <div className="skeleton h-3 w-20 mb-3 rounded" />
        <div className="skeleton h-7 w-14 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "rounded-xl border p-5 bg-gradient-to-br",
        c.bg, c.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-fg-dim uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-fg leading-none">{value ?? "—"}</p>
          {trend && (
            <p className="text-xs text-fg-faint">{trend}</p>
          )}
        </div>

        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg bg-glow flex items-center justify-center", c.icon)}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatsCard;
