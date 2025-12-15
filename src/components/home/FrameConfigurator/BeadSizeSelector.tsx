"use client";

import { BeadSize } from "@/types";
import { formatPrice } from "@/utils/helpers";

interface BeadSizeSelectorProps {
  beadSizes: BeadSize[];
  selectedBeadSize: BeadSize | null;
  onSelect: (beadSize: BeadSize) => void;
}

export default function BeadSizeSelector({
  beadSizes,
  selectedBeadSize,
  onSelect,
}: BeadSizeSelectorProps) {
  return (
    <div className="flex gap-1.5">
      {beadSizes.map((bead) => {
        const isSelected = selectedBeadSize?.id === bead.id;
        return (
          <button
            key={bead.id}
            onClick={() => onSelect(bead)}
            className={`flex-1 py-1.5 px-2 border transition-all text-center ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-primary hover:border-gray-400"
            }`}
          >
            <span className="text-[11px]">{bead.name}</span>
            {bead.priceAddon > 0 && (
              <span className={`text-[10px] ml-1 ${isSelected ? "text-white/70" : "text-gray-500"}`}>
                +{formatPrice(bead.priceAddon)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
