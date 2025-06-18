import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Katalog", href: "/katalog" },
    { name: "Galeri", href: "/galeri" },
    { name: "Testimoni", href: "/testimoni" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-pastel-pink/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-pastel-pink to-pastel-purple rounded-xl group-hover:shadow-lg transition-all duration-300">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-gray-900 leading-none">
                Bucket Wisuda
              </span>
              <span className="text-xs text-gray-500 leading-none">
                & Dekorasi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-gray-700 hover:text-graduate-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative",
                  isActive(item.href) && "text-graduate-600",
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-graduate-600 rounded-full"></div>
                )}
              </Link>
            ))}

            {/* CTA Button */}
            <Button
              asChild
              className="bg-gradient-to-r from-graduate-500 to-decoration-500 hover:from-graduate-600 hover:to-decoration-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/pesan" className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Pesan</span>
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 border border-pastel-pink/20 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-gray-700 hover:text-graduate-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActive(item.href) &&
                      "text-graduate-600 bg-pastel-pink/10",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-graduate-500 to-decoration-500 hover:from-graduate-600 hover:to-decoration-600 text-white font-semibold"
                >
                  <Link
                    to="/pesan"
                    className="flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Pesan</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
