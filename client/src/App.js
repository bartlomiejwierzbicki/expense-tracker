import React from "react";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Form from "./components/Form";
import RoundChart from "./components/RoundChart";
import LineChart from "./components/LineChart";
import TableData from "./components/TableData";
import InfoCard from "./components/InfoCard";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
      expenseCategory: ["Food", "Home", "Transport", "Health", "Fun", "Other"],
      incomeCategory: ["Salary", "Gift", "Other"],
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
        "December"
      ],
      expenses: [],
      incomes: [],
      date: "",
      currentPage: 1,
      todosPerPage: 10
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCategoryIncome = this.onChangeCategoryIncome.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    this.fetchData();
  }

  // INTEGRATION WITH DB
  fetchData = () => {
    axios
      .all([
        axios.get("http://localhost:5000/api/expense"),
        axios.get("http://localhost:5000/api/income")
      ])
      .then(
        axios.spread((...responses) => {
          this.setState({
            expenses: responses[0].data,
            incomes: responses[1].data
          });
        })
      )
      .catch(errors => {
        console.log("Error");
      });
  };

  deleteData = (id, event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `http://localhost:5000/api/expense/${id}`
    });
  };

  deleteDataIncome = (id, event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `http://localhost:5000/api/income/${id}`
    });
  };

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  // FOR THE FORMEXPENSES
  onChangeAmount = event => {
    this.setState({ amount: event.target.value });
  };

  onChangeCategory = event => {
    this.setState({
      category: event.target.value
    });
  };
  onChangeCategoryIncome = event => {
    this.setState({
      categoryIncome: event.target.value
    });
  };

  onChangeDate = event => {
    this.setState({
      date: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/expense",
      data: {
        category: this.state.category,
        amount: -Math.abs(this.state.amount),
        date: this.state.date
      }
    });
    this.setState({
      amount: 0
    });
  };

  onSubmitIncome = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/income",
      data: {
        category: this.state.categoryIncome,
        amount: Math.abs(this.state.amount),
        date: this.state.date
      }
    });
    this.setState({
      amount: 0
    });
  };

  render() {
    return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                padding: "5px"
              }}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                padding: "5px"
              }}
              to="/expenses"
            >
              Expenses
            </NavLink>
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                padding: "5px"
              }}
              to="/incomes"
            >
              Incomes
            </NavLink>
          </Toolbar>
        </AppBar>
        <Container>
          <Switch>
            <Route path="/expenses">
              <TableData
                handleClick={this.handleClick}
                currentPage={this.state.currentPage}
                todosPerPage={this.state.todosPerPage}
                data={this.state.expenses}
                deleteData={this.deleteData}
              />
              <Form
                onSubmit={this.onSubmit}
                onChange={this.onChangeAmount}
                onChangeCategory={this.onChangeCategory}
                onChangeDate={this.onChangeDate}
                categorySets={this.state.expenseCategory}
                amount={this.state.amount}
                date={this.state.date}
                category={this.state.category}
              ></Form>
            </Route>
            <Route path="/incomes">
              <TableData
                handleClick={this.handleClick}
                currentPage={this.state.currentPage}
                todosPerPage={this.state.todosPerPage}
                data={this.state.incomes}
                deleteData={this.deleteDataIncome}
              />
              <Form
                onSubmit={this.onSubmitIncome}
                onChange={this.onChangeAmount}
                onChangeCategory={this.onChangeCategoryIncome}
                onChangeDate={this.onChangeDate}
                categorySets={this.state.incomeCategory}
                amount={this.state.amount}
                date={this.state.date}
                category={this.state.categoryIncome}
              ></Form>
            </Route>

            <Route exact path="/">
              <Grid container spacing={2}>
                <Grid item xs sm={6}>
                  <InfoCard
                    expenseData={this.state.expenses}
                    incomeData={this.state.incomes}
                  />
                </Grid>
                <Grid item xs sm={6}>
                  <Paper elevation={2}>
                    <RoundChart
                      data={this.state.expenses}
                      categorySets={this.state.expenseCategory}
                    />
                  </Paper>
                </Grid>
                <Grid item xs sm={12}>
                  <Paper elevation={2}>
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
      </Router>
    );
  }
}
