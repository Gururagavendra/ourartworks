export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-[800px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-[2.20rem] font-bold leading-tight text-black mb-2">About OAW</h2>
            
            <div className="space-y-6 text-text">
              <p className="text-[12px] leading-relaxed">
                OAW brings you premium, handcrafted photo frames that celebrate your
                most cherished memories. Each frame is meticulously crafted in India by
                skilled artisans who understand the value of quality.
              </p>
              
              <p className="text-[12px] leading-relaxed">
                We believe every moment deserves a frame as special as the memory it
                holds. That&apos;s why we offer complete customization—from color and size to
                orientation—ensuring your frame is perfectly tailored to your vision.
              </p>
              
              <p className="text-[12px] font-medium text-primary">
                Made in India. Crafted with precision. Designed for you.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[380px] aspect-[4/5] bg-gray-200 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/craftsmanship.png')",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
