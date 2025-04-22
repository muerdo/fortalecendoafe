export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  categories: string[];
  featured?: boolean;
  publicationDate: string;
  pages: number;
  language: string;
  isbn: string;
}
