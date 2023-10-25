import React from "react";
import { VictoryPie } from "victory";

const Chart = () => {
  const sampleData = [
    { x: "General", y: 35 },
    { x: "Gyno", y: 40 },
    { x: "ENT", y: 55 },
    { x: "Scans", y: 55 },
  ];

  return (
    <VictoryPie
      innerRadius={100}
      colorScale={["#1d4ed8", "#5b21b6", "#22d3ee", "#c7d2fe"]}
      data={sampleData}
    />
  );
};

export default Chart;
