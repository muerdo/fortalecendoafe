export interface PixData {
  merchantName: string;
  merchantCity: string;
  pixKey: string;
  mcc: string;  // Merchant Category Code
  currency: string;  // Transaction Currency Code
  countryCode: string;
  referenceLabel: string;
}

export const pixPaymentData: PixData = {
  merchantName: "PEDRO LUCAS CARVALHO OLIV",
  merchantCity: "ACAILANDIA",
  pixKey: "+5599981650963",
  mcc: "0000",
  currency: "986",
  countryCode: "BR",
  referenceLabel: "***"
};
