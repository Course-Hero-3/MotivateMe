import React from "react";
import "./GraphCard.css";

// NEED THIS for all graphs to be "registered"
import Chart from "chart.js/auto";

// import all Visual Components
import BarVisual from "../BarVisual/BarVisual";
import HorizontalBarVisual from "../HorizontalBarVisual/HorizontalBarVisual";
import DoubleBarVisual from "../DoubleBarVisual/DoubleBarVisual";
import PieVisual from "../PieVisual/PieVisual";
import DoughnutVisual from "../DoughnutVisual/DoughnutVisual";
import LineVisual from "../LineVisual/LineVisual";

// take in chartInformation

export default function GraphCard({
  chartInformation,
  dashboardOn,
  colorModeState,
}) {
  // generate random colors for each card
  const generateColorList = (amount) => {
    let fillColor = [];
    let borderColor = [];
    let colorsGenerated = "";
    for (let i = 0; i < amount; i++) {
      colorsGenerated = `${Math.random() * (255 - 0) + 0}, ${
        Math.random() * (255 - 0) + 0
      }, ${Math.random() * (255 - 0) + 0}`;
      if (colorModeState === "light") {
        fillColor.push(`rgba(${colorsGenerated}, 0.2)`);
        borderColor.push(`rgba(${colorsGenerated}, 1.0)`);
      } else {
        fillColor.push(`rgba(${colorsGenerated}, 0.6)`);
        borderColor.push(`rgba(${colorsGenerated}, 1.0)`);
      }
    }
    return [fillColor, borderColor];
  };

  // find what "type" the chartData is and return the correct graph
  const generateSpecificChart = (chartData) => {
    // chartData look something like {type,   label,    labels,    actualData}
    //                               (graph) (title) (categories)  (stats)
    if (chartData.type === "bar") {
      return (
        <BarVisual
          label={chartData.label}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors={generateColorList(chartData.labels.length)}
        />
      );
    } else if (chartData.type === "pie") {
      return (
        <PieVisual
          label={chartData.label}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors={generateColorList(chartData.labels.length)}
        />
      );
    } else if (chartData.type === "line") {
      return (
        <LineVisual
          label={chartData.label}
          yAxisLabel={chartData.yAxisLabel}
          xAxisLabel={chartData.xAxisLabel}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors={generateColorList(chartData.labels.length)}
        />
      );
    } else if (chartData.type === "doughnut") {
      return (
        <DoughnutVisual
          label={chartData.label}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors={generateColorList(chartData.labels.length)}
        />
      );
    } else if (chartData.type === "horizontalBar") {
      return (
        <HorizontalBarVisual
          label={chartData.label}
          yAxisLabel={chartData.yAxisLabel}
          xAxisLabel={chartData.xAxisLabel}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors={generateColorList(chartData.labels.length)}
        />
      );
    } else if (chartData.type === "doubleBar") {
      let updatedLabel = [[], []];
      if (chartData.label === "Max and Min per Category") {
        updatedLabel[0] = "Minimum";
        updatedLabel[1] = "Maximum";
      }

      return (
        <DoubleBarVisual
          label={updatedLabel}
          labels={chartData.labels}
          actualData={chartData.actualData}
          colors1={generateColorList(1)}
          colors2={generateColorList(1)}
        />
      );
    }
    // and so on.
  };

  // render the card by itself
  return (
    <>
      {chartInformation !== null && chartInformation !== undefined ? (
        <div className={dashboardOn ? "chart-card-mini" : "chart-card"}>
          <h3 className="chart-title">{chartInformation.label}</h3>
          <div className="boundary-graph">
            {generateSpecificChart(chartInformation)}
          </div>
        </div>
      ) : null}
    </>
  );
}
