import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary:   "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98]",
  secondary: "bg-white/8 hover:bg-white/12 text-slate-200 border border-white/10",
  ghost:     "hover:bg-white/6 text-slate-400 hover:text-slate-200",
  danger:    "bg-red-600/90 hover:bg-red-500 text-white shadow-lg shadow-red-600/20",
  outline:   "border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400",
};

const sizes = {
  xs: "text-xs px-2.5 py-1.5 rounded-lg gap-1.5",
  sm: "text-sm px-3 py-2 rounded-lg gap-2",
  md: "text-sm px-4 py-2.5 rounded-xl gap-2",
  lg: "text-base px-5 py-3 rounded-xl gap-2.5",
};

/**
 * Reusable Button with variant, size, loading, and icon support.
 */
const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon: Icon,
    iconRight: IconRight,
    className,
    children,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === "xs" ? 12 : size === "sm" ? 14 : size === "lg" ? 18 : 16} />
      ) : null}

      {children && <span>{children}</span>}

      {!loading && IconRight && (
        <IconRight size={size === "xs" ? 12 : size === "sm" ? 14 : size === "lg" ? 18 : 16} />
      )}
    </button>
  );
});

export default Button;
