import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Gift } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-pastel-pink/20 via-pastel-purple/20 to-pastel-blue/20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pastel-pink/30 rounded-full animate-float" />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-pastel-purple/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-pastel-blue/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-40 w-24 h-24 bg-pastel-mint/30 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-pastel-pink/20 to-pastel-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-pastel-blue/20 to-pastel-mint/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-graduate-600 to-decoration-600 bg-clip-text text-transparent">
                Bucket Wisuda
              </span>
              <br />
              <span className="text-gray-800">Eksklusif</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Wujudkan momen wisuda yang tak terlupakan dengan bucket bunga
              eksklusif dan dekorasi istimewa. Dibuat dengan cinta dan sentuhan
              personal untuk hari spesial Anda.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-pastel-purple/30">
                <Gift className="h-4 w-4 text-graduate-600" />
                <span className="text-sm font-medium text-gray-700">
                  Custom Design
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-pastel-blue/30">
                <Heart className="h-4 w-4 text-decoration-600" />
                <span className="text-sm font-medium text-gray-700">
                  Bunga Fresh
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/katalog" className="flex items-center space-x-2">
                  <span>Lihat Produk</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-graduate-600 text-graduate-600 hover:bg-graduate-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                <Link to="/pesan">Pesan Custom</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-pastel-pink/30">
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-bold text-xl text-graduate-600">
                    500+
                  </div>
                  <div>Pelanggan Puas</div>
                </div>
                <div className="w-px h-8 bg-pastel-pink/30" />
                <div className="text-center">
                  <div className="font-bold text-xl text-graduate-600">
                    1000+
                  </div>
                  <div>Bucket Terjual</div>
                </div>
                <div className="w-px h-8 bg-pastel-pink/30" />
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div>Rating 5.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main product image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-white to-pastel-pink/20 rounded-3xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm">
                <div className="w-full h-full bg-gradient-to-br from-pastel-pink/40 to-pastel-purple/40 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-graduate-500 to-decoration-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Gift className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Bucket Wisuda Premium
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Bunga segar & dekorasi eksklusif
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg p-4 z-20 animate-bounce-gentle">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pastel-mint to-pastel-blue rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Fresh Flowers
                  </div>
                  <div className="text-xs text-gray-500">
                    Bunga segar pilihan
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 z-20 animate-bounce-gentle"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Premium Quality
                  </div>
                  <div className="text-xs text-gray-500">Kualitas terjamin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
