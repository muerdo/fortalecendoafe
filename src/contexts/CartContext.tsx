"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Book } from "@/types/book";
import { getCartFromStorage, saveCartToStorage } from "@/lib/utils";

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    if (savedCart.length) {
      setItems(savedCart);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);
  
  const addToCart = (book: Book, quantity: number = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.book.id === book.id);
      
      if (existingIndex >= 0) {
        // If book already in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { book, quantity }];
      }
    });
  };
  
  const removeFromCart = (bookId: string) => {
    setItems(prevItems => prevItems.filter(item => item.book.id !== bookId));
  };
  
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
