"use client";

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface WeatherProps {
  city: string;
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}

function WeatherCard(props: WeatherProps) {
  const {
    city,
    temperature,
    humidity,
    weatherCode,
    windSpeed,
    pressure,
    sunrise,
    sunset,
  } = props;

  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favouriteCities") || "[]");
    setIsFavourited(stored.includes(city));
  }, [city]);

  const toggleFavourite = () => {
    const stored = JSON.parse(localStorage.getItem("favouriteCities") || "[]");

    let updated: string[];

    if (stored.includes(city)) {
      updated = stored.filter((c: string) => c !== city);
    } else {
      updated = [...stored, city];
    }

    localStorage.setItem("favouriteCities", JSON.stringify(updated));
    setIsFavourited(updated.includes(city));
    window.dispatchEvent(new Event("storage")); // trigger update across tabs/pages
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-5 relative transition">
      <button
        onClick={toggleFavourite}
        className="absolute top-4 right-4 text-red-500 text-xl"
        aria-label="Toggle Favourite"
      >
        {isFavourited ? <FaHeart /> : <FaRegHeart />}
      </button>

      <h2 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
        {city}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-300">
        Temperature: {temperature}°C
      </p>
      <p className="text-zinc-600 dark:text-zinc-300">Humidity: {humidity}%</p>
      {/* <p className="text-zinc-600 dark:text-zinc-300">
        Weather Code: {weatherCode}
      </p> */}
      <p className="text-zinc-600 dark:text-zinc-300">
        Wind Speed: {windSpeed} km/h
      </p>
      <p className="text-zinc-600 dark:text-zinc-300">
        Pressure: {pressure} hPa
      </p>
      <p className="text-zinc-600 dark:text-zinc-300">Sunrise: {sunrise}</p>
      <p className="text-zinc-600 dark:text-zinc-300">Sunset: {sunset}</p>
    </div>
  );
}

export default WeatherCard;
