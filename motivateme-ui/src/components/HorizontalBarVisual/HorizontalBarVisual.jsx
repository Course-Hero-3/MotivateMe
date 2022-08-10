import React from "react";
import "./HorizontalBarVisual.css";
import { Bar } from "react-chartjs-2";

export default function HorizontalBarVisual({
  labels,
  label,
  xAxisLabel,
  yAxisLabel,
  actualData,
  colors,
  colorModeState
}) {
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
        indexAxis: "y",
        legend: {
          display: false,
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
            title: {
              color: `${colorModeState==="dark"?"white":"black"}`,
              display: true,
              text: yAxisLabel,
            },
          },
          x: {
            grid: {
              color: `${colorModeState === "dark" ? "#333944" : "lightgray"}`,
            },
            ticks: {
              color: `${colorModeState==="dark"?"white":"black"}`
            },
            title: {
              color: `${colorModeState==="dark"?"white":"black"}`,
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
