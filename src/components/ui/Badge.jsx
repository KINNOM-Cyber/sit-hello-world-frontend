import { cn } from "../../libs/utils";

export default function Badge({
  children,
  className,
  color = "emerald",
  ...props
}) {
  const variants = {
    red: "bg-red-400/20 text-red-400",
    emerald: "bg-emerald-400/20 text-emerald-400",
  };

  return (
    <div
      className={cn(
        className,
        "text-xs py-1 px-3 w-fit rounded-full",
        variants[color]
      )}
      {...props}
    >
      {children}
    </div>
  );
}
