import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Animated statistics card with gradient accent and icon.
 */
function StatsCard({ title, value, icon: Icon, trend, color = "indigo", loading = false }) {
  const colors = {
    indigo:  { bg: "from-indigo-500/10 to-indigo-600/5",   border: "border-indigo-500/20",  icon: "text-indigo-400",  glow: "shadow-indigo-500/10" },
    emerald: { bg: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/20", icon: "text-emerald-400", glow: "shadow-emerald-500/10" },
    purple:  { bg: "from-purple-500/10 to-purple-600/5",   border: "border-purple-500/20",  icon: "text-purple-400",  glow: "shadow-purple-500/10" },
    blue:    { bg: "from-blue-500/10 to-blue-600/5",       border: "border-blue-500/20",    icon: "text-blue-400",    glow: "shadow-blue-500/10" },
    amber:   { bg: "from-amber-500/10 to-amber-600/5",     border: "border-amber-500/20",   icon: "text-amber-400",   glow: "shadow-amber-500/10" },
  };

  const c = colors[color] || colors.indigo;

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/7 bg-white/3 p-6 h-[120px] animate-pulse">
        <div className="skeleton h-3 w-24 mb-4 rounded" />
        <div className="skeleton h-8 w-16 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "rounded-2xl border p-6 bg-gradient-to-br shadow-lg",
        c.bg, c.border, c.glow
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-slate-100 leading-none">{value ?? "—"}</p>
          {trend && (
            <p className="text-xs text-slate-500">{trend}</p>
          )}
        </div>

        {Icon && (
          <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center", c.icon)}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatsCard;
