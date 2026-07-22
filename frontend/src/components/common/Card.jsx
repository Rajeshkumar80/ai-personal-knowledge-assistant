import { cn } from "../../utils/cn";

function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card",
        hover && "transition-all duration-200 hover:border-border-hover hover:bg-card-hover hover:-translate-y-0.5",
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
    <div className={cn("px-6 pt-6 pb-3", className)}>
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
