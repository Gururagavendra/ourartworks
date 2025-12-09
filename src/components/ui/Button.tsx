"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-normal transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-white hover:opacity-90",
      secondary: "bg-white text-primary border border-border hover:bg-background-secondary",
      outline: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-small rounded-button",
      md: "px-6 py-3 text-body rounded-button",
      lg: "px-8 py-4 text-body-lg rounded-button",
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
