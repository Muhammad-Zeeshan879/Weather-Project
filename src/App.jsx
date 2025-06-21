import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import axios from "axios";
import Forecast from "./components/Forecast";
import GetBackground from "./utils/GetBackground";


function App() {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // 🔸 loading state
  const [error, setError] = useState("");        // 🔸 error state

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weather-history"));
    if (saved) setHistory(saved);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("weather-history", JSON.stringify(history));
  }, [history]);

  // Save last weather to localStorage whenever it changes
  useEffect(() => {
    if (weather) {
      localStorage.setItem("last-weather", JSON.stringify(weather));
    }
  }, [weather]);

  useEffect(() => {
    const savedWeather = JSON.parse(localStorage.getItem("last-weather"));
    if (savedWeather) setWeather(savedWeather);
  }, []);

  const handleCitySearch = async (city) => {
    setLoading(true);
    setError("");
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // ✅ from .env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setHistory((prev) => {
        const updated = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // ✅ from .env
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to get location weather.");
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          setError("Failed to get location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied or location error.");
        setLoading(false);
      }
    );
  };
  const bgGradient = weather
    ? GetBackground(weather.weather[0].main)
    : "from-blue-900 to-indigo-900";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgGradient} text-white px-4`}
    >
      <h1 className="text-center text-4xl font-bold pt-6">Weather App</h1>
      <SearchBar onSearch={handleCitySearch} />
      {history.length > 0 && (
        <div className="mt-4 flex justify-center flex-wrap gap-3 text-sm text-white">
          {history.map((city, i) => (
            <button
              key={i}
              onClick={() => handleCitySearch(city)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              {city}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={handleGeoLocation}
        className="mx-auto block mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition"
      >
        Use My Location
      </button>

      {loading && (
        <p className="text-center text-white mt-6 animate-pulse">
          Fetching weather data...
        </p>
      )}

      {error && (
        <p className="text-center text-red-400 mt-6">{error}</p>
      )}

      <div className="flex justify-center mt-4 gap-2 text-white items-center">
        <span className={unit === "metric" ? "font-bold" : "opacity-70"}>°C</span>
        <button
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          className="w-10 h-6 bg-white/20 rounded-full relative transition duration-300"
          aria-label="Toggle temperature unit"
          type="button"
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0 transition-all duration-300 ${
              unit === "metric" ? "left-0" : "left-5"
            }`}
          ></div>
        </button>
        <span className={unit === "imperial" ? "font-bold" : "opacity-70"}>°F</span>
      </div>

      <CurrentWeather weather={weather} unit={unit} />
      <Forecast city={weather?.name} unit={unit} />
    </div>
  );

}

export default App;
