import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary:   "bg-accent hover:opacity-90 text-base active:scale-[0.98] font-semibold",
  secondary: "bg-elevated hover:bg-surface text-fg border border-border font-medium",
  ghost:     "hover:bg-glow/60 text-fg-dim hover:text-fg",
  danger:    "bg-danger hover:opacity-90 text-white",
  outline:   "border border-border text-fg hover:bg-glow/60",
};

const sizes = {
  xs: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
  sm: "text-sm px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2 rounded-lg gap-2",
  lg: "text-base px-5 py-2.5 rounded-lg gap-2",
};

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
        "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
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
