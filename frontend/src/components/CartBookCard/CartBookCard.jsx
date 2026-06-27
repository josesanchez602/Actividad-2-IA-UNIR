import { useCart } from "../../context/CartContext";
import "./CartBookCard.css";

export default function CartBookCard({ book }) {
  const { addBook, removeBook } = useCart();

  return (
    <div className="cart-book-card">

      <div className="image-container">
        <img src={book.cover} alt={book.title} />
      </div>

      <div className="info-container">

        <h4 className="title">{book.title}</h4>

        <p className="price">{book.price}€</p>

        <div className="actions">

          <button onClick={() => removeBook(book)}>
            -
          </button>

          <span className="quantity">
            {book.quantity}
          </span>

          <button onClick={() => addBook(book)}>
            +
          </button>

        </div>

      </div>
    </div>
  );
}