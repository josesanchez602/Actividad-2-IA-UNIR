const BASE_URL = "http://localhost:8080/api/books";

// 📚 Obtener todos los libros
export const getBooks = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Error fetching books");
  }

  return await response.json();
};

// 📖 Obtener libro por ID
export const getBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching book");
  }

  return await response.json();
};