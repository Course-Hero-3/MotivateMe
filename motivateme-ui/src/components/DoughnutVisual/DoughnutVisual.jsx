import React from 'react'
import "./DoughnutVisual.css"
import { Doughnut } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';

    
    

export default function DoughnutVisual( { labels, label, actualData, colors } ) {
    // take in these 3 props when we render all visuals
  return (
        <Doughnut 
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
        plugins={[ChartDataLabels]}
        options={{
            animation: {
                animateRotate: true,
                animateScale: false // cool animations but do we want them both?
            },
            responsive: false,
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        return value;
                    }
                }
            }
        //     scales: {
        //         y: {
        //             beginAtZero: true
        //         }
        //     }
        }}
        height={450}
        width={600}
        />
  )
}
