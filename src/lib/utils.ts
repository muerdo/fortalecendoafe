import { PixData } from "@/data/pixData";
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
  pixData: PixData,
  amount: number
): string {
  // Formato correto do PIX string
  return [
    "00020126",                                    // [00] Payload Format Indicator + [26] Merchant Account Info
    "3600",                                        // Tamanho do Merchant Account Info
    "14BR.GOV.BCB.PIX",                           // GUI do PIX
    "01" + pixData.pixKey.length + pixData.pixKey, // Chave PIX
    "5204" + pixData.mcc,                         // Merchant Category Code
    "5303" + pixData.currency,                    // Transaction Currency
    "54" + amount.toFixed(2).length.toString().padStart(2, '0') + amount.toFixed(2), // Transaction Amount
    "5802" + pixData.countryCode,                 // Country Code
    "59" + pixData.merchantName.length + pixData.merchantName, // Merchant Name
    "60" + pixData.merchantCity.length + pixData.merchantCity, // Merchant City
    "6207",                                       // Additional Data Field Template
    "0503" + pixData.referenceLabel,              // Reference Label
    "6304",                                       // CRC
    "5C00"                                        // CRC Value
  ].join("");
}
