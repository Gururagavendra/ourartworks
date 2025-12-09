import { Testimonial } from "@/types";
import { Play } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "/images/testimonials/priya.png",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi",
    image: "/images/testimonials/rahul.png",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    image: "/images/testimonials/ananya.png",
  },
  {
    id: 4,
    name: "Arjun Singh",
    location: "Pune",
    image: "/images/testimonials/arjun.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[45px] leading-tight tracking-tight text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-[15px] text-white/80">
            Real stories from customers who love their OAW frames
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="relative group rounded-card overflow-hidden bg-white border border-border">
      {/* Image */}
      <div 
        className="w-full aspect-[231/410] bg-cover bg-center"
        style={{
          backgroundImage: `url(${testimonial.image})`,
          backgroundColor: "#ddd",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Play Button */}
      <button 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group-hover:scale-110"
        aria-label={`Play testimonial from ${testimonial.name}`}
      >
        <Play size={24} className="text-primary ml-1" fill="currentColor" />
      </button>
      
      {/* Info */}
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className="text-[12px] font-normal tracking-tight">
          {testimonial.name}
        </h4>
        <p className="text-small text-white/80">
          {testimonial.location}
        </p>
      </div>
    </div>
  );
}
