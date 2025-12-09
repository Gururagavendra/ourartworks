import { wordpressApi } from "./api";
import { FrameSize, FrameColor, FrameOptions } from "@/types";

/**
 * Fetch all frame options (sizes + colors) from WordPress API
 */
export async function getFrameOptions(): Promise<FrameOptions> {
  try {
    return await wordpressApi.get<FrameOptions>("/frame-options");
  } catch (error) {
    console.error("Failed to fetch frame options:", error);
    return {
      sizes: getDefaultFrameSizes(),
      colors: getDefaultFrameColors(),
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
    { id: 1, name: "4×6", width: 4, height: 6, unit: "inches", price: 499, isActive: true, displayOrder: 1 },
    { id: 2, name: "5×7", width: 5, height: 7, unit: "inches", price: 699, isActive: true, displayOrder: 2 },
    { id: 3, name: "6×8", width: 6, height: 8, unit: "inches", price: 899, isActive: true, displayOrder: 3 },
    { id: 4, name: "8×10", width: 8, height: 10, unit: "inches", price: 1199, isActive: true, displayOrder: 4 },
    { id: 5, name: "8×12", width: 8, height: 12, unit: "inches", price: 1399, isActive: true, displayOrder: 5 },
    { id: 6, name: "10×12", width: 10, height: 12, unit: "inches", price: 1599, isActive: true, displayOrder: 6 },
    { id: 7, name: "12×15", width: 12, height: 15, unit: "inches", price: 1999, isActive: true, displayOrder: 7 },
    { id: 8, name: "12×18", width: 12, height: 18, unit: "inches", price: 2299, isActive: true, displayOrder: 8 },
    { id: 9, name: "16×20", width: 16, height: 20, unit: "inches", price: 2999, isActive: true, displayOrder: 9 },
    { id: 10, name: "16×24", width: 16, height: 24, unit: "inches", price: 3499, isActive: true, displayOrder: 10 },
    { id: 11, name: "18×24", width: 18, height: 24, unit: "inches", price: 3999, isActive: true, displayOrder: 11 },
    { id: 12, name: "20×30", width: 20, height: 30, unit: "inches", price: 4999, isActive: true, displayOrder: 12 },
    { id: 13, name: "24×36", width: 24, height: 36, unit: "inches", price: 5999, isActive: true, displayOrder: 13 },
  ];
}

/**
 * Default frame colors (fallback when API is unavailable)
 */
export function getDefaultFrameColors(): FrameColor[] {
  return [
    { id: 1, name: "Walnut Brown", hexCode: "#5D4037", imageUrl: null, isActive: true, displayOrder: 1 },
    { id: 2, name: "Mahogany", hexCode: "#4E342E", imageUrl: null, isActive: true, displayOrder: 2 },
    { id: 3, name: "Classic Black", hexCode: "#212121", imageUrl: null, isActive: true, displayOrder: 3 },
    { id: 4, name: "Pure White", hexCode: "#FAFAFA", imageUrl: null, isActive: true, displayOrder: 4 },
    { id: 5, name: "Natural Oak", hexCode: "#D7CCC8", imageUrl: null, isActive: true, displayOrder: 5 },
    { id: 6, name: "Gold", hexCode: "#C9A227", imageUrl: null, isActive: true, displayOrder: 6 },
    { id: 7, name: "Silver", hexCode: "#9E9E9E", imageUrl: null, isActive: true, displayOrder: 7 },
    { id: 8, name: "Cherry", hexCode: "#8B0000", imageUrl: null, isActive: true, displayOrder: 8 },
  ];
}
