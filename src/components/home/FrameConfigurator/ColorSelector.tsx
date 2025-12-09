"use client";

import { FrameColor } from "@/types";
import { cn } from "@/utils/helpers";
import { Check } from "lucide-react";

interface ColorSelectorProps {
  colors: FrameColor[];
  selectedColor: FrameColor | null;
  onSelect: (color: FrameColor) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => {
        const isSelected = selectedColor?.id === color.id;
        const isWhite = color.hexCode.toLowerCase() === "#ffffff" || color.hexCode.toLowerCase() === "#fafafa";
        
        return (
          <button
            key={color.id}
            onClick={() => onSelect(color)}
            className={cn(
              "relative w-12 h-12 rounded-full transition-all duration-200",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              isSelected && "ring-2 ring-primary ring-offset-2",
              isWhite && "border border-border"
            )}
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
            aria-pressed={isSelected}
          >
            {isSelected && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check
                  size={20}
                  className={isWhite ? "text-primary" : "text-white"}
                  strokeWidth={3}
                />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
