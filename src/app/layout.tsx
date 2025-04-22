import React from "react";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
// GeistSerif is not available, using only GeistSans
import { type Metadata } from "next";
import {
  AnalyticsTracker,
  ErrorBoundaryClient,
  DOMInspector,
  Branding,
} from "@/utils/creatr.scripts";
import { GlobalErrorHandler } from "@/utils/global-error-handler";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";

// Create a proper React component wrapper
const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const ErrorBoundaryComponent =
    ErrorBoundaryClient as unknown as React.ComponentType<any>;
  return <ErrorBoundaryComponent {...props} />;
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "Livraria Bíblica Digital",
    template: "%s | Livraria Bíblica Digital",
  },
  description: "Compre eBooks bíblicos e pague via PIX",
  applicationName: "Livraria Bíblica Digital",
  keywords: ["ebooks", "bíblia", "livraria", "digital", "pix", "leitura cristã"],
  authors: [{ name: "Livraria Bíblica Digital" }],
  creator: "Livraria Bíblica Digital",
  publisher: "Livraria Bíblica Digital",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Livraria Bíblica Digital",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>
        <GlobalErrorHandler />
        <DOMInspector>
          <ErrorBoundaryWrapper>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <footer className="bg-gray-50 border-t border-gray-200 py-6 md:py-8">
                  <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center text-gray-600">
                    <p className="text-xs md:text-sm">
                      &copy; {new Date().getFullYear()} Livraria Bíblica Digital. Todos os direitos reservados.
                    </p>
                  </div>
                </footer>
              </div>
              <Branding />
            </CartProvider>
          </ErrorBoundaryWrapper>
          <AnalyticsTracker siteKey="${siteKey}" />
        </DOMInspector>
      </body>
    </html>
  );
}
