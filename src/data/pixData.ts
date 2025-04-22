export interface PixData {
  merchantName: string;
  merchantCity: string;
  pixKey: string;
  txid?: string;
}

export const pixPaymentData: PixData = {
  merchantName: "Livraria Bíblica Digital",
  merchantCity: "São Paulo",
  pixKey: "biblia@email.com", // Email type PIX key (example)
  txid: "EBOOKSBIBLICOS1234" // Optional transaction ID
};
