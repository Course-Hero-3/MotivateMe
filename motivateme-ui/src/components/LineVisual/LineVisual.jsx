import React from "react";
import "./LineVisual.css";
import { Line } from "react-chartjs-2";

export default function LineVisual({
  labels,
  label,
  yAxisLabel,
  xAxisLabel,
  actualData,
  colors,
  colorModeState,
}) {
  // take in these 3 props when we render all visuals
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: label,
            data: actualData,
            backgroundColor: colors[0],
            borderColor: colors[1],
            borderWidth: 3,
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
              color: `${colorModeState === "dark" ? "white" : "black"}`,
            },
            beginAtZero: true,
            title: {
              color: `${colorModeState === "dark" ? "white" : "black"}`,
              display: true,
              text: yAxisLabel,
            },
          },
          x: {
            grid: {
              color: `${colorModeState === "dark" ? "#333944" : "lightgray"}`,
            },
            ticks: {
              color: `${colorModeState === "dark" ? "white" : "black"}`,
            },
            title: {
              color: `${colorModeState === "dark" ? "white" : "black"}`,
              display: true,
              text: xAxisLabel,
            },
          },
        },
      }}
      height={370}
      width={410}
    />
  );
}
