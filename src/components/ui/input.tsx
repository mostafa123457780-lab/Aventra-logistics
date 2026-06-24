import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition-colors focus:border-amber bg-white text-ink placeholder:text-steel/70",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition-colors focus:border-amber bg-white text-ink placeholder:text-steel/70 min-h-[120px]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
