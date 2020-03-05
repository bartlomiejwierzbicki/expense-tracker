import React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

const InfoCard = props => {
  const income = props.incomeData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  const expense = props.expenseData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  return (
    <Paper style={{ padding: "3%", textAlign: "center" }}>
      <Typography color="textSecondary" variant="h5">
        Incomes Sum: {income} $
      </Typography>
      <Typography color="textSecondary" variant="h5">
        Expenses Sum: {expense} $
      </Typography>
      <Divider></Divider>
      <Typography
        variant="h5"
        style={income + expense >= 0 ? { color: "green" } : { color: "red" }}
      >
        <b>TOTAL: {income + expense} $</b>
      </Typography>
    </Paper>
  );
};

export default InfoCard;
