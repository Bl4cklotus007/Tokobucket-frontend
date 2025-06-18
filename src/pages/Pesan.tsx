import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Pesan = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Pesan Custom
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wujudkan bucket wisuda impian Anda dengan layanan custom design
              kami
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <Edit className="h-16 w-16 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Form Pemesanan Custom Sedang Dikembangkan
              </h2>

              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Form pemesanan custom sedang dalam tahap pengembangan. Sementara
                ini, Anda bisa langsung menghubungi kami via WhatsApp untuk
                konsultasi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-graduate-600 to-decoration-600 hover:from-graduate-700 hover:to-decoration-700"
                >
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat WhatsApp</span>
                  </a>
                </Button>

                <Button asChild variant="outline">
                  <Link to="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Kembali ke Beranda</span>
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-12 p-6 bg-gradient-to-br from-pastel-pink/10 to-pastel-purple/10 rounded-2xl border border-pastel-pink/20">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Informasi Pemesanan Custom:
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>📱 WhatsApp: +62 812-3456-7890</p>
                  <p>📧 Email: info@bucketwisuda.com</p>
                  <p>⏰ Jam Operasional: 08.00 - 21.00 WIB</p>
                  <p>🚀 Lead Time: 2-3 hari kerja</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pesan;
