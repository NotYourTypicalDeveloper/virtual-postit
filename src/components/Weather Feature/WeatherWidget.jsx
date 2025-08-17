import { useEffect, useState } from "react";
import { convertKelvinToCelsius } from "../../utils/functions.js";

import clear_icon from "../../assets/weather-icons/clear.png";
import cloud_icon from "../../assets/weather-icons/cloud.png";
import drizzle_icon from "../../assets/weather-icons/drizzle.png";
import rain_icon from "../../assets/weather-icons/rain.png";
import snow_icon from "../../assets/weather-icons/snow.png";
import CloseIcon from "../Icons/CloseIcon.jsx";

import "../Weather Feature/weatherWidget.scss";
import WeatherCard from "./WeatherCard.jsx";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [weatherModalIsOpen, setWeatherModalIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { temperature, location, icon, humidity, windSpeed } = weatherData;

  const PARIS_COORDS = { latitude: 48.8575, longitude: 2.3514 };

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

  const getWeatherUrl = ({ coords, city }) => {
    const baseURL = `${import.meta.env.VITE_APP_WEATHER_API_URL}`
      + `?appid=${import.meta.env.VITE_APP_WEATHER_API_KEY}`;

    return coords
      ? `${baseURL}&lat=${coords.latitude}&lon=${coords.longitude}`
      : `${baseURL}&q=${city}&units=metric`;
  };

  const fetchWeatherData = async (fetchByCity = false, url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message);
        return;
      }
      if (errorMsg) {
        setErrorMsg(null);
      }

      const currentIcon = allWeatherIcons[data.weather[0].icon] || clear_icon;
      //TODO might not need to convert if always using the '&units=metric' param
      const convertedTemperature = fetchByCity
        ? Math.floor(data.main.temp)
        : convertKelvinToCelsius(data.main.temp);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: convertedTemperature,
        location: data.name,
        icon: currentIcon,
      });
    } catch (err) {
      setWeatherData(false);
      console.log(err);
    }
  };

  // retrieve weather data based on user's location
  const initWeatherFetch = async (coords) => {
    fetchWeatherData(false, getWeatherUrl({ coords }));
  };

  const fetchWeatherByCity = async (city) => {
    if (city === "") {
      setErrorMsg("Enter city name");
      return;
    }

    fetchWeatherData(true, getWeatherUrl({ city }));
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position ? position.coords : PARIS_COORDS;

        initWeatherFetch(coords);
      });
    }
  }, []);

  return (
    <>
      <button
        className="weather-btn"
        style={{ textTransform: "Capitalize" }}
        onClick={() => setWeatherModalIsOpen(!weatherModalIsOpen)}
      >
        {weatherData ? (
          <>
            <img
              className="weather-icon-navbar"
              src={icon}
              alt={"weather icon"}
            />
            {temperature}°C {location}
          </>
        ) : (
          "weather"
        )}
      </button>
      {/* weather modal opens */}
      {weatherModalIsOpen && (
        <div className="info-overlay">
          <div className="weather-card-wrapper">
            <button
              className="close-weather-modal-btn"
              onClick={() => setWeatherModalIsOpen(false)}
            >
              <CloseIcon height="40" width="40" />
            </button>
            <WeatherCard
              currWeatherData={weatherData}
              fetchWeatherByCity={fetchWeatherByCity}
              errorMsg={errorMsg}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherWidget;
