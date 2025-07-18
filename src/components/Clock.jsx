import { useState, useEffect } from "react";
import "../Clock.css";

function getFormattedTime() {
  return new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });
}

export default function Clock() {
  const [time, setTime] = useState(getFormattedTime());
  const [temp, setTemp] = useState(null);
  const [locationName, setLocationName] = useState("");

  const API_KEY = import.meta.env.VITE_OWM_KEY;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        if (data.main && typeof data.main.temp === "number") {
          setTemp(Math.round(data.main.temp));
          setLocationName(data.name);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
        err => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, [API_KEY]);

  return (
    <div className="circle">
      <span id="time">{time}</span>
      {locationName && <p id="location">📍{locationName}</p>}
      <p id="info">{temp !== null ? `${temp}°C` : "Loading"}</p>
    </div>
  );
}