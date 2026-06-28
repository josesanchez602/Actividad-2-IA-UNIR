import { useEffect } from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CartOpened from "./CartOpened";
import { CartProvider, useCart } from "../../context/CartContext";

function CartSeeder({ items }) {
  const { setCart } = useCart();

  useEffect(() => {
    setCart(items);
  }, [items, setCart]);

  return null;
}

function renderCart(items, setOpen = jest.fn()) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CartSeeder items={items} />
        <CartOpened open setOpen={setOpen} />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("CartOpened", () => {
  const baseBook = {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Software",
    price: 10,
    cover: "/clean-code.jpg",
    quantity: 1,
  };

  test("calcula correctamente el total del carrito", async () => {
    renderCart([
      { ...baseBook, id: 1, title: "Clean Code", price: 12.5, quantity: 2 },
      {
        ...baseBook,
        id: 2,
        title: "Refactoring",
        author: "Martin Fowler",
        price: 5,
        quantity: 1,
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText("TOTAL: 30.00€")).toBeInTheDocument();
    });

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Refactoring")).toBeInTheDocument();
  });

  test("actualiza cantidades correctamente al sumar y restar", async () => {
    renderCart([{ ...baseBook, quantity: 2 }]);

    await screen.findByText("Clean Code");

    expect(
      screen.getByText("2", { selector: ".quantity" }),
    ).toBeInTheDocument();
    expect(screen.getByText("TOTAL: 20.00€")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /\+/ }));

    expect(
      screen.getByText("3", { selector: ".quantity" }),
    ).toBeInTheDocument();
    expect(screen.getByText("TOTAL: 30.00€")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /-/ }));

    expect(
      screen.getByText("2", { selector: ".quantity" }),
    ).toBeInTheDocument();
    expect(screen.getByText("TOTAL: 20.00€")).toBeInTheDocument();
  });

  test("permite eliminar libros cuando la cantidad baja a cero", async () => {
    renderCart([{ ...baseBook, quantity: 1 }]);

    await screen.findByText("Clean Code");

    fireEvent.click(screen.getByRole("button", { name: /-/ }));

    await waitFor(() => {
      expect(screen.getByText("The cart is empty")).toBeInTheDocument();
    });
  });
});