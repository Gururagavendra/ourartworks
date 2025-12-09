"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, Cart } from "@/services/cart";
import { createOrder, verifyPayment } from "@/services/checkout";
import { formatPrice } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowLeft, Lock, CreditCard, Truck, CheckCircle, Banknote } from "lucide-react";

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type PaymentMethod = "cod" | "razorpay";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  useEffect(() => {
    fetchCart();
    loadRazorpay();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      if (!cartData || cartData.items.length === 0) {
        router.push("/cart");
        return;
      }
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      router.push("/cart");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<ShippingDetails> = {};

    if (!shippingDetails.firstName.trim()) newErrors.firstName = "First name is required";
    if (!shippingDetails.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!shippingDetails.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!shippingDetails.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(shippingDetails.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!shippingDetails.address.trim()) newErrors.address = "Address is required";
    if (!shippingDetails.city.trim()) newErrors.city = "City is required";
    if (!shippingDetails.state.trim()) newErrors.state = "State is required";
    if (!shippingDetails.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(shippingDetails.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!cart) return;

    setProcessing(true);
    try {
      // Create order in backend
      const orderResponse = await createOrder({
        shipping: shippingDetails,
        cartItems: cart.items,
        total: cart.total,
        paymentMethod: paymentMethod,
      });

      // If COD, just mark success
      if (paymentMethod === "cod") {
        setOrderId(orderResponse.order_id);
        setStep("success");
        // Clear cart
        window.dispatchEvent(new CustomEvent("cart-updated", { detail: { items: [], itemCount: 0 } }));
        return;
      }

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderResponse.razorpay_amount,
        currency: "INR",
        name: "OurArtworks",
        description: "Custom Photo Frames",
        order_id: orderResponse.razorpay_order_id,
        handler: async (response: RazorpayResponse) => {
          // Verify payment
          try {
            await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderResponse.order_id,
            });
            setStep("success");
            // Clear cart
            window.dispatchEvent(new CustomEvent("cart-updated", { detail: { items: [], itemCount: 0 } }));
          } catch {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#1A1A1A",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text">Loading checkout...</div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-[36px] font-normal text-primary mb-4">Order Confirmed!</h1>
          {orderId && (
            <p className="text-body-lg text-primary mb-2">Order #{orderId}</p>
          )}
          <p className="text-body text-text mb-4">
            Thank you for your order. We&apos;ve sent a confirmation email to {shippingDetails.email}.
          </p>
          {paymentMethod === "cod" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 font-medium">Cash on Delivery</p>
              <p className="text-amber-700 text-small">
                Please keep {formatPrice(cart?.total || 0)} ready at the time of delivery.
              </p>
            </div>
          )}
          <p className="text-body text-text mb-8">
            Your custom frames will be crafted with care and shipped soon.
          </p>
          <Link href="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Back Link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-text hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="text-[36px] font-normal text-primary mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step === "shipping" ? "text-primary" : "text-green-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "shipping" ? "bg-primary text-white" : "bg-green-500 text-white"
            }`}>
              {step === "shipping" ? "1" : <CheckCircle size={16} />}
            </div>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-text-light"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "payment" ? "bg-primary text-white" : "bg-gray-200 text-text-light"
            }`}>
              2
            </div>
            <span className="font-medium">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={24} className="text-primary" />
                  <h2 className="text-heading-2 text-primary">Shipping Details</h2>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingDetails.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.firstName ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-small mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingDetails.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.lastName ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-small mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingDetails.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.email ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-small mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingDetails.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.phone ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-small mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-small font-medium text-text mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Street, Landmark"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.address ? "border-red-500" : "border-border"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-small mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.city ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-small mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.state ? "border-red-500" : "border-border"
                        }`}
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.state && (
                        <p className="text-red-500 text-small mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-small font-medium text-text mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingDetails.pincode}
                        onChange={handleInputChange}
                        maxLength={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.pincode ? "border-red-500" : "border-border"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-small mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" fullWidth>
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {step === "payment" && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={24} className="text-primary" />
                  <h2 className="text-heading-2 text-primary">Payment</h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-primary mb-2">Shipping to:</h3>
                  <p className="text-text">
                    {shippingDetails.firstName} {shippingDetails.lastName}<br />
                    {shippingDetails.address}<br />
                    {shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}<br />
                    Phone: {shippingDetails.phone}
                  </p>
                  <button
                    onClick={() => setStep("shipping")}
                    className="text-primary underline text-small mt-2"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-medium text-primary mb-3">Select Payment Method</h3>
                  
                  {/* COD Option */}
                  <label 
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-primary"
                    />
                    <Banknote size={24} className="text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-primary">Cash on Delivery</p>
                      <p className="text-small text-text-light">
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>

                  {/* Razorpay Option */}
                  <label 
                    className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "razorpay" ? "border-primary bg-primary/5" : "border-border hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="w-4 h-4 text-primary"
                    />
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <CreditCard size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-primary">Pay Online (Razorpay)</p>
                      <p className="text-small text-text-light">
                        UPI, Cards, Net Banking, Wallets
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-2 text-small text-text-light mb-6">
                  <Lock size={14} />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handlePayment}
                    disabled={processing}
                    className="flex-1"
                  >
                    {processing ? "Processing..." : paymentMethod === "cod" ? "Place Order (COD)" : `Pay ${formatPrice(cart?.total || 0)}`}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-heading-2 text-primary mb-6">Order Summary</h2>

              {cart && (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.items.map((item) => (
                      <div key={item.key} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <div
                            className="w-12 h-12 border-4 rounded"
                            style={{ borderColor: item.frame?.colorHex || "#1A1A1A" }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-primary text-small">
                            Custom Photo Frame
                          </p>
                          <p className="text-small text-text-light">
                            {item.frame?.sizeName} • {item.frame?.colorName}
                          </p>
                          <p className="text-small text-text-light">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-primary">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-body">
                      <span className="text-text">Subtotal</span>
                      <span className="text-primary">{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-body">
                      <span className="text-text">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-body-lg font-medium">
                      <span className="text-primary">Total</span>
                      <span className="text-primary">{formatPrice(cart.total)}</span>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
