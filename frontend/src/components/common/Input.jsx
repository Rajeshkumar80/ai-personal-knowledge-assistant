import { forwardRef } from "react";
import { cn } from "../../utils/cn";

/**
 * Styled text input with optional icon, error state, and label.
 */
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
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Icon size={16} />
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            "w-full bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-slate-100",
            "placeholder:text-slate-500",
            "transition-all duration-200",
            "focus:outline-none focus:border-indigo-500/70 focus:bg-white/7 focus:ring-1 focus:ring-indigo-500/30",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            Icon && "pl-10",
            IconRight && "pr-10",
            error && "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        {IconRight && (
          <div className="absolute right-3 text-slate-400 pointer-events-none">
            <IconRight size={16} />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
});

export default Input;
