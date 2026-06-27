import { useNavigate } from "react-router-dom";
import AddBookButton from "../AddBookButton/AddBookButton";
import "./BookCard.css";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={goToDetail}>

      <img src={book.cover} alt={book.title} />

      <div className="book-info">

        <h3>{book.title}</h3>

        <p className="author">{book.author}</p>
        <p className="genre">{book.genre}</p>
        <p className="price">{book.price} €</p>

        <AddBookButton book={book} />

      </div>

    </div>
  );
}