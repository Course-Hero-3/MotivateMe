import React from 'react'
import "./RecapPage.css"
import Chart from 'chart.js/auto'   // NEED THIS for all graphs to be "registered"

import BarVisual from "../BarVisual/BarVisual"
import HorizontalBarVisual from '../HorizontalBarVisual/HorizontalBarVisual'
import DoubleBarVisual from '../DoubleBarVisual/DoubleBarVisual'
import PieVisual from "../PieVisual/PieVisual"
import DoughnutVisual from "../DoughnutVisual/DoughnutVisual"
import LineVisual from '../LineVisual/LineVisual'

import apiClient from '../../../services/apiclient'

// perhaps use a different variable which keeps track 
// of which index you left off on if we want to 
// implement a "load more" feature
// Think about: what happens to the variable if we refresh?

// right now we are always showing 4 no matter what (hard coded in function call)
const randomizeAndReturnItemsInArray = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const generateColorList = (amount) => {
    let fillColor = []
    let borderColor = []
    let colorsGenerated = ""
    for (let i = 0; i < amount; i++) {
        colorsGenerated = `${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}, ${Math.random() * (255 - 0) + 0}`
        fillColor.push(`rgba(${colorsGenerated}, 0.2)`)
        borderColor.push(`rgba(${colorsGenerated}, 1.0)`)
      }
    return [fillColor, borderColor]
}

const generateSpecificChart = (chartData) => {
    // chartData look something like {type,   label,    labels,    actualData}
    //                               (graph) (title) (categories)  (stats)
    if (chartData.type === "bar") {
        return <BarVisual 
        label={chartData.label}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors={generateColorList(chartData.labels.length)} />
    }
    else if (chartData.type === "pie") { 
        return <PieVisual 
        label={chartData.label}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors={generateColorList(chartData.labels.length)} />
    }
    else if (chartData.type === "line") { 
        return <LineVisual 
        label={chartData.label}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors={generateColorList(chartData.labels.length)} />
    }
    else if (chartData.type === "doughnut") { 
        return <DoughnutVisual 
        label={chartData.label}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors={generateColorList(chartData.labels.length)} />
    }
    else if (chartData.type === "horizontalBar") {
        return <HorizontalBarVisual 
        label={chartData.label}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors={generateColorList(chartData.labels.length)} />
    }
    else if (chartData.type === "doubleBar") {
        let updatedLabel = [[], []]
        if (chartData.label === "Max and Min per Category") {
            updatedLabel[0] = "Minimum"
            updatedLabel[1] = "Maximum"
        }

        return <DoubleBarVisual
        label={updatedLabel}
        labels={chartData.labels}
        actualData={chartData.actualData}
        colors1={generateColorList(1)}
        colors2={generateColorList(1)} />
    }
    // and so on.
}

export default function RecapPage( { setCurrPage } ) {
    const [facts, setFacts] = React.useState(null)

    React.useEffect(() => {
        const getFacts = async () => {
         let tempFacts = await apiClient.getSummary()
         if (tempFacts?.data){
            setFacts(tempFacts.data.summary)
         }
        }
        getFacts()
        setCurrPage("recap")
      }, [])

  return (
    <div className='recap-page'>
        <h2 className='recap-title'>Recap</h2>
        <div className='chart-area'>
            <div className='chart-grid'>
                {facts ?
                // change "facts.length" to another variable if we implement a load more function
                // might need to change some other variables as well actually
                randomizeAndReturnItemsInArray(facts, facts.length).map((fact, idx) => (
                    <div className='chart-card' key={idx}>
                        <h3 className='chart-title'>{fact.label}</h3>
                        {generateSpecificChart(fact)}
                    </div>
                ))
                : null
                }
            </div>
        </div>
        
    </div>
  )
}