import { cn } from "../../utils/cn";

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
        "flex flex-col items-center justify-center text-center py-14 px-8 gap-4",
        className
      )}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-glow border border-border flex items-center justify-center text-fg-faint mb-1">
          <Icon size={24} />
        </div>
      )}

      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        {description && (
          <p className="text-sm text-fg-faint max-w-sm">{description}</p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
