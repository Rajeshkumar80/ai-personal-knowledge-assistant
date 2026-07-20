import { cn } from "../../utils/cn";

/**
 * Full-page or inline spinner.
 */
export function Spinner({ size = "md", className }) {
  const sizes = { xs: "w-3 h-3", sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8", xl: "w-12 h-12" };
  return (
    <span
      className={cn(
        "inline-block border-2 border-white/20 border-t-indigo-400 rounded-full animate-spin",
        sizes[size],
        className
      )}
    />
  );
}

/**
 * Skeleton block loader.
 */
export function Skeleton({ className }) {
  return (
    <div className={cn("skeleton rounded-lg", className)} />
  );
}

/**
 * Full-page loading overlay.
 */
export function PageLoader({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-slate-400 min-h-[300px]">
      <Spinner size="xl" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default Spinner;
