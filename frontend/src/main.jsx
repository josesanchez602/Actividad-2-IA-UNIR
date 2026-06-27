import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { SearchProvider } from "./context/SearchContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </SearchProvider>
);