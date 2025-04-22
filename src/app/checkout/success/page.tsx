"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // In a real application, you might validate the purchase here
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-lg shadow-md text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex justify-center mb-4 md:mb-6"
        >
          <CheckCircle className="h-16 w-16 md:h-20 md:w-20 text-green-500" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-3 md:mb-4"
        >
          Compra Realizada com Sucesso!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-lg text-gray-600 mb-6 md:mb-8"
        >
          Obrigado por sua compra. Seus eBooks já estão disponíveis para download.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6 md:mb-8"
        >
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-2">Instruções para Download:</h2>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            Um email com os links de download foi enviado para seu endereço de email cadastrado.
            Você também pode acessar seus eBooks na área "Minha Biblioteca" a qualquer momento.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col space-y-3 md:space-y-4"
        >
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 md:py-3 px-6 rounded-lg transition-colors"
          >
            Voltar à Página Inicial
          </button>
          <button
            onClick={() => router.push("/books")}
            className="text-blue-600 hover:underline font-medium text-sm md:text-base"
          >
            Continuar Comprando
          </button>
        </motion.div>
      </div>
    </div>
  );
}
