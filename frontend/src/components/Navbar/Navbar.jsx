import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import CartButton from "../CartButton/CartButton";


export default function Navbar() {
  return (
    <nav className="navbar">

      <NavLink to="/catalog" className="logo">
        Tienda de libros
      </NavLink>

      <div className="navbar-center">
        <SearchBar />
      </div>

      <div className="navbar-right">
        <span>Mi cuenta</span>
         <CartButton />
      </div>

    </nav>
  );
}