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
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link href={`/books/${book.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif font-bold text-gray-800 text-lg mb-1 truncate">{book.title}</h3>
          <p className="text-gray-600 mb-2">{book.author}</p>
          <p className="text-blue-600 font-bold text-lg">{formatCurrency(book.price)}</p>
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
