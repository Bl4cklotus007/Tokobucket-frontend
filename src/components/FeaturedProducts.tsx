import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingBag, Gift } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Bucket Wisuda Premium",
      price: "150.000",
      originalPrice: "200.000",
      rating: 5.0,
      reviews: 45,
      image: "premium-bucket",
      category: "Bucket Wisuda",
      badge: "Promo Hari Ini",
      badgeColor: "bg-red-500",
      description: "Bucket bunga mawar premium dengan dekorasi eksklusif",
      features: ["Bunga Segar", "Custom Design", "Gratis Kartu"],
    },
    {
      id: 2,
      name: "Paket Dekorasi Balon",
      price: "299.000",
      originalPrice: "350.000",
      rating: 4.9,
      reviews: 32,
      image: "balloon-decoration",
      category: "Dekorasi",
      badge: "Terlaris",
      badgeColor: "bg-green-500",
      description: "Paket lengkap dekorasi balon untuk acara spesial",
      features: ["Setup Gratis", "Pilihan Warna", "Tahan 8 Jam"],
    },
    {
      id: 3,
      name: "Bucket Mini Love",
      price: "99.000",
      originalPrice: "120.000",
      rating: 4.8,
      reviews: 67,
      image: "mini-bucket",
      category: "Bucket Wisuda",
      badge: "Best Seller",
      badgeColor: "bg-purple-500",
      description: "Bucket mini cantik dengan sentuhan romantis",
      features: ["Ukuran Compact", "Bunga Pilihan", "Harga Terjangkau"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full px-4 py-2 mb-4">
            <Star className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">
              Produk Unggulan
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Promo Hari Ini
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan penawaran terbaik untuk produk pilihan dengan kualitas
            premium
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pastel-pink/30"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-pastel-pink/20 to-pastel-purple/20 p-6">
                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full z-10`}
                >
                  {product.badge}
                </div>

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-300 z-10">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                </button>

                {/* Product Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-white to-pastel-pink/30 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-graduate-500 to-decoration-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Gift className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} ulasan)
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2 group-hover:text-graduate-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-pastel-pink/20 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-graduate-600">
                    Rp {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      Rp {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700 text-white font-semibold rounded-full group-hover:shadow-lg transition-all duration-300"
                >
                  <Link
                    to={`/produk/${product.id}`}
                    className="flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Pesan Sekarang</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/katalog"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-graduate-600 text-graduate-600 hover:bg-graduate-600 hover:text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

export default FeaturedProducts;
