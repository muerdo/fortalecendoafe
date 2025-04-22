import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Cart utilities
export function getCartFromStorage() {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

export function saveCartToStorage(cart: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// PIX utils
export function generatePixString(
  pixKey: string, 
  merchantName: string, 
  merchantCity: string, 
  amount: number, 
  txid?: string
): string {
  // This is a simplified implementation - in a real app you'd want to use a proper library
  const payload = [
    { id: "00", value: "01" }, // payload version
    {
      id: "26", // merchant account info
      value: [
        { id: "00", value: "br.gov.bcb.pix" },
        { id: "01", value: pixKey }
      ]
    },
    { id: "52", value: merchantName.substring(0, 25) },
    { id: "53", value: merchantCity.substring(0, 15) },
    { id: "54", value: "BR" },
    { id: "58", value: "BR" },
    { id: "59", value: merchantName.substring(0, 25) },
    { id: "60", value: txid || "" },
    { id: "62", value: [
      { id: "05", value: amount.toFixed(2) }
    ]}
  ];
  
  // In a real app, you'd calculate the CRC16 and add it as field 63
  // And properly encode all this according to the PIX spec
  
  return `00020126580014br.gov.bcb.pix0122${pixKey}5204${amount.toFixed(2)}5802BR5925${merchantName.substring(0, 25)}6009SAO PAULO62070503***63041D3D`;
}
