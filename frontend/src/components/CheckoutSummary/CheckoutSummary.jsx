import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiOrders";
import "./CheckoutSummary.css";

export default function CheckoutSummary() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [buyer, setBuyer] = useState("");

  const handleBuyClick = () => {
    if (cart.length === 0) return;
    setShowForm(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const booksIds = cart.flatMap((item) =>
        Array(item.quantity).fill(item.id)
      );

      const order = {
        buyer,
        books: booksIds,
      };
      console.log("Order data:", order);
      await createOrder(order);

      clearCart();

      setShowForm(false);

      navigate("/catalog");
    } catch (error) {
      console.error("Error creating order", error);
      alert("Hubo un error al crear el pedido, no hay stock suficiente de alguno de los productos.");
    }
  };

  return (
    <div className="checkout-summary">

      <h2>Resumen</h2>

      <p>Productos: {totalItems()}</p>

      <p className="total">
        Total: {totalPrice().toFixed(2)} €
      </p>

      <button className="buy-button" onClick={handleBuyClick}>
        Finalizar compra
      </button>

      {/* MODAL SIMPLE */}
      {showForm && (
        <div className="order-modal">
          <div className="order-box">

            <h3>Datos del pedido</h3>

            <input
              type="text"
              placeholder="Nombre / Email"
              value={buyer}
              onChange={(e) => setBuyer(e.target.value)}
            />

            <button onClick={handleConfirmOrder}>
              Confirmar pedido
            </button>

            <button onClick={() => setShowForm(false)}>
              Cancelar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}