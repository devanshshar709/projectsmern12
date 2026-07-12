import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "2ab57ab395107879708af8a4eaa7dcef";

  const getWeather = async () => {
    if (city.trim() === "") {
      alert("Please Enter City Name");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 404 || data.cod === "404") {
        setError("City Not Found");
        setWeather(null);
      } else if (data.cod === 401 || data.cod === "401") {
        setError("Invalid API Key");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Something Went Wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="weather-box">

        <h1>🌤 Weather App</h1>

        <div className="input-group">

          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />

          <button onClick={getWeather}>
            <FaSearch />
          </button>

        </div>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="card">

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
            />

            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <h1>{weather.main.temp}°C</h1>

            <h3 style={{ textTransform: "capitalize" }}>
              {weather.weather[0].description}
            </h3>

            <div className="details">

              <p>🌡 Feels Like : {weather.main.feels_like}°C</p>

              <p>💧 Humidity : {weather.main.humidity}%</p>

              <p>💨 Wind Speed : {weather.wind.speed} km/h</p>

              <p>🌍 Pressure : {weather.main.pressure} hPa</p>

              <p>🔺 Max Temp : {weather.main.temp_max}°C</p>

              <p>🔻 Min Temp : {weather.main.temp_min}°C</p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;