import { useMemo } from "react";

export default function useFilteredBooks(books, searchTerm) {
  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;

    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  return filteredBooks;
}