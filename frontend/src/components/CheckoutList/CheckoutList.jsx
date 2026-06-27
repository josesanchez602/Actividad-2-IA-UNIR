import { useCart } from "../../context/CartContext";
import CartBookCard from "../CartBookCard/CartBookCard";
import "./CheckoutList.css";

export default function CheckoutList() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <p>Tu carrito está vacío</p>;
  }

  return (
    <div className="checkout-list">
      {cart.map((book) => (
        <CartBookCard key={book.id} book={book} />
      ))}
    </div>
  );
}