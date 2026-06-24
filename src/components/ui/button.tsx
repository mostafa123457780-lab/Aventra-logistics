import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "dark" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-amber text-white hover:brightness-110",
  outline: "border border-white/25 text-white hover:border-amber hover:text-amber",
  dark: "bg-ink text-white hover:bg-amber",
  ghost: "text-ink hover:text-amber",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-bold px-6 py-3.5 rounded-full transition-colors",
      variantClasses[variant],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
