"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { getCart, Cart } from "@/services/cart";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCartCount(cart.itemCount);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    
    fetchCart();
    
    // Listen for cart updates
    const handleCartUpdate = (event: CustomEvent<Cart>) => {
      setCartCount(event.detail.itemCount);
    };
    
    window.addEventListener('cart-updated', handleCartUpdate as EventListener);
    return () => window.removeEventListener('cart-updated', handleCartUpdate as EventListener);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-sm py-3" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo - appears on scroll */}
        <Link 
          href="/" 
          className={`transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image 
            src="/images/logo.svg" 
            alt="Our Art Works" 
            width={50} 
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        {/* Cart Button */}
        <Link href="/cart">
          <Button 
            variant={isScrolled ? "primary" : "primary"} 
            size="sm" 
            className={`gap-2 ${
              isScrolled 
                ? "bg-primary text-white" 
                : "bg-black text-white"
            }`}
          >
            <ShoppingCart size={14} />
            <span>Cart ({cartCount})</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
