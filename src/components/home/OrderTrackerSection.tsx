"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { isValidOrderId } from "@/utils/helpers";

export default function OrderTrackerSection() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    setError("");
    
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }
    
    if (!isValidOrderId(orderId.trim())) {
      setError("Please enter a valid order ID (e.g., OAW12345678)");
      return;
    }
    
    setIsLoading(true);
    
    // TODO: Implement actual tracking API call
    setTimeout(() => {
      setIsLoading(false);
      // For now, just show a message
      alert(`Tracking order: ${orderId}`);
    }, 1000);
  };

  return (
    <section id="track" className="py-24 bg-white">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-[45px] leading-tight tracking-tight text-primary mb-3">
          Track Your Order
        </h2>
        <p className="text-[15px] text-text mb-8">
          Enter your order ID to check the status
        </p>
        
        {/* Form Card */}
        <Card variant="bordered" className="p-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                id="order-id"
                label="Order ID"
                placeholder="Enter your order ID (e.g., OAW12345678)"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                  setError("");
                }}
                error={error}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleTrack}
                disabled={isLoading}
                className="h-[30px]"
              >
                {isLoading ? "..." : "Track"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
