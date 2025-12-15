"use client";

import { Orientation } from "@/types";
import { cn } from "@/utils/helpers";

interface OrientationToggleProps {
  orientation: Orientation;
  onChange: (orientation: Orientation) => void;
}

export default function OrientationToggle({
  orientation,
  onChange,
}: OrientationToggleProps) {
  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => onChange("portrait")}
        className={cn(
          "flex-1 py-1.5 text-[11px] transition-all duration-200",
          "focus:outline-none border",
          orientation === "portrait"
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary border-gray-200 hover:border-gray-400"
        )}
        aria-pressed={orientation === "portrait"}
      >
        Portrait
      </button>
      <button
        onClick={() => onChange("landscape")}
        className={cn(
          "flex-1 py-1.5 text-[11px] transition-all duration-200",
          "focus:outline-none border",
          orientation === "landscape"
            ? "bg-primary text-white border-primary"
            : "bg-white text-primary border-gray-200 hover:border-gray-400"
        )}
        aria-pressed={orientation === "landscape"}
      >
        Landscape
      </button>
    </div>
  );
}
