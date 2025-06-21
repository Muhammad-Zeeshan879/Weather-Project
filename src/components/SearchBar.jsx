import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity(""); // clear input
  };

  return (
    <div className="flex justify-center mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg max-w-md w-full"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white outline-none text-lg px-2"
        />
        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition duration-300"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
