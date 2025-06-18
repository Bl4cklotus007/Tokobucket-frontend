import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import TestimonialsSection from "@/components/TestimonialsSection";
import CustomCTASection from "@/components/CustomCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProductCategories />
        <FeaturedProducts />
        <TestimonialsSection />
        <CustomCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
