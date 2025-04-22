"use client";

import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface FeaturedBookProps {
  book: Book;
}

export function FeaturedBook({ book }: FeaturedBookProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Destaque</h2>
      <div className="bg-blue-50 rounded-xl overflow-hidden">
        <div className="flex flex-row p-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-80 w-60 flex-shrink-0 mr-8"
          >
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 240px"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="flex items-center mb-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destaque da Semana
              </span>
            </div>
            <h3 className="text-3xl font-serif font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-xl text-gray-600 mb-4">por {book.author}</p>
            <p className="text-gray-700 mb-6 line-clamp-3">{book.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{book.pages} páginas • Publicado em {new Date(book.publicationDate).toLocaleDateString('pt-BR')}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(book.price)}</p>
              </div>
              <Link 
                href={`/books/${book.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Ver Detalhes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
