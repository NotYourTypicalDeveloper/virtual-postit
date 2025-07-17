import { useEffect, useState } from "react";
import { convertKelvinToCelsius } from "../../utils/functions.js";

import clear_icon from "../../assets/weather-icons/clear.png";
import cloud_icon from "../../assets/weather-icons/cloud.png";
import drizzle_icon from "../../assets/weather-icons/drizzle.png";
import rain_icon from "../../assets/weather-icons/rain.png";
import snow_icon from "../../assets/weather-icons/snow.png";

const WeatherWidget = () => {
  const openWeatherBaseURL = "https://api.openweathermap.org/data/2.5/weather";
  const [weatherData, setWeatherData] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { humidity, windSpeed, temperature, location, icon } = weatherData;

  const allWeatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchWeatherData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("data ===> ", data);
      if (!res.ok) {
        setErrorMsg(data.message);
        return;
      }
      if (errorMsg) {
        setErrorMsg(null);
      }

      const currentIcon = allWeatherIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: currentIcon,
      });
    } catch (err) {
      setWeatherData(false);
      console.log(err);
    }
  };

  const initWeatherFetch = async (latitude, longitude) => {
    const urlGeoloc = `${openWeatherBaseURL}/?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_APP_API_KEY
    }
    `;

    fetchWeatherData(urlGeoloc);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          initWeatherFetch(position.coords.latitude, position.coords.longitude);
        } else {
          // if user didn't activated geoloc, set Paris, FR by default
          initWeatherFetch(48.8575, 2.3514);
        }
      });
    }
  }, []);

  return (
    <>
      <button
        className="navbar-btn weather-btn"
        style={{ textTransform: "Capitalize" }}
      >
        {weatherData ? (
          <>
            <img
              className="weather-icon-navbar"
              src={icon}
              alt={"weather icon"}
            />
            {convertKelvinToCelsius(temperature)}°C {location}
          </>
        ) : (
          "weather"
        )}
      </button>
    </>
  );
};

export default WeatherWidget;
