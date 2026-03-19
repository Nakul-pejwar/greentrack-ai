"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EmissionsChartProps {
  type: "line" | "bar";
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string | string[];
      backgroundColor?: string | string[];
      fill?: boolean;
    }[];
  };
  title?: string;
}

export default function EmissionsChart({ type, data, title }: EmissionsChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#9CA3AF", // Tailwind gray-400
        },
      },
      title: {
        display: !!title,
        text: title || "",
        color: "#F3F4F6", // Tailwind gray-100
      },
    },
    scales: {
      y: {
        grid: { color: "#374151" }, // Tailwind gray-700
        ticks: { color: "#9CA3AF" },
      },
      x: {
        grid: { color: "#374151" },
        ticks: { color: "#9CA3AF" },
      },
    },
  };

  return (
    <div className="w-full h-full min-h-[300px] p-4 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
      {type === "line" ? <Line options={options} data={data} /> : <Bar options={options} data={data} />}
    </div>
  );
}
