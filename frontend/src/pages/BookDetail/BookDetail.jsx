import { useParams } from "react-router-dom";
import AddBookButton from "../../components/AddBookButton/AddBookButton";
import "./BookDetail.css";
import { useEffect, useState } from "react";
import { getBookById } from "../../services/apiBooks";
export default function BookDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError("Error al cargar el libro");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <h2>Cargando libro...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!book) {
    return <h2>Libro no encontrado</h2>;
  }

  return (
    <div className="book-detail">
      <div className="book-header">
        <img src={book.cover} alt={book.title} />
      </div>

      <div className="book-content">
        <h1>{book.title}</h1>

        <p className="author">Autor: {book.author}</p>
        <p className="genre">Género: {book.genre}</p>
        <p className="price">{book.price}€</p>

        <p className="description">{book.description}</p>

        <AddBookButton book={book} />
      </div>
    </div>
  );
}
