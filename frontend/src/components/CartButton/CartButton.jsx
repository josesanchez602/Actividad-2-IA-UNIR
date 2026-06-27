import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartOpened from "../CartOpened/CartOpened";
import "./CartButton.css";

export default function CartButton() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="cart-button"
        onClick={() => setOpen(true)}
      >
        <span className="icon">🛒</span>

        {totalItems() > 0 && (
          <span className="badge">
            {totalItems()}
          </span>
        )}
      </button>

      <CartOpened open={open} setOpen={setOpen} />
    </>
  );
}