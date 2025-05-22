"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("Nairobi");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch weather");
      setWeather(data);
    } catch (err: any) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-200">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center text-primary">Weather App</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name"
            className="input input-bordered w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {weather && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{weather.city}</h2>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Condition: {weather.description}</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind Speed: {weather.wind_speed} m/s</p>
              <div className="flex justify-center mt-4">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

