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
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8">Todos os eBooks</h1>
      
      <div className="mb-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Filtrar por Categoria</h2>
        <BookCategories onSelectCategory={handleCategoryFilter} />
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-700">Nenhum livro encontrado com esses critérios de busca.</h3>
          <p className="text-gray-600 mt-2">Tente outra pesquisa ou categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
