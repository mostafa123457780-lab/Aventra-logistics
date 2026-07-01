import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "dark", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg px-5 py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "dark" && "bg-ink text-white hover:bg-ink/90",
          variant === "outline" && "border border-black/15 hover:border-ink",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
