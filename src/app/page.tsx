import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FrameConfigurator from "@/components/home/FrameConfigurator";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import OrderTrackerSection from "@/components/home/OrderTrackerSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FrameConfigurator />
        <TestimonialsSection />
        <OrderTrackerSection />
      </main>
      <Footer />
    </>
  );
}
