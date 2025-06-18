import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Putri",
      role: "Mahasiswa Universitas Gadjah Mada",
      rating: 5,
      text: "Bucket wisuda dari Bucket Wisuda & Dekorasi benar-benar luar biasa! Bunga-bunganya segar dan arrangementriya sangat cantik. Orang tua saya sangat terkesan dengan hasilnya. Terima kasih sudah membuat momen wisuda saya jadi lebih berkesan!",
      image: "sarah",
      location: "Yogyakarta",
    },
    {
      id: 2,
      name: "Rizki Pratama",
      role: "Fresh Graduate Teknik",
      rating: 5,
      text: "Pelayanannya sangat memuaskan! Tim nya responsif banget dan bisa customize sesuai keinginan. Bucket wisudanya juga awet, sampai sekarang masih cantik di kamar. Recommended banget untuk teman-teman yang mau wisuda!",
      image: "rizki",
      location: "Jakarta",
    },
    {
      id: 3,
      name: "Anita Sari",
      role: "Ibu dari Wisudawan",
      rating: 5,
      text: "Sebagai orang tua, saya sangat senang bisa memberikan yang terbaik untuk anak saya di hari wisudanya. Bucket dari sini kualitasnya premium dan harganya reasonable. Anak saya juga senang banget!",
      image: "anita",
      location: "Bandung",
    },
    {
      id: 4,
      name: "Dimas Arya",
      role: "Mahasiswa Pasca Sarjana",
      rating: 5,
      text: "Bucket wisuda untuk S2 saya pesan di sini dan hasilnya melebihi ekspektasi. Kombinasi warna dan bunga nya pas banget dengan toga saya. Prosesnya juga cepat, pesan hari ini besok sudah jadi!",
      image: "dimas",
      location: "Surabaya",
    },
    {
      id: 5,
      name: "Maya Dewi",
      role: "Wisudawan Kedokteran",
      rating: 5,
      text: "Untuk momen spesial seperti wisuda kedokteran, saya cari yang terbaik. Alhamdulillah ketemu Bucket Wisuda & Dekorasi ini. Bucket nya elegant dan sophisticated, cocok banget untuk profesi dokter. Highly recommended!",
      image: "maya",
      location: "Semarang",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-pastel-pink/10 via-pastel-purple/10 to-pastel-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-graduate-500 to-decoration-500 rounded-full px-4 py-2 mb-4">
            <Star className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Testimoni Pelanggan
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami. Simak cerita dari
            mereka yang telah mempercayakan momen spesialnya kepada kami.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20 rounded-full translate-y-12 -translate-x-12" />

            {/* Quote Icon */}
            <div className="relative z-10">
              <Quote className="h-12 w-12 text-graduate-400 mb-6" />

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                "{current.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-graduate-500 to-decoration-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {current.name.charAt(0)}
                </div>

                {/* Details */}
                <div>
                  <div className="font-semibold text-gray-900 text-lg">
                    {current.name}
                  </div>
                  <div className="text-gray-600">{current.role}</div>
                  <div className="text-sm text-gray-500">
                    {current.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-pastel-pink/30 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm border-pastel-pink/30 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-graduate-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pastel-pink/20">
            <div className="text-3xl font-bold text-graduate-600 mb-2">
              500+
            </div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pastel-purple/20">
            <div className="text-3xl font-bold text-decoration-600 mb-2">
              1000+
            </div>
            <div className="text-gray-600">Bucket Terjual</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pastel-blue/20">
            <div className="text-3xl font-bold text-graduate-600 mb-2">5.0</div>
            <div className="text-gray-600">Rating Rata-rata</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pastel-mint/20">
            <div className="text-3xl font-bold text-decoration-600 mb-2">
              98%
            </div>
            <div className="text-gray-600">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
