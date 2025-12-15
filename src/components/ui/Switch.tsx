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
            "relative w-[44px] h-[24px] rounded-full transition-colors duration-200 border",
            checked ? "bg-primary border-primary" : "bg-gray-100 border-gray-300"
          )}
        >
          <span
            className={cn(
              "absolute top-[2px] left-[2px] w-[18px] h-[18px] rounded-full shadow-sm transition-all duration-200",
              checked ? "translate-x-[20px] bg-white" : "translate-x-0 bg-gray-400"
            )}
          />
        </button>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
