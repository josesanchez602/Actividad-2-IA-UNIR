import { fireEvent, render, screen } from "@testing-library/react";
import BookCard from "./BookCard";

const mockNavigate = jest.fn();
const mockAddBook = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../context/CartContext", () => ({
  useCart: () => ({
    addBook: mockAddBook,
  }),
}));

describe("BookCard", () => {
  const book = {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Software",
    price: 32,
    cover: "/clean-code.jpg",
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockAddBook.mockClear();
  });

  test("renderiza el título del libro y el precio", () => {
    render(<BookCard book={book} />);

    expect(
      screen.getByRole("heading", { name: "Clean Code" }),
    ).toBeInTheDocument();
    expect(screen.getByText("32 €")).toBeInTheDocument();
  });

  test("al pulsar Añadir llama a addBook y no dispara la navegación", () => {
    render(<BookCard book={book} />);

    fireEvent.click(
      screen.getByRole("button", { name: /añadir al carrito/i }),
    );

    expect(mockAddBook).toHaveBeenCalledTimes(1);
    expect(mockAddBook).toHaveBeenCalledWith(book);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});