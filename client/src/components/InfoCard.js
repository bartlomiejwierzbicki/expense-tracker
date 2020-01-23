import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const InfoCard = props => {
  const income = props.incomeData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  const expense = props.expenseData
    .map(item => item.amount)
    .reduce((x, y) => x + y, 0);
  return (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default InfoCard;
