import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = props => {
  var dataIncome = [];
  var dataExpense = [];
  for (let i = 1; i <= 9; i++) {
    dataIncome.push(
      props.incomes
        .filter(name => {
          return name.date.indexOf(`-0${i}-`) >= 0;
        })
        .map(item => item.amount)
        .reduce((x, y, i) => x + y, 0)
    );

    dataExpense.push(
      props.data
        .filter(name => {
          return name.date.indexOf(`-0${i}-`) >= 0;
        })
        .map(item => item.amount)
        .reduce((x, y, i) => x + y, 0)
    );
  }
  return (
    <Line
      data={{
        labels: props.months,
        datasets: [
          {
            label: "Incomes",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataIncome.concat([
              props.incomes
                .filter(name => {
                  return name.date.indexOf("-10-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0),
              props.incomes
                .filter(name => {
                  return name.date.indexOf("-11-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0),
              props.incomes
                .filter(name => {
                  return name.date.indexOf("-12-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0)
            ])
          },
          {
            label: "Expenses",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgb(204, 0, 0)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataExpense.concat([
              props.data
                .filter(name => {
                  return name.date.indexOf("-10-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0),
              props.data
                .filter(name => {
                  return name.date.indexOf("-11-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0),
              props.data
                .filter(name => {
                  return name.date.indexOf("-12-") >= 0;
                })
                .map(item => item.amount)
                .reduce((x, y, i) => x + y, 0)
            ])
          }
        ]
      }}
    />
  );
};

export default LineChart;
