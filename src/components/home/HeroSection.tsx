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
      
      {/* Darker overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-[700px] px-5">
        <h2 className="text-[24px] md:text-[32px] font-medium tracking-wide mb-4">
          Custom Frames, Crafted for Your Moments
        </h2>
        <p className="text-[16px] text-white/80 mb-12 leading-relaxed">
          Premium handcrafted photo frames, customized to perfection. Made in India
          <br />with love.
        </p>
        <Button 
          variant="secondary" 
          size="lg"
          className="bg-white text-black font-semibold hover:bg-black hover:text-white px-4 py-3 border-2 border-white transition-all duration-300"
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
