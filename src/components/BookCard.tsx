"use client";

import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col"
    >
      <Link href={`/books/${book.id}`} className="flex flex-col h-full">
        <div className="relative h-48 sm:h-56 md:h-64 w-full">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="p-3 sm:p-4 flex-grow flex flex-col">
          <h3 className="font-serif font-bold text-gray-800 text-base sm:text-lg mb-1 truncate">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          <p className="text-blue-600 font-bold text-base sm:text-lg mt-auto">{formatCurrency(book.price)}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {book.categories.slice(0, 2).map(cat => (
              <span 
                key={cat}
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
              >
                {cat.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
