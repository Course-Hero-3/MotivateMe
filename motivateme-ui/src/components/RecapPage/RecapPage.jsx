import React from 'react'
import "./RecapPage.css"
import Chart from 'chart.js/auto'   // NEED THIS for all graphs to be "registered"

import BarVisual from "../BarVisual/BarVisual"
import PieVisual from "../PieVisual/PieVisual"
import LineVisual from '../LineVisual/LineVisual'
import DoughnutVisual from "../DoughnutVisual/DoughnutVisual"

const generateColorList = (amount) => {
    let fillColor = []
    let borderColor = []
    let colorsGenerated = ""
    for (let i = 0; i < amount; i++) {
        colorsGenerated = `${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}`
        fillColor.push(`rgba(${colorsGenerated}, 0.2)`)
        borderColor.push(`rgba(${colorsGenerated}, 1.0)`)
      }
    console.log("1", fillColor, "2", borderColor)
    return [fillColor, borderColor]
}

const generateSpecificChart = (chartData) => {
    // chartData look something like {type,   label,    labels,    actualData}
    //                               (graph) (title) (categories)  (stats)
    if (chartData.type === "bar") {
        return <BarVisual 
        label={label}
        labels={labels}
        actualData={actualData}
        colors={generateColorList(3)} />
    }
    else if (chartData.type === "pie") { 
        return <PieVisual 
        label={label}
        labels={labels}
        actualData={actualData}
        colors={generateColorList(3)} />
    }
    else if (chartData.type === "line") { 
        return <LineVisual 
        label={label}
        labels={labels}
        actualData={actualData}
        colors={generateColorList(3)} />
    }
    else if (chartData.type === "doughnut") { 
        return <DoughnutVisual 
        label={label}
        labels={labels}
        actualData={actualData}
        colors={generateColorList(3)} />
    }
    // and so on.
}

export default function RecapPage() {
  return (
    <div>
        <h1>
            Recap Page (Change this whole tag to whatever the other pages look like)
        </h1>
        {/* Here we can map through x amount of the returned results from the recap
        endpoint and it will return what type of chart it should be displayed as... */}
        <BarVisual colors={generateColorList(3)} />
        <PieVisual colors={generateColorList(3)} />
        <LineVisual colors={generateColorList(3)} />
        <DoughnutVisual colors={generateColorList(3)} />
    </div>
  )
}
