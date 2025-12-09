"use client";

import { FrameSize } from "@/types";
import { cn } from "@/utils/helpers";
import { formatPrice } from "@/utils/helpers";

interface SizeSelectorProps {
  sizes: FrameSize[];
  selectedSize: FrameSize | null;
  onSelect: (size: FrameSize) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {sizes.map((size) => {
        const isSelected = selectedSize?.id === size.id;
        
        return (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={cn(
              "p-4 rounded-card text-left transition-all duration-200",
              "border focus:outline-none focus:ring-2 focus:ring-primary",
              isSelected
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-border hover:border-primary"
            )}
            aria-pressed={isSelected}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[16.5px] font-normal">{size.name}</span>
              <span className={cn(
                "text-small",
                isSelected ? "text-white/80" : "text-text-light"
              )}>
                {size.width}×{size.height}&quot;
              </span>
            </div>
            <span className={cn(
              "text-[12px]",
              isSelected ? "text-white" : "text-primary"
            )}>
              {formatPrice(size.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
