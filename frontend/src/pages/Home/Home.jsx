import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/catalog");
  };
 useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/catalog");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate])
  return (
    <div className="home">
      <h1 className="title">Bienvenido a la tienda de libros</h1>

      <h2 className="subtitle">
        Redirigiendo en 5 segundos
      </h2>
      <div className="loader"></div>

      <button className="button" onClick={handleNavigate}>
        Acceder al catálogo
      </button>
    </div>
  );
}