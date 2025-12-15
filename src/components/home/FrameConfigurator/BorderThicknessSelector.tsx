"use client";

import { BorderThickness } from "@/types";

interface BorderThicknessSelectorProps {
  borderThicknesses: BorderThickness[];
  selectedBorderThickness: BorderThickness | null;
  onSelect: (borderThickness: BorderThickness) => void;
}

export default function BorderThicknessSelector({
  borderThicknesses,
  selectedBorderThickness,
  onSelect,
}: BorderThicknessSelectorProps) {
  return (
    <div className="flex gap-1.5">
      {borderThicknesses.map((border) => {
        const isSelected = selectedBorderThickness?.id === border.id;
        return (
          <button
            key={border.id}
            onClick={() => onSelect(border)}
            className={`flex-1 py-1.5 px-2 border transition-all text-center ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-primary hover:border-gray-400"
            }`}
          >
            <span className="text-[11px]">{border.name}</span>
          </button>
        );
      })}
    </div>
  );
}
