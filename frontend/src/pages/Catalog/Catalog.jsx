import BookCard from "../../components/BookCard/BookCard";
import useFilteredBooks from "../../hooks/useFilteredBooks";
import { useSearch } from "../../context/SearchContext";
import {useEffect, useState} from "react";
import "./Catalog.css";
import { getBooks } from "../../services/apiBooks";
export default function Catalog() {
  const { searchTerm } = useSearch();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("Error al cargar los libros",err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useFilteredBooks(books, searchTerm);

  if (loading) {
    return <h2>Cargando libros...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="catalog">
      {filteredBooks.length === 0 ? (
        <div className="no-results">
          <h2>No se han encontrado libros</h2>
          <p>Prueba a modificar tu búsqueda</p>
        </div>
      ) : (
        filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
      )}
    </div>
  );
}
