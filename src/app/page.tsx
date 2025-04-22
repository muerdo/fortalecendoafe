"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book } from "@/types/book";
import { books } from "@/data/books";
import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { FeaturedBook } from "@/components/FeaturedBook";
import { SearchBar } from "@/components/SearchBar";
import { BookCategories } from "@/components/BookCategories";

export default function HomePage() {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const featuredBook = books[0]; // Use the first book as featured

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }
    
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) || 
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    if (category === "all") {
      setFilteredBooks(books);
      return;
    }
    
    const filtered = books.filter(book => 
      book.categories.includes(category)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-gray-800 mb-4"
            >
              Livraria Bíblica Digital
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl"
            >
              Descubra conhecimento espiritual através da nossa seleção de eBooks bíblicos de qualidade
            </motion.p>
          </div>

          <SearchBar onSearch={handleSearch} />
        </section>

        {/* Featured Book */}
        <FeaturedBook book={featuredBook} />

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Categorias</h2>
          <BookCategories onSelectCategory={handleCategoryFilter} />
        </section>

        {/* Book List */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Nossos eBooks</h2>
            <Link 
              href="/books" 
              className="text-blue-600 hover:underline font-medium"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {filteredBooks.slice(0, 8).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-50 p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pronto para enriquecer sua jornada espiritual?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa coleção de eBooks bíblicos oferece sabedoria atemporal e insights profundos para sua vida.
          </p>
          <Link 
            href="/books"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Explorar Todos os Livros
          </Link>
        </section>
      </main>
    </div>
  );
}
