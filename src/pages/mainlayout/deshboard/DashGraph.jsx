import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function DashGraph({data ,options}) {
  return (
    <div className="w-[38rem] bg-primary text-primary-foreground flex flex-col justify-between h-full border-2 rounded-md p-4">
      <h3 className="text-lg font-bold">Clients Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DashGraph;