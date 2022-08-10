import React from 'react'
import "./DoubleBarVisual.css"
import { Bar } from "react-chartjs-2"

    
export default function DoubleBarVisual( { labels, label, actualData, colors1, colors2, colorModeState } ) {
    // take in these 3 props when we render all visuals
  return (
        <Bar 
        data={{
            labels: labels,
            datasets: [{
                label: label[0],
                data: actualData[0],
                backgroundColor: colors1[0],
                borderColor: colors1[1],
                borderWidth: 1
            }, {
                label: label[1],
                data: actualData[1],
                backgroundColor: colors2[0],
                borderColor: colors2[1],
                borderWidth: 1
            }]
        }}
        options={{
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
                        text: "in Percent (%)"
                    }
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
            plugins: {
                legend: {
                    labels: {
                      color: `${colorModeState === "dark" ? "white" : "black"}`,
                    },
                  }
            }
        }}
        height={370}
        width={410}
        />
  )
}
