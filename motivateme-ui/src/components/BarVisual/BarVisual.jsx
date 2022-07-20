import React from 'react'
import "./BarVisual.css"
import { Bar } from "react-chartjs-2"

    
export default function BarVisual( { labels, label, actualData, colors } ) {
    // take in these 3 props when we render all visuals
  return (
        <Bar 
        data={{
            labels: labels,
            datasets: [{
                label: label,
                data: actualData,
                backgroundColor: colors[0],
                borderColor: colors[1],
                borderWidth: 1
            }]
        }}
        options={{
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }}
        height={400}
        width={600}
        />
  )
}
