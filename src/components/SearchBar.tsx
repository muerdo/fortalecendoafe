"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por título, autor ou palavra-chave..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
