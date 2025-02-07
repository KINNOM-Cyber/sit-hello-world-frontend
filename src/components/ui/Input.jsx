import * as React from "react";

import { cn } from "../../libs/utils";

const Input = ({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-13 w-full rounded-md border-black/50 hover:text-white text-white  bg-black/30 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted/80   disabled:cursor-not-allowed outline-0 disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
