"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-small text-primary font-normal">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "px-4 py-2 text-small bg-white border border-border rounded-button",
            "placeholder:text-text-light",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "transition-all duration-200",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-small text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
