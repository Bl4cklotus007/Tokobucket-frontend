import { Link } from "react-router-dom";
import { GraduationCap, Heart, Gift } from "lucide-react";

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Bucket Wisuda",
      icon: GraduationCap,
      description: "Bucket bunga eksklusif untuk momen wisuda yang berkesan",
      color: "from-graduate-500 to-graduate-600",
      bgColor: "from-graduate-50 to-graduate-100",
      href: "/katalog?category=wisuda",
      emoji: "🎓",
    },
    {
      id: 2,
      name: "Balon Dekorasi",
      icon: Heart,
      description: "Dekorasi balon cantik untuk berbagai acara spesial",
      color: "from-decoration-500 to-decoration-600",
      bgColor: "from-decoration-50 to-decoration-100",
      href: "/katalog?category=balon",
      emoji: "🎈",
    },
    {
      id: 3,
      name: "Paket Pernikahan",
      icon: Gift,
      description: "Paket lengkap dekorasi untuk hari bahagia Anda",
      color: "from-pastel-pink to-pastel-purple",
      bgColor: "from-pink-50 to-purple-50",
      href: "/katalog?category=pernikahan",
      emoji: "💒",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Kategori Produk
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan beragam pilihan produk terbaik untuk momen spesial Anda
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;

            return (
              <Link
                key={category.id}
                to={category.href}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Emoji */}
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {category.emoji}
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                  >
                    Lihat Koleksi
                    <svg
                      className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/katalog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Lihat Semua Produk
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
