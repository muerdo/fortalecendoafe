"use client";

import { useState } from "react";
import { books } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { BookCategories } from "@/components/BookCategories";
import { Book } from "@/types/book";

export default function BooksPage() {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6 md:mb-8">Todos os eBooks</h1>
      
      <div className="mb-6 md:mb-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-3 md:mb-4">Filtrar por Categoria</h2>
        <BookCategories onSelectCategory={handleCategoryFilter} />
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <h3 className="text-lg md:text-xl text-gray-700">Nenhum livro encontrado com esses critérios de busca.</h3>
          <p className="text-gray-600 mt-2">Tente outra pesquisa ou categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
