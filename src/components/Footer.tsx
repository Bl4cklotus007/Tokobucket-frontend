import { Link } from "react-router-dom";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">
                  Bucket Wisuda & Dekorasi
                </h3>
                <p className="text-gray-400 text-sm">
                  Wujudkan Momen Istimewa Anda
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Kami menyediakan bucket wisuda dan dekorasi berkualitas tinggi
              untuk membuat momen spesial Anda semakin berkesan. Dengan sentuhan
              personal dan kreativitas, setiap produk kami dibuat dengan penuh
              cinta.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full transition-colors duration-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/bucketwisuda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-pastel-pink">
              Menu
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/katalog"
                  className="text-gray-300 hover:text-pastel-pink transition-colors duration-200"
                >
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-gray-300 hover:text-pastel-pink transition-colors duration-200"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  to="/testimoni"
                  className="text-gray-300 hover:text-pastel-pink transition-colors duration-200"
                >
                  Testimoni
                </Link>
              </li>
              <li>
                <Link
                  to="/pesan"
                  className="text-gray-300 hover:text-pastel-pink transition-colors duration-200"
                >
                  Pesan Custom
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-pastel-purple">
              Kontak
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-pastel-blue mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Jl. Pendidikan No. 123
                  <br />
                  Yogyakarta, 55281
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pastel-mint flex-shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="text-gray-300 hover:text-pastel-mint transition-colors duration-200 text-sm"
                >
                  +62 812-3456-7890
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pastel-yellow flex-shrink-0" />
                <a
                  href="mailto:info@bucketwisuda.com"
                  className="text-gray-300 hover:text-pastel-yellow transition-colors duration-200 text-sm"
                >
                  info@bucketwisuda.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Bucket Wisuda & Dekorasi. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
