"use client";

import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Full coverage */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      />
      
      {/* Lighter overlay for better visibility while keeping image bright */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-[600px] px-5">
        <h1 className="text-[54px] leading-none tracking-tight mb-4">OAW</h1>
        <h2 className="text-[27px] font-normal tracking-wide mb-4">
          Custom Frames, Crafted for Your Moments
        </h2>
        <p className="text-[15px] text-white/80 mb-10 leading-relaxed">
          Premium handcrafted photo frames, customized to perfection. Made in India
          <br />with love.
        </p>
        <Button 
          variant="secondary" 
          size="lg"
          className="bg-white text-black hover:bg-white/90 px-8 py-4 border-0"
          onClick={() => {
            document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Start Customizing
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[18px] h-[30px] border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-[3px] h-[9px] bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
