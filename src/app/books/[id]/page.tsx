"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Book as BookType } from "@/types/book";
import { books } from "@/data/books";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { ShoppingCart, ChevronLeft, BookOpen, Calendar, Languages } from "lucide-react";

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const cart = useCart();
  
  const [book, setBook] = useState<BookType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    // Find the book with the matching ID
    const foundBook = books.find(b => b.id === id);
    if (foundBook) {
      setBook(foundBook);
    } else {
      // Redirect to books page if book not found
      router.push("/books");
    }
  }, [id, router]);
  
  if (!book) {
    return (
      <div className="container mx-auto px-8 py-12">
        <p className="text-center">Carregando...</p>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    setIsAdding(true);
    cart.addToCart(book, quantity);
    
    // Show success animation then reset
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };
  
  const handleBuyNow = () => {
    cart.addToCart(book, quantity);
    router.push("/cart");
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>
      
      <div className="flex flex-row gap-12">
        {/* Book Cover */}
        <div className="w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </motion.div>
        </div>
        
        {/* Book Details */}
        <div className="w-2/3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-2 mb-4">
              {book.categories.map(category => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                >
                  {category.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">por {book.author}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-8">
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(book.price)}</p>
            </div>
            
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{book.pages} páginas</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {new Date(book.publicationDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="flex items-center">
                <Languages className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{book.language}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isAdding
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={isAdding}
              >
                {isAdding ? (
                  "Adicionado ✓"
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </motion.button>
              
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Comprar Agora
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
