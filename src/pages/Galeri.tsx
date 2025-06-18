import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Galeri = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Galeri Karya
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lihat koleksi foto hasil karya bucket wisuda dan dekorasi kami
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <Camera className="h-16 w-16 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Galeri Sedang Dikembangkan
              </h2>

              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Halaman galeri karya sedang dalam tahap pengembangan. Sementara
                ini, Anda bisa melihat portofolio kami di Instagram.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700"
                >
                  <Link to="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Kembali ke Beranda</span>
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <a
                    href="https://instagram.com/bucketwisuda"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat di Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Galeri;
