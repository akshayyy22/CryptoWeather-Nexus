"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import WeatherCard from "@/components/weather/WeatherCard";
import { cities, City } from "@/store/cities";
import WeatherChart from "@/components/weather/WeatherChart";
import HourlyForecastChart from "@/components//weather/HourlyForecastChart";
import { Toaster, toast } from "react-hot-toast";
import DynamicAlert from "@/components/ui/DynamicAlert";

export default function WeatherPage() {
  const [data, setData] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const endDate = today.toISOString().split("T")[0];
  const startDate = new Date(today.getTime() - 6 * 86400000)
    .toISOString()
    .split("T")[0];

  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      setFavorites(updated);
      localStorage.setItem("favouriteCities", JSON.stringify(updated));
      toast.success(`Added ${city} to favorites!`);
    } else {
      toast(`${city} is already in favorites`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weathercode,wind_speed_10m,pressure_msl&hourly=temperature_2m,precipitation,uv_index&daily=sunrise,sunset&timezone=auto`;

            const res = await axios.get(url);
            const current = res.data.current;

            const historyUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${city.latitude}&longitude=${city.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
            const histRes = await axios.get(historyUrl);

            const daily = res.data.daily;
            const hourly = res.data.hourly;

            return {
              city: city.name,
              temperature: current.temperature_2m,
              humidity: current.relative_humidity_2m,
              weatherCode: current.weathercode,
              windSpeed: current.wind_speed_10m,
              pressure: current.pressure_msl,
              uv: current.uv_index,
              precipitation: current.precipitation,
              sunrise: daily.sunrise[0],
              sunset: daily.sunset[0],
              history: histRes.data.daily,
              hourly: hourly, // forward full hourly set
            };
          })
        );
        setData(weatherData);
        setHistory(
          weatherData.map((d) => ({
            city: d.city,
            chartData: d.history.time.map((date: string, i: number) => ({
              date,
              max: d.history.temperature_2m_max[i],
              min: d.history.temperature_2m_min[i],
            })),
          }))
        );
      } catch (e) {
        console.error("Weather fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100 dark:bg-black transition-colors">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Weather Dashboard
      </h1>

      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-300">
          Loading weather data...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((weather, i) => (
              <WeatherCard key={i} {...weather} onFavorite={handleFavorite} />
            ))}
          </div>

          {history.map((cityHist, i) => (
            <WeatherChart
              key={i}
              city={cityHist.city}
              data={cityHist.chartData}
            />
          ))}

          {/* Hourly Forecast Charts */}
          {data.map((weather, i) => (
            <HourlyForecastChart
              key={`hourly-${i}`}
              city={weather.city}
              data={weather.hourly.time
                .slice(0, 24)
                .map((t: string, idx: number) => ({
                  hour: t.split("T")[1],
                  temp: weather.hourly.temperature_2m[idx],
                  uv: weather.hourly.uv_index[idx],
                  precip: weather.hourly.precipitation[idx],
                }))}
            />
          ))}
        </>
      )}
      <DynamicAlert />
    </div>
  );
}
