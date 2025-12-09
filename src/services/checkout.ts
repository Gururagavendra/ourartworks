import { wordpressApi } from "./api";
import { CartItem } from "./cart";

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateOrderParams {
  shipping: ShippingDetails;
  cartItems: CartItem[];
  total: number;
  paymentMethod?: "cod" | "razorpay";
}

export interface OrderResponse {
  success: boolean;
  order_id: number;
  razorpay_order_id: string;
  razorpay_amount: number;
}

export interface VerifyPaymentParams {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  order_id: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order_status: string;
}

/**
 * Create order and get Razorpay order ID
 */
export async function createOrder(params: CreateOrderParams): Promise<OrderResponse> {
  return wordpressApi.post("/checkout/create-order", {
    shipping: {
      first_name: params.shipping.firstName,
      last_name: params.shipping.lastName,
      email: params.shipping.email,
      phone: params.shipping.phone,
      address: params.shipping.address,
      city: params.shipping.city,
      state: params.shipping.state,
      pincode: params.shipping.pincode,
    },
    cart_items: params.cartItems,
    total: params.total,
    payment_method: params.paymentMethod || "cod",
  });
}

/**
 * Verify Razorpay payment
 */
export async function verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResponse> {
  return wordpressApi.post("/checkout/verify-payment", params);
}

/**
 * Get order details
 */
export async function getOrder(orderId: number): Promise<{ order: unknown }> {
  return wordpressApi.get(`/orders/${orderId}`);
}
