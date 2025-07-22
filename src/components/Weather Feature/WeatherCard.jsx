import { useRef } from "react";
import search_icon from "../../assets/search.png";
import humidity_icon from "../../assets/weather-icons/humidity.png";
import wind_icon from "../../assets/weather-icons/wind.png";

import "./weathercard.scss";

function WeatherCard({ currWeatherData, fetchWeatherByCity, errorMsg }) {
  const searchInputRef = useRef();

  const { humidity, windSpeed, temperature, location, icon } = currWeatherData;

  return (
    <div className="weather-card-ctnr">
      <div>
        <div className="search-bar">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Type city name"
          />
          <img
            src={search_icon}
            alt="search icon"
            onClick={() => fetchWeatherByCity(searchInputRef.current.value)}
          />
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
      {currWeatherData && (
        <div>
          <img src={icon} alt={`${icon} icon`} />
          <p className="temperature">{temperature}°C </p>
          <p className="location">{location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{windSpeed} km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
