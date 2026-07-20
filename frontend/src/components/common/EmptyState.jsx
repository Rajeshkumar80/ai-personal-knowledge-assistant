import { cn } from "../../utils/cn";

/**
 * Empty state illustration with icon, title, description, and optional action.
 */
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-8 gap-4",
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 mb-2">
          <Icon size={28} />
        </div>
      )}

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-slate-200">{title}</h3>
        {description && (
          <p className="text-sm text-slate-500 max-w-sm">{description}</p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
