"use client";

import { useState } from "react";
import { Testimonial } from "@/types";
import { Play } from "lucide-react";

const individualTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "/images/testimonials/priya.png",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    image: "/images/testimonials/rahul.png",
    hasVideo: true,
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    image: "/images/testimonials/ananya.png",
    hasVideo: true,
  },
  {
    id: 4,
    name: "Arjun Singh",
    location: "Pune",
    image: "/images/testimonials/arjun.png",
    hasVideo: true,
  },
];

const corporateTestimonials: Testimonial[] = [
  {
    id: 5,
    name: "Tech Corp",
    location: "Hyderabad",
    image: "/images/testimonials/priya.png",
  },
  {
    id: 6,
    name: "Design Studio",
    location: "Chennai",
    image: "/images/testimonials/rahul.png",
  },
  {
    id: 7,
    name: "Event Planners",
    location: "Kolkata",
    image: "/images/testimonials/ananya.png",
  },
  {
    id: 8,
    name: "Photo Studio",
    location: "Jaipur",
    image: "/images/testimonials/arjun.png",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<"individual" | "corporate">("individual");
  
  const testimonials = activeTab === "individual" ? individualTestimonials : corporateTestimonials;

  return (
    <section className="py-24 bg-primary">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[2.20rem] font-bold leading-tight text-white mb-2">
            What Our Customers Say
          </h2>
          <p className="text-[14px] text-white/70">
            Real stories from customers who love their OAW frames
          </p>
        </div>
        
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab("individual")}
              className={`px-4 py-2 text-[13px] transition-all duration-300 flex items-center gap-2 rounded-full ${
                activeTab === "individual"
                  ? "bg-transparent text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                activeTab === "individual" ? "border-white bg-white" : "border-white/60"
              }`}>
                {activeTab === "individual" && (
                  <span className="block w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              Individual Customers
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`px-4 py-2 text-[13px] transition-all duration-300 flex items-center gap-2 rounded-full ${
                activeTab === "corporate"
                  ? "bg-transparent text-white"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                activeTab === "corporate" ? "border-white bg-white" : "border-white/60"
              }`}>
                {activeTab === "corporate" && (
                  <span className="block w-2 h-2 rounded-full bg-primary" />
                )}
              </span>
              Bulk / Corporate Clients
            </button>
          </div>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative group overflow-hidden rounded-lg cursor-pointer">
      {/* Image */}
      <div 
        className="w-full aspect-[2/4] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${testimonial.image})`,
          backgroundColor: "#333",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Play Button (only for videos) */}
      {testimonial.hasVideo && (
        <button 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-300 shadow-lg group-hover:opacity-100 opacity-90"
          aria-label={`Play testimonial from ${testimonial.name}`}
        >
          <Play size={22} className="text-primary ml-1" fill="currentColor" />
        </button>
      )}
      
      {/* Info */}
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className="text-[14px] font-semibold">
          {testimonial.name}
        </h4>
        <p className="text-[12px] text-white/70">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
}
