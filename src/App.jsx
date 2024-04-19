import React, { useState, useEffect } from "react";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from "react-icons/fa";

function WeatherCard({ city, temperature, condition }) {
  const iconSize = 30;

  const weatherIcons = {
    Clear: <FaSun size={iconSize} className="text-yellow-500" />,
    Clouds: <FaCloud size={iconSize} className="text-gray-500" />,
    Rain: <FaCloudRain size={iconSize} className="text-blue-500" />,
    Snow: <FaSnowflake size={iconSize} className="text-blue-300" />,
  };

  return (
    <div className="card bg-base-100 shadow-xl m-4">
      <div className="card-body">
        <h2 className="card-title">{city}</h2>
        <p>{temperature} °C</p>
        <p className="flex items-center justify-center">
          {weatherIcons[condition] || <FaSun size={iconSize} />}
          {condition}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = [
      { name: "London", latitude: 51.5074, longitude: -0.1278 },
      { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
      { name: "Berlin", latitude: 52.52, longitude: 13.405 },
      { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
      { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
    ];

    Promise.all(
      cities.map((city) =>
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`)
          .then((res) => res.json())
          .then((data) => ({
            city: city.name,
            temperature: data.current_weather.temperature,
            condition: data.current_weather.weathercode,
          })),
      ),
    ).then((results) => {
      setWeatherData(results);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">Weather in Major European Cities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {weatherData.map((data, index) => (
          <WeatherCard key={index} city={data.city} temperature={data.temperature} condition={data.condition} />
        ))}
      </div>
    </div>
  );
}

export default App;
