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
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6">Seu Carrinho</h1>
        
        <div className="bg-white p-8 rounded-lg shadow text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-700 mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-8">Adicione algum eBook para continuar</p>
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
    <div className="container mx-auto px-8 py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Continuar Comprando
      </button>
      
      <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">Seu Carrinho</h1>
      
      <div className="flex gap-8">
        {/* Cart Items */}
        <div className="w-2/3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-16 w-12 flex-shrink-0 mr-4 relative">
                          <Image
                            src={item.book.coverImage}
                            alt={item.book.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{item.book.title}</div>
                          <div className="text-sm text-gray-500">{item.book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatCurrency(item.book.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center border border-gray-300 rounded w-24">
                        <button
                          onClick={() => cart.updateQuantity(item.book.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 flex-1 text-center">
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
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(item.book.price * item.quantity)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => cart.removeFromCart(item.book.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => cart.clearCart()}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Limpar Carrinho
            </button>
            <button
              onClick={() => router.push("/books")}
              className="flex items-center text-blue-600 hover:underline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continuar Comprando
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">{formatCurrency(cart.getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Processamento</span>
                <span className="text-gray-800 font-medium">Grátis</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(cart.getTotalPrice())}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
            >
              Finalizar Compra
              <ArrowRight className="ml-2 h-5 w-5" />
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
