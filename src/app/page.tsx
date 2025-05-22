"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState("Nairobi");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-UK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${city}&unit=${unit}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch weather");
      setWeather(data);
      await fetchForecast(); // Get forecast too
    } catch (err: any) {
      setWeather(null);
      setForecast([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/forecast?city=${city}&unit=${unit}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch forecast");
      setForecast(data);
    } catch (err: any) {
      console.error("Forecast fetch error:", err.message);
      setForecast([]);
    }
  };

  const toggleUnit = (selectedUnit: string) => {
    setUnit(selectedUnit);
  };

  useEffect(() => {
    fetchWeather();
  }, [unit]);

  return (
    <main className="min-h-screen bg-base-200 p-4 flex justify-center items-center">
      <div className="w-full max-w-5xl">
        {/* Search Bar and Unit Toggle */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search city..."
            className="input input-bordered flex-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchWeather}>
            GO
          </button>
          <div className="flex gap-2">
            <button
              className={`btn ${unit === "metric" ? "btn-active" : ""}`}
              onClick={() => toggleUnit("metric")}
            >
              °C
            </button>
            <button
              className={`btn ${unit === "imperial" ? "btn-active" : ""}`}
              onClick={() => toggleUnit("imperial")}
            >
              °F
            </button>
          </div>
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {weather && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1: Current Weather */}
            <div className="flex flex-col items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt="Weather icon"
                className="w-32 h-32"
              />
              <h2 className="text-4xl font-bold">
                {weather.temperature}°{unit === "metric" ? "C" : "F"}
              </h2>
              <p className="text-xl capitalize">{weather.description}</p>
              <div className="text-sm text-gray-500 mt-2 text-center">
                {formatDate()} <br /> {weather.city}
              </div>
            </div>

            {/* Column 2: 3-Day Forecast */}
            <div className="md:col-span-1 grid grid-cols-3 gap-4 text-center">
              {forecast.map((day, idx) => (
                <div key={idx} className="card bg-base-100 shadow-md p-4">
                  <p className="font-semibold text-sm">{day.date}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt="Forecast icon"
                    className="mx-auto"
                  />
                  <p className="text-xs capitalize">{day.description}</p>
                  <p className="text-sm">
                    {day.temp_min.toFixed(1)}° / {day.temp_max.toFixed(1)}°
                  </p>
                </div>
              ))}
            </div>

            {/* Column 3: Wind + Humidity */}
            <div className="grid gap-4">
              <div className="card bg-base-100 shadow-md p-4">
                <h3 className="text-lg font-semibold">Wind Status</h3>
                <p className="text-xl">{weather.wind_speed} km/h</p>
              </div>

              <div className="card bg-base-100 shadow-md p-4">
                <h3 className="text-lg font-semibold">Humidity</h3>
                <p className="text-xl">{weather.humidity}%</p>
                <progress
                  className="progress progress-primary w-full mt-2"
                  value={weather.humidity}
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

