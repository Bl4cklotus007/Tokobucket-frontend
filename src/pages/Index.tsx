import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import TestimonialsSection from "@/components/TestimonialsSection";
import CustomCTASection from "@/components/CustomCTASection";

const Index = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProductCategories />
        <TestimonialsSection />
        <CustomCTASection />
      </main>
      <ProductCategories mode="bar" className="fixed bottom-0 left-0 right-0 z-50 md:hidden" />
      <Footer />
    </div>
  );
};

export default Index;
