// components/HourlyForecastChart.tsx
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { hour: string; temp: number; uv: number; precip: number }[];
  city: string;
}

export default function HourlyForecastChart({ city, data }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md mt-8 text-zinc-900 dark:text-zinc-100">
      <h3 className="text-xl font-semibold mb-4">
        {city} – Next 24 Hours Forecast
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#facc15"
            name="Temp °C"
          />
          <Line type="monotone" dataKey="uv" stroke="#f472b6" name="UV Index" />
          <Line
            type="monotone"
            dataKey="precip"
            stroke="#60a5fa"
            name="Precip (mm)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
