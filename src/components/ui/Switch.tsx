"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, label, disabled = false, className }, ref) => {
    return (
      <label className={cn("flex items-center gap-3 cursor-pointer", disabled && "opacity-50 cursor-not-allowed", className)}>
        {label && (
          <span className="text-body text-primary">{label}</span>
        )}
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            "relative w-[33px] h-[18px] rounded-full transition-colors duration-200",
            checked ? "bg-primary" : "bg-border"
          )}
        >
          <span
            className={cn(
              "absolute top-[1.5px] w-[15px] h-[15px] bg-white rounded-full shadow-sm transition-transform duration-200",
              checked ? "translate-x-[16px]" : "translate-x-[1.5px]"
            )}
          />
        </button>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
