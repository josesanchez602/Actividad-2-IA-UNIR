import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ Añadir libro
  const addBook = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);

      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  // ➖ Restar o eliminar una unidad
  const removeBook = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);

      if (!existingBook) return prevCart;

      if (existingBook.quantity === 1) {
        return prevCart.filter((item) => item.id !== book.id);
      }

      return prevCart.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  // ❌ Eliminar completamente un libro
  const removeAllOfBook = (book) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== book.id));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };
  const totalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addBook,
        removeBook,
        removeAllOfBook,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
