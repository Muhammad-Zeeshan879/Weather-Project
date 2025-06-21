import { useEffect, useState } from "react";

export default function Forecast({ city, unit }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      const apiKey = "ac46846f92b652500ce383c3d3519bc2";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
      try {
        const res = await fetch(url);
        const data = await res.json();

        // Filter to get one forecast per day (e.g. 12:00 PM)
        const daily = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(daily);
      } catch (err) {
        console.error("Forecast error:", err);
      }
    };

    fetchForecast();
  }, [city, unit]);

  if (!forecast.length) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br text-white px-4 pb-10">
      <div className="max-w-4xl mx-auto mt-10 px-2 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow text-center text-white flex flex-col items-center"
            >
              <p className="text-sm font-light">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="icon"
                className="mx-auto w-16 h-16"
              />
              <p className="text-lg font-bold">
                {Math.round(day.main.temp)}°
                {unit === "metric" ? "C" : "F"}
              </p>
              <p className="text-sm">{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="w-full text-center mt-8 mb-2 text-xs text-white/70">
        &copy; {new Date().getFullYear()} Muhammad Zeeshan
      </footer>
    </div>
  );
}
