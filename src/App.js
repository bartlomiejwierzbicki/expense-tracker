import React from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      category: "Food",
      data: [],
      sum: 0,
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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidUpdate() {
    this.fetchData();
    console.log(this.state.currentPage);
  }

  onChangeAmount = event => {
    this.setState({ amount: event.target.value });
  };

  onChangeCategory = event => {
    this.setState({
      category: event.target.value
    });
  };

  // onChangeFilter = event => {
  //   this.setState({
  //     filterText: event.target.value
  //   });
  // };

  onChangeDate = event => {
    this.setState({
      date: event.target.value
    });
  };

  fetchData = () => {
    axios.get("http://localhost:5000/api/items").then(resp => {
      this.setState({
        data: resp.data,
        sum: this.state.data
          .map(item => item.amount)
          .reduce((x, y, i) => x + y, 0)
      });
    });
  };

  onSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/items",
      data: {
        category: this.state.category,
        amount: this.state.amount,
        date: this.state.date
      }
    });
    this.setState({
      amount: 0
    });
  };

  deleteData = (id, event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `http://localhost:5000/api/items/${id}`
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Form
            onSubmit={this.onSubmit}
            onChange={this.onChangeAmount}
            onChangeCategory={this.onChangeCategory}
            onChangeDate={this.onChangeDate}
            amount={this.state.amount}
            date={this.state.date}
          ></Form>
          <br></br>
          <h1>You have {this.state.sum} PLN</h1>
          <small>Operations: {this.state.data.length}</small>
          <Table
            handleClick={this.handleClick}
            currentPage={this.state.currentPage}
            todosPerPage={this.state.todosPerPage}
            // onChangeFilter={this.onChangeFilter}
            data={this.state.data}
            deleteData={this.deleteData}
            // filterText={this.state.filterText}
          ></Table>
        </div>
      </div>
    );
  }
}
