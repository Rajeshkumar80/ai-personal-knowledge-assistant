import { cn } from "../../utils/cn";

function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/8 bg-white/3",
        hover && "transition-all duration-150 hover:border-white/12",
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
    <div className={cn("px-5 pt-5 pb-3", className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ children, className }) {
  return (
    <div className={cn("px-5 pb-5", className)}>
      {children}
    </div>
  );
};

export default Card;
