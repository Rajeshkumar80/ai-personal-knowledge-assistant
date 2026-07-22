import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon: Icon,
    iconRight: IconRight,
    className,
    containerClassName,
    ...props
  },
  ref
) {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-fg-dim">{label}</label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-fg-faint pointer-events-none">
            <Icon size={15} />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-fg",
            "placeholder:text-fg-faint",
            "transition-all duration-150",
            "focus:outline-none focus:border-border-hover focus:bg-card focus:shadow-sm",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            Icon && "pl-10",
            IconRight && "pr-10",
            error && "border-danger/60 focus:border-danger/80",
            className
          )}
          {...props}
        />
        {IconRight && (
          <div className="absolute right-3.5 text-fg-faint pointer-events-none">
            <IconRight size={15} />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-fg-faint">{hint}</p>}
    </div>
  );
});

export default Input;
