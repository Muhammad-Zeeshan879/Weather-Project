import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaTemperatureLow } from "react-icons/fa";

export default function CurrentWeather({ weather, unit }) {
  if (!weather) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    weather: weatherArr,
    wind: { speed },
  } = weather;

  const condition = weatherArr[0].main;
  const icon = `https://openweathermap.org/img/wn/${weatherArr[0].icon}@2x.png`;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{name}, {country}</h2>
          <p className="text-sm opacity-80">{condition}</p>
        </div>
        <img src={icon} alt="weather-icon" className="w-16 h-16" />
      </div>

      <div className="text-center mt-4">
        <h1 className="text-5xl font-bold">
          {Math.round(temp)}°{unit === "metric" ? "C" : "F"}
        </h1>
        <p className="text-sm opacity-90">
          Feels like {Math.round(feels_like)}°{unit === "metric" ? "C" : "F"}
        </p>
      </div>

      <div className="flex justify-around mt-6 text-sm">
        <div className="flex items-center gap-1">
          <WiHumidity size={24} /> {humidity}% Humidity
        </div>
        <div className="flex items-center gap-1">
          <WiStrongWind size={24} /> {speed} m/s Wind
        </div>
      </div>
    </div>
  );
}
