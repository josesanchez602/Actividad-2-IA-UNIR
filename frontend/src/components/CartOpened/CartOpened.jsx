import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartBookCard from "../CartBookCard/CartBookCard";
import "./CartOpened.css";

export default function CartOpened({ open, setOpen }) {
  const { cart, totalPrice } = useCart();

  if (!open) return null;

  return (
    <div className="cart-overlay" onClick={() => setOpen(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>

        <h2 className="cart-title">CART</h2>

        {cart.length === 0 ? (
          <p className="empty-text">The cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((book) => (
                <CartBookCard key={book.id} book={book} />
              ))}
            </div>

            <div className="cart-footer">
              <p className="total">
                TOTAL: {totalPrice().toFixed(2)}€
              </p>

              <Link
                to="/checkout"
                className="checkout-link"
                onClick={() => setOpen(false)}
              >
                Comprar
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}