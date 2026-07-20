import { cn } from "../../utils/cn";

const variants = {
  default:  "bg-white/6 text-[#aaa] border border-white/8",
  primary:  "bg-white/10 text-white border border-white/15",
  success:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:  "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger:   "bg-[#ee0000]/10 text-[#ff6666] border border-[#ee0000]/20",
  info:     "bg-blue-500/10 text-blue-400 border border-blue-500/20",
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
