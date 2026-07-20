import { cn } from "../../utils/cn";

const variants = {
  default:  "bg-white/8 text-slate-300 border border-white/10",
  primary:  "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25",
  success:  "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  warning:  "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  danger:   "bg-red-500/15 text-red-300 border border-red-500/25",
  info:     "bg-blue-500/15 text-blue-300 border border-blue-500/25",
};

function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
