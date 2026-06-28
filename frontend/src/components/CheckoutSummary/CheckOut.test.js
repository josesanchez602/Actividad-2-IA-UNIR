import { useEffect } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CheckoutSummary from "./CheckoutSummary";
import { CartProvider, useCart } from "../../context/CartContext";
import { createOrder } from "../../services/apiOrders";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../services/apiOrders", () => ({
  createOrder: jest.fn(),
}));

function CartSeeder({ items }) {
  const { setCart } = useCart();

  useEffect(() => {
    setCart(items);
  }, [items, setCart]);

  return null;
}

function renderCheckout(items) {
  return render(
    <CartProvider>
      <CartSeeder items={items} />
      <CheckoutSummary />
    </CartProvider>,
  );
}

describe("CheckoutSummary", () => {
  const initialCart = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "Software",
      price: 10,
      cover: "/clean-code.jpg",
      quantity: 2,
    },
    {
      id: 2,
      title: "Refactoring",
      author: "Martin Fowler",
      genre: "Software",
      price: 15,
      cover: "/refactoring.jpg",
      quantity: 1,
    },
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
    createOrder.mockClear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("envía una petición POST al confirmar compra y completa el flujo de éxito", async () => {
    createOrder.mockResolvedValueOnce({ id: 123 });

    renderCheckout(initialCart);

    await screen.findByText("Productos: 3");

    fireEvent.click(
      screen.getByRole("button", { name: /finalizar compra/i }),
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre \/ Email"), {
      target: { value: "ana@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar pedido/i }),
    );

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith({
        buyer: "ana@example.com",
        books: [1, 1, 2],
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/catalog");
    });

    await waitFor(() => {
      expect(screen.getByText("Productos: 0")).toBeInTheDocument();
    });

    expect(screen.getByText("Total: 0.00 €")).toBeInTheDocument();
  });

  test.each([
    ["stock insuficiente", new Error("Stock insuficiente")],
    ["fallo de la petición", new Error("Network error")],
  ])("muestra el mensaje de error cuando hay %s", async (_label, error) => {
    createOrder.mockRejectedValueOnce(error);

    renderCheckout(initialCart);

    await screen.findByText("Productos: 3");

    fireEvent.click(
      screen.getByRole("button", { name: /finalizar compra/i }),
    );

    fireEvent.change(screen.getByPlaceholderText("Nombre \/ Email"), {
      target: { value: "ana@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar pedido/i }),
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Hubo un error al crear el pedido, no hay stock suficiente de alguno de los productos.",
      );
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});