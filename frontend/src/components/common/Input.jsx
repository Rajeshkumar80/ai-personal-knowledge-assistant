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
        <label className="text-sm font-medium text-[#888]">{label}</label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-[#555] pointer-events-none">
            <Icon size={16} />
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            "w-full bg-white/5 border border-white/8 rounded-lg px-3.5 py-2 text-sm text-white",
            "placeholder:text-[#555]",
            "transition-all duration-150",
            "focus:outline-none focus:border-white/30 focus:bg-white/7",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            Icon && "pl-10",
            IconRight && "pr-10",
            error && "border-[#ee0000]/60 focus:border-[#ee0000]/80",
            className
          )}
          {...props}
        />

        {IconRight && (
          <div className="absolute right-3 text-[#555] pointer-events-none">
            <IconRight size={16} />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[#ee0000]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#555]">{hint}</p>}
    </div>
  );
});

export default Input;
