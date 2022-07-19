import React from 'react'
import "./DoughnutVisual.css"
import { Doughnut } from "react-chartjs-2"
    
    

export default function DoughnutVisual( { labels, label, actualData, colors } ) {
    // take in these 3 props when we render all visuals
  return (
        <Doughnut 
        data={{
            labels: ["homework", "exam", "quiz"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 5],
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
