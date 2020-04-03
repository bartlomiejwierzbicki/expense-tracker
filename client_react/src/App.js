import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoundChart from "./components/RoundChart";
import LineChart from "./components/LineChart";
import TableData from "./components/TableData";
import Navigation from "./components/Navigation";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      category: "Food",
      categoryIncome: "Salary",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      expenses: [],
      incomes: [],
      expenseCategory: ["Food", "Home", "Transport", "Health", "Fun", "Other"],
      incomeCategory: ["Salary", "Gift", "Other"],
      expensesColumn: [
        {
          title: "Date",
          field: "date",
          type: "date",
          initialEditValue: new Date(),
        },
        {
          title: "Category",
          field: "category",
          lookup: {
            Food: "Food",
            Home: "Home",
            Transport: "Transport",
            Health: "Health",
            Fun: "Fun",
            Other: "Other",
          },
          initialEditValue: "Food",
        },
        { field: "amount", type: "currency" },
      ],
      incomesColumn: [
        { title: "Date", field: "date", type: "date" },
        {
          title: "Category",
          field: "category",
          lookup: { Salary: "Salary", Gift: "Gift", Other: "Other" },
        },
        { field: "amount", type: "currency" },
      ],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .all([
        axios.get("http://localhost:5000/api/expense"),
        axios.get("http://localhost:5000/api/income"),
      ])
      .then(
        axios.spread((...responses) => {
          this.setState({
            expenses: responses[0].data,
            incomes: responses[1].data,
          });
        })
      )
      .catch((errors) => {
        console.log("Error");
      });
  };

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <Navigation></Navigation>
          <Container style={{ marginTop: "10vh" }} fixed>
            <Switch>
              <Route path="/expenses">
                <TableData
                  type={"expense"}
                  fetchData={this.fetchData}
                  columns={this.state.expensesColumn}
                  data={this.state.expenses}
                  title={"Expenses"}
                />
              </Route>
              <Route path="/incomes">
                <TableData
                  type={"income"}
                  fetchData={this.fetchData}
                  columns={this.state.incomesColumn}
                  data={this.state.incomes}
                  title={"Incomes"}
                />
              </Route>

              <Route exact path="/">
                <Grid container spacing={5}>
                  <Grid item xs sm={12} lg={6}>
                    <Paper elevation={2} style={{ padding: "5%" }}>
                      <RoundChart
                        data={this.state.expenses}
                        categorySets={this.state.expenseCategory}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs sm={12} lg={6}>
                    <Paper elevation={2} style={{ padding: "5%" }}>
                      <LineChart
                        months={this.state.months}
                        data={this.state.expenses}
                        incomes={this.state.incomes}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
