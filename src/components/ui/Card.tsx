"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white",
      bordered: "bg-white border border-border",
      elevated: "bg-white shadow-md",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
