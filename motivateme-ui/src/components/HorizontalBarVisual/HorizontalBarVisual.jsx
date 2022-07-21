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
            beginAtZero: true,
            title: {
              display: true,
              text: yAxisLabel,
            },
          },
          x: {
            title: {
              display: true,
              text: xAxisLabel,
            },
          },
        },
      }}
      height={400}
      width={600}
    />
  );
}
