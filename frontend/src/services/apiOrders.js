const BASE_URL = "http://localhost:8080/api/orders";

// 📦 Crear un nuevo pedido
export const createOrder = async (orderData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Error creating order");
  }

  return await response.json();
};

// 📋 Obtener todos los pedidos
export const getOrders = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Error fetching orders");
  }

  return await response.json();
};

// 🔍 Obtener pedido por ID
export const getOrderById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching order");
  }

  return await response.json();
};