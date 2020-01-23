import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const InfoCard = props => {
  const income = props.incomeData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  const expense = props.expenseData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  return (
    <Paper style={{ padding: "20px", height: "40vh" }}>
      <Typography color="primary" variant="h3">
        Balance
      </Typography>
      <Typography color="textSecondary" variant="h5">
        Incomes Sum: {income} PLN
      </Typography>
      <Typography color="textSecondary" variant="h5">
        Expenses Sum: {expense} PLN
      </Typography>
      <Divider></Divider>
      <Typography
        variant="h5"
        style={income + expense >= 0 ? { color: "green" } : { color: "red" }}
      >
        <b>TOTAL: {income + expense} PLN</b>
      </Typography>
    </Paper>
  );
};

export default InfoCard;
