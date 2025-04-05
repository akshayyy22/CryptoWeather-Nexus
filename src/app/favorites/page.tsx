"use client";

import DynamicAlert from "@/components/ui/DynamicAlert";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WeatherCard from "@/components/weather/WeatherCard";
import axios from "axios";

export default function FavouritePage() {
  const router = useRouter();
  const [favoriteCoins, setFavoriteCoins] = useState<any[]>([]);

  const [favourites, setFavourites] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getCityCoordinates = (name: string) => {
    const { cities } = require("@/store/cities");
    return cities.find((c: any) => c.name === name);
  };

  const loadFavourites = () => {
    const stored = localStorage.getItem("favouriteCities");
    const favs = stored ? JSON.parse(stored) : [];
    setFavourites(favs);
  };

  useEffect(() => {
    loadFavourites();

    const onStorageChange = () => loadFavourites();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") loadFavourites();
    });
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true);

      try {
        const res = await Promise.all(
          favourites.map(async (city) => {
            const coords = getCityCoordinates(city);
            if (!coords) return null;

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,weathercode,wind_speed_10m,pressure_msl&daily=sunrise,sunset&timezone=auto`;

            const result = await axios.get(url);
            const current = result.data.current;
            const daily = result.data.daily;

            return {
              city,
              temperature: current.temperature_2m,
              humidity: current.relative_humidity_2m,
              weatherCode: current.weathercode,
              windSpeed: current.wind_speed_10m,
              pressure: current.pressure_msl,
              sunrise: daily.sunrise[0],
              sunset: daily.sunset[0],
            };
          })
        );

        setData(res.filter(Boolean));
      } catch (err) {
        console.error("Error loading favourite data", err);
      } finally {
        setLoading(false);
      }
    };

    if (favourites.length > 0) {
      fetchFavourites();
    } else {
      setData([]);
      setLoading(false);
    }
  }, [favourites]);

  useEffect(() => {
    const storedCoins = localStorage.getItem("favorites");

    if (storedCoins) {
      setFavoriteCoins(JSON.parse(storedCoins));
    }
  }, []);

  const toggleCoinFavorite = (coin: any, event: React.MouseEvent) => {
    event.stopPropagation();
    const exists = favoriteCoins.some((fav) => fav.id === coin.id);
    const updatedFavorites = exists
      ? favoriteCoins.filter((fav) => fav.id !== coin.id)
      : [...favoriteCoins, coin];
    setFavoriteCoins(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isCoinFavorite = (id: string) =>
    favoriteCoins.some((coin) => coin.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favourites</h1>
      {/* Favorite Cities */}

      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        🌟 Your Favourite Cities
      </h1>

      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-300">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-300">No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {data.map((weather, i) => (
            <WeatherCard key={i} {...weather} />
          ))}
        </div>
      )}

      {/* Favorite Coins */}
      <div className="mb-35">
        <h2 className="text-xl font-semibold mb-4">Favourite Coins</h2>
        {favoriteCoins.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No favourite coins found.
          </p>
        ) : (
          <div className="border shadow-sm rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Icon</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">24h %</TableHead>
                  <TableHead className="text-right">Market Cap 24h %</TableHead>
                  <TableHead className="text-right">24h High</TableHead>
                  <TableHead className="text-right">24h Low</TableHead>
                  <TableHead className="text-right">Fav</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoriteCoins.map((coin: any) => (
                  <TableRow
                    key={coin.id}
                    onClick={() => router.push("/coin/" + coin.id)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <Image
                        src={
                          coin.image.replace("/large/", "/small/") || coin.image
                        }
                        alt={coin.symbol}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </TableCell>
                    <TableCell>{coin.symbol}</TableCell>
                    <TableCell className="text-right">
                      ${coin.current_price.toFixed(7)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        coin.market_cap_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.market_cap_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">
                      ${coin.high_24h.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${coin.low_24h.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={(e) => toggleCoinFavorite(coin, e)}
                        className="hover:scale-110 transition-all"
                      >
                        {isCoinFavorite(coin.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <DynamicAlert />
    </div>
  );
}
