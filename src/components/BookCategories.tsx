"use client";

import { useState } from "react";
import { bookCategories } from "@/data/books";
import { motion } from "framer-motion";

interface BookCategoriesProps {
  onSelectCategory: (category: string) => void;
}

export function BookCategories({ onSelectCategory }: BookCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      {bookCategories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryClick(category)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category === "all" ? "Todos" : category.replace(/-/g, " ")}
        </motion.button>
      ))}
    </div>
  );
}
