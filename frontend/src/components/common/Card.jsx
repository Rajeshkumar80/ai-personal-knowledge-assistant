import { cn } from "../../utils/cn";

/**
 * Surface card with optional hover lift and glass effect.
 */
function Card({ children, className, hover = false, glass = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/7 bg-white/4 backdrop-blur-sm",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:border-white/12 hover:shadow-xl hover:shadow-black/20",
        glass && "bg-white/4 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={cn("px-6 pt-6 pb-4", className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }) {
  return (
    <div className={cn("px-6 pb-6", className)}>
      {children}
    </div>
  );
};

export default Card;
