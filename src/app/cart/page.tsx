"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Trash2, ShoppingCart, ArrowRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4 md:mb-6">Seu Carrinho</h1>
        
        <div className="bg-white p-6 md:p-8 rounded-lg shadow text-center py-10 md:py-16">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-12 w-12 md:h-16 md:w-16 text-gray-300" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-700 mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6 md:mb-8">Adicione algum eBook para continuar</p>
          <button
            onClick={() => router.push("/books")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Ver Catálogo de eBooks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 mb-4 md:mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Continuar Comprando
      </button>
      
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4 md:mb-8">Seu Carrinho</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <motion.tr 
                      key={item.book.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-12 flex-shrink-0 mr-3 md:mr-4 relative">
                            <Image
                              src={item.book.coverImage}
                              alt={item.book.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm md:text-base">{item.book.title}</div>
                            <div className="text-xs md:text-sm text-gray-500">{item.book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">
                        {formatCurrency(item.book.price)}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center border border-gray-300 rounded w-20 md:w-24">
                          <button
                            onClick={() => cart.updateQuantity(item.book.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2 md:px-3 py-1 border-x border-gray-300 flex-1 text-center text-sm md:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => cart.updateQuantity(item.book.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base">
                        {formatCurrency(item.book.price * item.quantity)}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => cart.removeFromCart(item.book.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Card View */}
            <div className="md:hidden">
              {cart.items.map((item) => (
                <motion.div 
                  key={item.book.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex gap-3 mb-3">
                    <div className="h-20 w-14 flex-shrink-0 relative">
                      <Image
                        src={item.book.coverImage}
                        alt={item.book.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 mb-1">{item.book.title}</div>
                      <div className="text-xs text-gray-500 mb-2">{item.book.author}</div>
                      <div className="text-sm font-medium text-gray-700">{formatCurrency(item.book.price)}</div>
                    </div>
                    <button
                      onClick={() => cart.removeFromCart(item.book.id)}
                      className="text-red-600 hover:text-red-800 self-start"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded w-24">
                      <button
                        onClick={() => cart.updateQuantity(item.book.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 border-x border-gray-300 flex-1 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => cart.updateQuantity(item.book.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-medium text-gray-900">
                      Total: {formatCurrency(item.book.price * item.quantity)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-between gap-3">
            <button
              onClick={() => cart.clearCart()}
              className="text-red-600 hover:text-red-800 font-medium text-sm md:text-base"
            >
              Limpar Carrinho
            </button>
            <button
              onClick={() => router.push("/books")}
              className="flex items-center text-blue-600 hover:underline text-sm md:text-base"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continuar Comprando
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm md:text-base">Subtotal</span>
                <span className="text-gray-800 font-medium text-sm md:text-base">{formatCurrency(cart.getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm md:text-base">Taxa de Processamento</span>
                <span className="text-gray-800 font-medium text-sm md:text-base">Grátis</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="text-base md:text-lg font-bold text-gray-800">Total</span>
              <span className="text-base md:text-lg font-bold text-blue-600">{formatCurrency(cart.getTotalPrice())}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 md:py-3 px-4 rounded-lg flex items-center justify-center"
            >
              Finalizar Compra
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </motion.button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Ao finalizar a compra você concorda com nossos termos de serviço e política de privacidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
