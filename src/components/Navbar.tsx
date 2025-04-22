"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Book, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    setCartCount(cart.getTotalItems());
  }, [cart]);
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Book className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-xl font-serif font-bold text-gray-800">Livraria Bíblica</span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex space-x-8">
            <Link 
              href="/" 
              className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <Link 
              href="/books" 
              className={`font-medium ${isActive('/books') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Catálogo
            </Link>
            <Link 
              href="#" 
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Sobre
            </Link>
            <Link 
              href="#" 
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Contato
            </Link>
          </nav>
          
          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-700"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 py-4 border-t border-gray-100"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                onClick={() => setMenuOpen(false)}
                className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Início
              </Link>
              <Link 
                href="/books" 
                onClick={() => setMenuOpen(false)}
                className={`font-medium ${isActive('/books') ? 'text-blue-600' : 'text-gray-700'}`}
              >
                Catálogo
              </Link>
              <Link 
                href="#" 
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                Sobre
              </Link>
              <Link 
                href="#" 
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                Contato
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
