import { cn } from "../../utils/cn";

const variants = {
  default:  "bg-glow text-fg-dim border border-border",
  primary:  "bg-glow text-fg border border-border-hover",
  success:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:  "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger:   "bg-danger/10 text-danger border border-danger/20",
  info:     "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
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
