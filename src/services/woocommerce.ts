import { wooCommerceApi } from "./api";
import { CartItem, OrderStatus } from "@/types";

/**
 * Add item to WooCommerce cart
 */
export async function addToCart(item: CartItem): Promise<unknown> {
  return wooCommerceApi.post("/cart/add-item", {
    id: item.productId,
    quantity: item.quantity,
    meta_data: {
      frame_size: item.frameSize,
      frame_color: item.frameColor,
      orientation: item.orientation,
      customer_image: item.customerImage,
    },
  });
}

/**
 * Get current cart
 */
export async function getCart(): Promise<unknown> {
  return wooCommerceApi.get("/cart");
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(key: string, quantity: number): Promise<unknown> {
  return wooCommerceApi.post("/cart/update-item", {
    key,
    quantity,
  });
}

/**
 * Remove item from cart
 */
export async function removeCartItem(key: string): Promise<unknown> {
  return wooCommerceApi.post("/cart/remove-item", {
    key,
  });
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<unknown> {
  return wooCommerceApi.post("/cart/clear", {});
}

/**
 * Track order by Order ID
 */
export async function trackOrder(orderId: string): Promise<OrderStatus> {
  // This will need a custom endpoint in WordPress
  // For now, return mock data
  return {
    orderId,
    status: "processing",
    estimatedDelivery: "5-7 business days",
  };
}

/**
 * Get cart items count
 */
export async function getCartCount(): Promise<number> {
  try {
    const cart = await getCart() as { items_count?: number };
    return cart.items_count || 0;
  } catch {
    return 0;
  }
}
