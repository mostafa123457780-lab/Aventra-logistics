import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-amber",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
