import React from "react";
import { BarChart, Card } from "@tremor/react";




export default function MyChart(props) {
  
  let data = [
  { emotion: "Happy", "frequence": props.data['happy'] || 0},
  { emotion: "Neutral", "frequence": props.data['neutral'] || 0},
  { emotion: "Sad", "frequence": props.data['sad'] || 0 },
  { emotion: "Cry", "frequence": props.data['cry'] || 0}
];
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-2xl">
        <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong ">
          Statistics
        </h3>

        <BarChart
          data={data}
          index="emotion"
          categories={
            ["frequence"]
          }
          colors={["blue"]}
          yAxisWidth={45}
          className="mt-6 hidden h-60 sm:block"
        />
        <BarChart
          data={data}
          index="emotion"
          categories={
            ["frequence"] 
          }
          colors={["blue"]}
          showYAxis={false}
          className="mt-4 h-56 sm:hidden"
        />

       
      </Card>
      <p className="p-4 text">Most frequence : <b>{props.data2 ? props.data2 : "Unknown"}</b></p>
    </>
  );
}
