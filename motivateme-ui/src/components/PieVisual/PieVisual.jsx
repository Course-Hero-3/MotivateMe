import React from 'react'
import "./PieVisual.css"
import { Pie } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';
    

export default function PieVisual( { labels, label, actualData, colors } ) {
    // take in these 3 props when we render all visuals
  return (
        <Pie 
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
                animateRotate: false,
                animateScale: true // cool animations but do we want them both?
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        const datapoints = ctx.chart.data.datasets[0].data
                        let sum = 0
                        datapoints.forEach((number) => {
                            sum+= Number(number)
                        })
                        const percentage = value / sum * 100
                        return percentage.toFixed(2) + "%";
                    }
                }
            }
            // having trouble show percentages inside pie chart

            // scales: {
            //     y: {
            //         beginAtZero: true
            //     }
            // }
        }}
        height={400}
        width={600}
        />
  )
}
