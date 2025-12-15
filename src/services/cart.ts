import { wordpressApi } from "./api";

export interface CartItem {
  key: string;
  quantity: number;
  price: number;
  subtotal: number;
  frame?: {
    sizeId: number;
    sizeName: string;
    dimensions: string;
    colorId: number;
    colorName: string;
    colorHex: string;
    beadSizeId: number;
    beadSizeName: string;
    borderThicknessId: number;
    borderThicknessName: string;
    orientation: string;
    uploadedImage: string | null;
    isBulkOrder: boolean;
  };
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  currency: string;
  currencySymbol: string;
}

export interface AddToCartParams {
  sizeId: number;
  colorId: number;
  beadSizeId: number;
  borderThicknessId: number;
  orientation: string;
  quantity?: number;
  uploadedImage?: string | null;
  isBulkOrder?: boolean;
  price: number;
  sizeName: string;
  dimensions: string;
  colorName: string;
  colorHex: string;
  beadSizeName: string;
  borderThicknessName: string;
}

const CART_STORAGE_KEY = "oaw_cart";

/**
 * Get cart from localStorage
 */
function getLocalCart(): Cart {
  if (typeof window === "undefined") {
    return createEmptyCart();
  }
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return createEmptyCart();
}

/**
 * Save cart to localStorage
 */
function saveLocalCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Create empty cart
 */
function createEmptyCart(): Cart {
  return {
    items: [],
    itemCount: 0,
    subtotal: 0,
    total: 0,
    currency: "INR",
    currencySymbol: "₹",
  };
}

/**
 * Generate unique cart item key
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * Add frame to cart (localStorage)
 */
export async function addToCart(params: AddToCartParams): Promise<{ success: boolean; cart: Cart }> {
  const cart = getLocalCart();
  
  // Check if item with same specs exists
  const existingIndex = cart.items.findIndex(
    (item) =>
      item.frame?.sizeId === params.sizeId &&
      item.frame?.colorId === params.colorId &&
      item.frame?.beadSizeId === params.beadSizeId &&
      item.frame?.borderThicknessId === params.borderThicknessId &&
      item.frame?.orientation === params.orientation
  );

  if (existingIndex >= 0) {
    // Update quantity
    cart.items[existingIndex].quantity += params.quantity || 1;
    cart.items[existingIndex].subtotal = cart.items[existingIndex].quantity * cart.items[existingIndex].price;
  } else {
    // Add new item
    const newItem: CartItem = {
      key: generateKey(),
      quantity: params.quantity || 1,
      price: params.price,
      subtotal: params.price * (params.quantity || 1),
      frame: {
        sizeId: params.sizeId,
        sizeName: params.sizeName,
        dimensions: params.dimensions,
        colorId: params.colorId,
        colorName: params.colorName,
        colorHex: params.colorHex,
        beadSizeId: params.beadSizeId,
        beadSizeName: params.beadSizeName,
        borderThicknessId: params.borderThicknessId,
        borderThicknessName: params.borderThicknessName,
        orientation: params.orientation,
        uploadedImage: params.uploadedImage || null,
        isBulkOrder: params.isBulkOrder || false,
      },
    };
    cart.items.push(newItem);
  }

  // Recalculate totals
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.total = cart.subtotal;

  saveLocalCart(cart);

  return { success: true, cart };
}

/**
 * Get cart contents (localStorage)
 */
export async function getCart(): Promise<Cart> {
  return getLocalCart();
}

/**
 * Remove item from cart (localStorage)
 */
export async function removeFromCart(cartItemKey: string): Promise<{ success: boolean; cart: Cart }> {
  const cart = getLocalCart();
  cart.items = cart.items.filter((item) => item.key !== cartItemKey);

  // Recalculate totals
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.total = cart.subtotal;

  saveLocalCart(cart);

  return { success: true, cart };
}

/**
 * Update cart item quantity (localStorage)
 */
export async function updateCartItem(cartItemKey: string, quantity: number): Promise<{ success: boolean; cart: Cart }> {
  const cart = getLocalCart();
  const item = cart.items.find((item) => item.key === cartItemKey);

  if (item) {
    item.quantity = quantity;
    item.subtotal = item.price * quantity;
  }

  // Recalculate totals
  cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.total = cart.subtotal;

  saveLocalCart(cart);

  return { success: true, cart };
}

/**
 * Clear cart (localStorage)
 */
export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

/**
 * Sync cart to WordPress for checkout
 */
export async function syncCartToWordPress(): Promise<void> {
  const cart = getLocalCart();
  for (const item of cart.items) {
    if (item.frame) {
      await wordpressApi.post("/cart/add", {
        size_id: item.frame.sizeId,
        color_id: item.frame.colorId,
        orientation: item.frame.orientation,
        quantity: item.quantity,
        uploaded_image: item.frame.uploadedImage,
        is_bulk_order: item.frame.isBulkOrder,
      });
    }
  }
}