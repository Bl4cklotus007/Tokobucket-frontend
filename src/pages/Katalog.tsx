import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
}

const Katalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "bucket", label: "Bucket" },
    { value: "dekorasi balon", label: "Dekorasi Balon" },
    { value: "dekorasi pernikahan", label: "Dekorasi Pernikahan" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      if (response.data.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Katalog Produk
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap bucket wisuda dan dekorasi terbaik kami
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Kategori:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-graduate-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat produk...</p>
              </div>
            </div>
          ) : error ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-red-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Terjadi Kesalahan
                </h2>
                <p className="text-gray-600 mb-8">{error}</p>
                <Button onClick={fetchProducts} variant="outline">
                  Coba Lagi
                </Button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tidak Ada Produk
                </h2>
                <p className="text-gray-600 mb-8">
                  {selectedCategory === "all" 
                    ? "Belum ada produk yang tersedia saat ini." 
                    : `Tidak ada produk dalam kategori "${categories.find(c => c.value === selectedCategory)?.label}"`
                  }
                </p>
                {selectedCategory !== "all" && (
                  <Button 
                    onClick={() => setSelectedCategory("all")}
                    className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700"
                  >
                    Lihat Semua Produk
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url ? 
                        (product.image_url.startsWith('http') ? product.image_url : `${API_BASE_URL}${product.image_url}`) 
                        : "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {product.name}
                      </CardTitle>
                      {product.is_featured && (
                        <Badge className="bg-gradient-to-r from-graduate-600 to-decoration-600 text-white">
                          Unggulan
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category === "bucket" ? "Bucket" :
                         product.category === "dekorasi balon" ? "Dekorasi Balon" :
                         product.category === "dekorasi pernikahan" ? "Dekorasi Pernikahan" : product.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-graduate-600">
                        {formatPrice(product.price)}
                      </span>
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700"
                      >
                        <a
                          href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk ${product.name} - ${formatPrice(product.price)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Pesan
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="flex items-center space-x-2 mx-auto"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Beranda</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Katalog;
