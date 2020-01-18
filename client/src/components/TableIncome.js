import React from "react";

const TableIncome = props => {
  const indexOfLastTodo = props.currentPage * props.todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - props.todosPerPage;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.data.length / props.todosPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        style={
          number === props.currentPage ? { color: "blue" } : { color: "black" }
        }
        key={number}
        id={number}
        onClick={props.handleClick}
      >
        {number}
      </li>
    );
  });
  return (
    <div>
      <p>Income</p>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        {props.data
          .slice(indexOfFirstTodo, indexOfLastTodo)
          .map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>
                  <b
                    style={
                      item.amount >= 0 ? { color: "green" } : { color: "red" }
                    }
                  >
                    {item.amount} PLN
                  </b>
                </td>
                <td>{item.category}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={e => props.deleteData(item._id, e)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <ul id="page-numbers">{renderPageNumbers}</ul>
    </div>
  );
};

export default TableIncome;
