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
    <div className="grid grid-cols-3 gap-1.5">
      {sizes.map((size) => {
        const isSelected = selectedSize?.id === size.id;
        
        return (
          <button
            key={size.id}
            onClick={() => onSelect(size)}
            className={cn(
              "p-2 text-left transition-all duration-200",
              "border focus:outline-none",
              isSelected
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-gray-200 hover:border-gray-400"
            )}
            aria-pressed={isSelected}
          >
            <div className="font-medium text-[12px] mb-0">{size.name}</div>
            <div className={cn(
              "text-[10px]",
              isSelected ? "text-white/70" : "text-gray-500"
            )}>
              {size.width} × {size.height} in
            </div>
            <div className={cn(
              "text-[11px] font-medium",
              isSelected ? "text-white" : "text-primary"
            )}>
              {formatPrice(size.price)}
            </div>
          </button>
        );
      })}
    </div>
  );
}
