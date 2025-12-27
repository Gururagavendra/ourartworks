import { wordpressApi } from "./api";
import { FrameSize, FrameColor, FrameOptions, BeadSize, BorderThickness } from "@/types";

/**
 * Fetch all frame options (sizes + colors + bead sizes + border thicknesses) from WordPress API
 */
export async function getFrameOptions(): Promise<FrameOptions> {
  try {
    return await wordpressApi.get<FrameOptions>("/frame-options");
  } catch (error) {
    console.error("Failed to fetch frame options:", error);
    return {
      sizes: getDefaultFrameSizes(),
      colors: getDefaultFrameColors(),
      beadSizes: getDefaultBeadSizes(),
      borderThicknesses: getDefaultBorderThicknesses(),
    };
  }
}

/**
 * Fetch all frame sizes from WordPress API
 */
export async function getFrameSizes(): Promise<FrameSize[]> {
  try {
    return await wordpressApi.get<FrameSize[]>("/sizes");
  } catch (error) {
    console.error("Failed to fetch frame sizes:", error);
    return getDefaultFrameSizes();
  }
}

/**
 * Fetch all frame colors from WordPress API
 */
export async function getFrameColors(): Promise<FrameColor[]> {
  try {
    return await wordpressApi.get<FrameColor[]>("/colors");
  } catch (error) {
    console.error("Failed to fetch frame colors:", error);
    return getDefaultFrameColors();
  }
}

/**
 * Default frame sizes (fallback when API is unavailable)
 */
export function getDefaultFrameSizes(): FrameSize[] {
  return [
    { id: 1, name: "12×8", width: 12, height: 8, unit: "inches", price: 499, isActive: true, displayOrder: 1 },
    { id: 2, name: "12×18", width: 12, height: 18, unit: "inches", price: 799, isActive: true, displayOrder: 2 },
    { id: 3, name: "16×24", width: 16, height: 24, unit: "inches", price: 1299, isActive: true, displayOrder: 3 },
    { id: 4, name: "20×30", width: 20, height: 30, unit: "inches", price: 1999, isActive: true, displayOrder: 4 },
  ];
}

/**
 * Default frame colors (fallback when API is unavailable)
 */
export function getDefaultFrameColors(): FrameColor[] {
  return [
    { id: 1, name: "Black", hexCode: "#212121", imageUrl: null, isActive: true, displayOrder: 1 },
    { id: 2, name: "White", hexCode: "#FAFAFA", imageUrl: null, isActive: true, displayOrder: 2 },
    { id: 3, name: "Brown", hexCode: "#8B4513", imageUrl: null, isActive: true, displayOrder: 4 },
  ];
}

/**
 * Default bead sizes (fallback when API is unavailable)
 */
export function getDefaultBeadSizes(): BeadSize[] {
  return [
    { id: 1, name: "1 inch", priceAddon: 0, isDefault: true, displayOrder: 1 },
    { id: 2, name: "1.5 inch", priceAddon: 150, isDefault: false, displayOrder: 2 },
  ];
}

/**
 * Default border thicknesses (fallback when API is unavailable)
 */
export function getDefaultBorderThicknesses(): BorderThickness[] {
  return [
    { id: 1, name: "0.5 inch", priceAddon: 0, isDefault: false, displayOrder: 1 },
    { id: 2, name: "1 inch", priceAddon: 0, isDefault: true, displayOrder: 2 },
    { id: 3, name: "1.5 inch", priceAddon: 0, isDefault: false, displayOrder: 3 },
  ];
}
