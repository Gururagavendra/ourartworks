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
    <div className="flex gap-0">
      <button
        onClick={() => onChange("portrait")}
        className={cn(
          "flex-1 py-2 px-6 text-small rounded-button transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          orientation === "portrait"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-border hover:bg-background-secondary"
        )}
        aria-pressed={orientation === "portrait"}
      >
        Portrait
      </button>
      <button
        onClick={() => onChange("landscape")}
        className={cn(
          "flex-1 py-2 px-6 text-small rounded-button transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          orientation === "landscape"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-border hover:bg-background-secondary"
        )}
        aria-pressed={orientation === "landscape"}
      >
        Landscape
      </button>
    </div>
  );
}
