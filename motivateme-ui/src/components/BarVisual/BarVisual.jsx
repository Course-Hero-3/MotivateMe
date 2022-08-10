import React from "react";
import "./BarVisual.css";
import { Bar } from "react-chartjs-2";

export default function BarVisual({ labels, label, actualData, colors, colorModeState }) {
  // take in these 3 props when we render all visuals
  return (
    <Bar
      data={{
        labels: labels,
        datasets: [
          {
            label: label,
            data: actualData,
            backgroundColor: colors[0],
            borderColor: colors[1],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            grid: {
              color: `${colorModeState === "dark" ? "#333944" : "lightgray"}`,
            },
            ticks: {
              color: `${colorModeState==="dark"?"white":"black"}`
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              color: `${colorModeState === "dark" ? "#333944" : "lightgray"}`,
            },
            ticks: {
              color: `${colorModeState==="dark"?"white":"black"}`
            },
          }
        },
      }}
      height={370}
      width={410}
    />
  );
}
