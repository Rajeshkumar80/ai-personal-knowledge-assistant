import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary:   "bg-white hover:bg-[#e0e0e0] text-black active:scale-[0.98]",
  secondary: "bg-white/8 hover:bg-white/12 text-[#ededed] border border-white/10",
  ghost:     "hover:bg-white/6 text-[#888] hover:text-white",
  danger:    "bg-[#ee0000] hover:bg-[#cc0000] text-white",
  outline:   "border border-white/20 text-white hover:bg-white/5",
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
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
