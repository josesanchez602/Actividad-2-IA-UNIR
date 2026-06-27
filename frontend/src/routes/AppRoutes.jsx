import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Catalog from "../pages/Catalog/Catalog";
import BookDetail from "../pages/BookDetail/BookDetail";
import Checkout from "../pages/Checkout/Checkout";

import MainLayout from "./MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME sin navbar */}
        <Route path="/" element={<Home />} />

        {/* Rutas con navbar */}
        <Route element={<MainLayout />}>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}