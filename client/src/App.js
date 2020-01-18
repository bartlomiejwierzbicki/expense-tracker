import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "./components/Form";
import RoundChart from "./components/RoundChart";
import LineChart from "./components/LineChart";
import TableExpenses from "./components/TableExpenses";
import TableIncome from "./components/TableIncome";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      category: "Food",
      categorySets: ["Food", "Home", "Transport", "Health", "Fun", "Other"],
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
      // filterText: "",
      date: "",
      currentPage: 1,
      todosPerPage: 10
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
    // this.onChangeFilter = this.onChangeFilter.bind(this);
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
    axios.get("http://localhost:5000/api/expense").then(resp => {
      this.setState({
        expenses: resp.data
      });
    });
    axios.get("http://localhost:5000/api/income").then(resp => {
      this.setState({
        incomes: resp.data
      });
    });
  };

  deleteData = (id, event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `http://localhost:5000/api/expense/${id}`
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
  // END

  //FILTER
  /*
  onChangeFilter = event => {
    this.setState({
      filterText: event.target.value
    });
  };
  */

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/charts">Charts</Link>
              </li>
              <li>
                <Link to="/expenses">Expenses</Link>
              </li>
              <li>
                <Link to="/incomes">Incomes</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/charts">
              <RoundChart
                data={this.state.expenses}
                categorySets={this.state.categorySets}
              />
              <LineChart
                months={this.state.months}
                data={this.state.expenses}
                incomes={this.state.incomes}
              />
            </Route>
            <Route path="/expenses">
              <Form
                onSubmit={this.onSubmit}
                onChange={this.onChangeAmount}
                onChangeCategory={this.onChangeCategory}
                onChangeDate={this.onChangeDate}
                categorySets={this.state.categorySets}
                amount={this.state.amount}
                date={this.state.date}
              ></Form>
              <TableExpenses
                handleClick={this.handleClick}
                currentPage={this.state.currentPage}
                todosPerPage={this.state.todosPerPage}
                data={this.state.expenses}
                deleteData={this.deleteData}
              />
            </Route>
            <Route path="/incomes">
              <TableIncome
                data={this.state.incomes}
                currentPage={this.state.currentPage}
                todosPerPage={this.state.todosPerPage}
              ></TableIncome>
            </Route>
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      </Router>
      // <div>
      //   <div>
      //     <RoundChart
      //       data={this.state.expenses}
      //       categorySets={this.state.categorySets}
      //     />
      //     <LineChart
      //       months={this.state.months}
      //       data={this.state.expenses}
      //       incomes={this.state.incomes}
      //     />
      //     <Form
      //       onSubmit={this.onSubmit}
      //       onChange={this.onChangeAmount}
      //       onChangeCategory={this.onChangeCategory}
      //       onChangeDate={this.onChangeDate}
      //       categorySets={this.state.categorySets}
      //       amount={this.state.amount}
      //       date={this.state.date}
      //     ></Form>
      //     <h1>
      //       Total:{" "}
      //       {this.state.incomes
      //         .map(item => item.amount)
      //         .reduce((x, y, i) => x + y, 0) -
      //         this.state.expenses
      //           .map(item => item.amount)
      //           .reduce((x, y, i) => x + y, 0)}{" "}
      //       PLN
      //     </h1>
      //     <small>Operations: {this.state.expenses.length}</small>
      //     <TableExpenses
      //       handleClick={this.handleClick}
      //       currentPage={this.state.currentPage}
      //       todosPerPage={this.state.todosPerPage}
      //       data={this.state.expenses}
      //       deleteData={this.deleteData}
      //     />
      //     <TableIncome
      //       data={this.state.incomes}
      //       currentPage={this.state.currentPage}
      //       todosPerPage={this.state.todosPerPage}
      //     ></TableIncome>
      //   </div>
      // </div>
    );
  }
}
