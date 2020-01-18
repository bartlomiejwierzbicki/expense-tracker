import React from "react";
import { Doughnut } from "react-chartjs-2";

const RoundChart = props => {
  var data = [];
  for (let i = 0; i < props.categorySets.length; i++) {
    data.push(
      props.data
        .filter(name => {
          return name.category.indexOf(props.categorySets[i]) >= 0;
        })
        .map(item => item.amount)
        .reduce((x, y, i) => x + y, 0)
    );
  }

  return (
    <div style={{ width: "50%", float: "right" }}>
      <Doughnut
        // options={{
        //   legend: {
        //     display: false
        //   }
        // }}
        data={{
          labels: props.categorySets,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FFF333",
                "#6a0dad"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FFF333",
                "#6a0dad"
              ]
            }
          ]
        }}
      />
    </div>
  );
};

export default RoundChart;
