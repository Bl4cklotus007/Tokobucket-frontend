import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

const CustomCTASection = () => {
  const features = [
    {
      icon: Palette,
      title: "Design Sesuai Selera",
      description:
        "Pilih warna, bunga, dan style yang sesuai dengan kepribadian Anda",
    },
    {
      icon: MessageCircle,
      title: "Konsultasi Gratis",
      description:
        "Tim desainer kami siap membantu mewujudkan ide kreatif Anda",
    },
    {
      icon: Sparkles,
      title: "Kualitas Premium",
      description:
        "Menggunakan bunga segar pilihan dan material dekorasi berkualitas tinggi",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-graduate-50 via-white to-decoration-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pastel-pink/20 rounded-full blur-xl" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-pastel-purple/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pastel-blue/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-pastel-mint/20 rounded-full blur-xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-graduate-500 to-decoration-500 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Custom Design
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
              Ingin Custom
              <span className="bg-gradient-to-r from-graduate-600 to-decoration-600 bg-clip-text text-transparent">
                {" "}
                Sesuai Selera?
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Tidak menemukan design yang cocok? Tenang! Kami menyediakan
              layanan custom design untuk mewujudkan bucket wisuda impian Anda.
              Dari pemilihan bunga hingga kombinasi warna, semuanya bisa
              disesuaikan dengan keinginan Anda.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-graduate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/custom" className="flex items-center space-x-2">
                  <span>Isi Form Custom</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-graduate-600 text-graduate-600 hover:bg-graduate-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat WhatsApp</span>
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Konsultasi gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Revisi unlimited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Garansi kepuasan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-graduate-500 to-decoration-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Palette className="h-10 w-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Proses Custom Design
                </h3>

                {/* Steps */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-graduate-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Konsultasi
                      </div>
                      <div className="text-sm text-gray-600">
                        Ceritakan ide dan keinginan Anda
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-decoration-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Design</div>
                      <div className="text-sm text-gray-600">
                        Tim kami buat mockup design
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-graduate-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Produksi</div>
                      <div className="text-sm text-gray-600">
                        Setelah approve, kami produksi
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-decoration-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Selesai</div>
                      <div className="text-sm text-gray-600">
                        Bucket custom siap diantar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-pastel-mint to-pastel-blue rounded-xl flex items-center justify-center shadow-lg animate-float">
              <Palette className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomCTASection;
