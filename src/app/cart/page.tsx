"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart, updateCartItem, Cart, CartItem } from "@/services/cart";
import { formatPrice } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemKey: string) => {
    setUpdating(cartItemKey);
    try {
      const result = await removeFromCart(cartItemKey);
      setCart(result.cart);
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: result.cart }));
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleQuantityChange = async (cartItemKey: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdating(cartItemKey);
    try {
      const result = await updateCartItem(cartItemKey, newQuantity);
      setCart(result.cart);
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: result.cart }));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleCheckout = () => {
    // Redirect to our custom checkout page
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-text hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="text-[36px] font-normal text-primary mb-8">Your Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag size={48} className="mx-auto text-text-light mb-4" />
            <h2 className="text-heading-2 text-primary mb-2">Your cart is empty</h2>
            <p className="text-text mb-6">Add some beautiful frames to get started!</p>
            <Link href="/#configurator">
              <Button variant="primary">Start Customizing</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <CartItemCard
                  key={item.key}
                  item={item}
                  updating={updating === item.key}
                  onRemove={() => handleRemove(item.key)}
                  onQuantityChange={(qty) => handleQuantityChange(item.key, qty)}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-heading-2 text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-body">
                    <span className="text-text">Subtotal</span>
                    <span className="text-primary">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-body">
                    <span className="text-text">Shipping</span>
                    <span className="text-text-light">Calculated at checkout</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-body-lg font-medium">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">{formatPrice(cart.total)}</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={handleCheckout}
                  className="mb-3"
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-small text-text-light text-center">
                  Secure checkout powered by Razorpay
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItemCard({ 
  item, 
  updating, 
  onRemove, 
  onQuantityChange 
}: { 
  item: CartItem; 
  updating: boolean;
  onRemove: () => void;
  onQuantityChange: (qty: number) => void;
}) {
  const frame = item.frame;

  return (
    <Card variant="bordered" className={`p-4 ${updating ? 'opacity-50' : ''}`}>
      <div className="flex gap-4">
        {/* Frame Preview */}
        <div 
          className="w-20 h-20 rounded flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: frame?.colorHex || '#212121' }}
        >
          {frame?.uploadedImage ? (
            <img 
              src={frame.uploadedImage} 
              alt="Frame preview" 
              className="w-14 h-14 object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-white" />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-body-lg text-primary font-medium">Custom Photo Frame</h3>
          {frame && (
            <div className="text-small text-text mt-1 space-y-0.5">
              <p>Size: {frame.sizeName} ({frame.dimensions})</p>
              <p>Color: {frame.colorName}</p>
              <p>Orientation: {frame.orientation}</p>
              {frame.isBulkOrder && (
                <p className="text-accent">Bulk Order</p>
              )}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-end justify-between">
          <p className="text-body-lg text-primary font-medium">
            {formatPrice(item.subtotal)}
          </p>
          
          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-border rounded">
              <button 
                onClick={() => onQuantityChange(item.quantity - 1)}
                disabled={updating || item.quantity <= 1}
                className="p-1.5 hover:bg-background-secondary disabled:opacity-50"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 text-small">{item.quantity}</span>
              <button 
                onClick={() => onQuantityChange(item.quantity + 1)}
                disabled={updating}
                className="p-1.5 hover:bg-background-secondary disabled:opacity-50"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Remove */}
            <button 
              onClick={onRemove}
              disabled={updating}
              className="p-2 text-text-light hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
