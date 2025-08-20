import { useEffect, useState } from "react";

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

  const { temperature, location, icon } = weatherData;

  // Fallback coordinates set to Paris
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

  const getWeatherUrl = (coords, city) => {
    const baseURL = `${import.meta.env.VITE_APP_WEATHER_API_URL}?appid=${
      import.meta.env.VITE_APP_WEATHER_API_KEY
    }`;

    const fullURL = coords
      ? `${baseURL}&lat=${coords.latitude}&lon=${coords.longitude}&units=metric`
      : `${baseURL}&q=${city}&units=metric`;

    return fullURL;
  };

  const fetchWeatherData = async (url) => {
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

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: currentIcon,
      });
    } catch (err) {
      setWeatherData(false);
      setErrorMsg(err.message);
    }
  };

  const fetchWeatherByCity = async (city) => {
    if (city === "") {
      setErrorMsg("Enter city name");
      return;
    }

    fetchWeatherData(getWeatherUrl(null, city));
  };

  // Geolocation functions & options
  const successfulGeoloc = (pos) => {
    const coords = pos.coords;
    fetchWeatherData(getWeatherUrl(coords, null));
  };

  const errorGeoloc = () => {
    fetchWeatherData(getWeatherUrl(PARIS_COORDS, null));
  };

  const geolocOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (userPos) => successfulGeoloc(userPos),
        (err) => errorGeoloc(err),
        geolocOptions
      );
    } else {
      fetchWeatherData(getWeatherUrl(PARIS_COORDS, null));
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
          <span> {errorMsg} </span>
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
