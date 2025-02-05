import React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#FF6600]">IKONIC</span>
              <span className="text-2xl font-light">LIMOUSINE</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-[#FF6600]">Services</Link>
            <Link to="/corporate" className="text-gray-700 hover:text-[#FF6600]">Corporate</Link>
            <Link to="/careers" className="text-gray-700 hover:text-[#FF6600]">Careers</Link>
            <Link to="/about" className="text-gray-700 hover:text-[#FF6600]">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#FF6600]">Contact</Link>
            <a href="tel:+97144498900" className="flex items-center text-[#FF6600]">
              <Phone className="w-4 h-4 mr-2" />
              <span>+971 44 498900</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#FF6600]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/services" className="block px-3 py-2 text-gray-700 hover:text-[#FF6600]">Services</Link>
            <Link to="/corporate" className="block px-3 py-2 text-gray-700 hover:text-[#FF6600]">Corporate</Link>
            <Link to="/careers" className="block px-3 py-2 text-gray-700 hover:text-[#FF6600]">Careers</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-[#FF6600]">About</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-[#FF6600]">Contact</Link>
            <a href="tel:+97144498900" className="block px-3 py-2 text-[#FF6600] flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+971 44 498900</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}