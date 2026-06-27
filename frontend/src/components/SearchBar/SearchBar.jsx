import { useSearch } from "../../context/SearchContext";
import "./SearchBar.css";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Buscar libros..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}