import React from 'react';
import { Home, User, Menu } from 'lucide-react';

interface NavbarProps {
  onLogoClick: () => void;
}

const Navbar = ({ onLogoClick }: NavbarProps) => {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <Home className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-bold text-rose-500">airbnb</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Become a Host</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Help</a>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:shadow-md transition">
              <Menu className="w-4 h-4" />
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;