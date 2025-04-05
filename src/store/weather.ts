import axios from "axios";
import { City } from "./cities";

export const fetchCurrentWeather = async (city: City) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weathercode`;
  const response = await axios.get(url);
  return response.data.current;
};

export const fetchWeatherHistory = async (
  city: City,
  startDate: string,
  endDate: string
) => {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${city.latitude}&longitude=${city.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  const response = await axios.get(url);
  return response.data.daily;
};
