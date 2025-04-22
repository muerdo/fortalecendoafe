"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency, generatePixString } from "@/lib/utils";
import { pixPaymentData } from "@/data/pixData";
import { Copy, Check, Download, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState("");
  
  useEffect(() => {
    // Prevent accessing checkout with empty cart
    if (cart.items.length === 0) {
      router.push("/books");
    }
    
    // Generate PIX code based on cart total
    const totalAmount = cart.getTotalPrice();
    const pixString = generatePixString(
      pixPaymentData.pixKey,
      pixPaymentData.merchantName,
      pixPaymentData.merchantCity,
      totalAmount,
      pixPaymentData.txid
    );
    
    setPixCode(pixString);
  }, [cart, router]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleFinishPurchase = () => {
    // In a real app, you'd verify payment here
    // For demo purposes, we'll just clear cart and redirect
    cart.clearCart();
    router.push("/checkout/success");
  };
  
  const downloadQR = () => {
    const canvas = document.getElementById("pix-qrcode")?.querySelector("canvas");
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "pix-qrcode.png";
      link.click();
    }
  };
  
  if (cart.items.length === 0) {
    return <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">Redirecionando...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 mb-4 md:mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar para o Carrinho
      </button>
      
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-6 md:mb-8">Finalizar Pedido</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">Resumo do Pedido</h2>
            
            <div className="mb-6">
              {cart.items.map((item) => (
                <div key={item.book.id} className="flex justify-between py-2 border-b border-gray-100">
                  <div className="pr-2">
                    <p className="text-gray-800 font-medium text-sm md:text-base line-clamp-1">{item.book.title}</p>
                    <p className="text-xs md:text-sm text-gray-500">Qtd: {item.quantity}</p>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base whitespace-nowrap">{formatCurrency(item.book.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between font-bold text-base md:text-lg mb-2">
              <span>Total</span>
              <span className="text-blue-600">{formatCurrency(cart.getTotalPrice())}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4 md:mb-6">Pague com PIX</h2>
            
            <div className="flex flex-col items-center text-center mb-6 md:mb-8">
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                Escaneie o QR Code abaixo ou copie o código PIX
              </p>
              
              <div id="pix-qrcode" className="bg-white p-3 md:p-4 rounded-lg shadow-md mb-4 md:mb-6">
                <QRCodeSVG 
                  value={pixCode} 
                  size={200} 
                  level="H" 
                  includeMargin={true}
                  bgColor={"#FFFFFF"}
                  fgColor={"#000000"}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadQR}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm md:text-base"
                >
                  <Download className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Download QR Code</span>
                </button>
              </div>
              
              <div className="mt-4 md:mt-6 w-full">
                <p className="text-xs md:text-sm text-gray-500 mb-1">Código PIX:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={pixCode}
                    className="flex-1 p-2 md:p-3 bg-gray-50 border border-gray-300 rounded-l-lg text-xs md:text-sm text-gray-700"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3 rounded-r-lg"
                  >
                    {copied ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : <Copy className="h-4 w-4 md:h-5 md:w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg mb-6 md:mb-8">
              <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Instruções:</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 text-xs md:text-sm">
                <li>Abra o app do seu banco ou instituição financeira</li>
                <li>Escolha a opção de pagar com PIX usando QR Code</li>
                <li>Escaneie o QR Code acima ou cole o código PIX</li>
                <li>Confirme as informações e finalize o pagamento</li>
                <li>Após o pagamento, clique em "Confirmar Pagamento" abaixo</li>
              </ol>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleFinishPurchase}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 md:py-4 px-4 rounded-lg text-base md:text-lg"
            >
              Confirmar Pagamento
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
