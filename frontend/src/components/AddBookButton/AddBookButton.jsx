import { useCart } from "../../context/CartContext";
import "./AddBookButton.css";

export default function AddBookButton({ book }) {
  const { addBook } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addBook(book);
  };

  return (
    <button className="add-button" onClick={handleAddToCart}>
      Añadir al carrito
    </button>
  );
}