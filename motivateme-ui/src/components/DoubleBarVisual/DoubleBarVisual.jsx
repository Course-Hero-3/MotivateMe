import React from 'react'
import "./DoubleBarVisual.css"
import { Bar } from "react-chartjs-2"

    
export default function DoubleBarVisual( { labels, label, actualData, colors1, colors2 } ) {
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
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "in Percent (%)"
                    }
                }
            }
        }}
        height={400}
        width={600}
        />
  )
}
