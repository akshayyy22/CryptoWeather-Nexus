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
  city: string;
  data: { date: string; max: number; min: number }[];
}

export default function WeatherChart({ city, data }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md mt-8 text-zinc-900 dark:text-zinc-100">
      <h3 className="text-xl font-semibold mb-4">
        {city} – Last 7 Days Temperature
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#f87171"
            name="Max Temp"
          />
          <Line
            type="monotone"
            dataKey="min"
            stroke="#60a5fa"
            name="Min Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
