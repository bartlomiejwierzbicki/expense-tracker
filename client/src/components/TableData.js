import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

const TableData = props => {
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
    <TableContainer component={Paper} elevation={1}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
            .slice(indexOfFirstTodo, indexOfLastTodo)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.amount} PLN</TableCell>
                <TableCell>
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={e => props.deleteData(item._id, e)}
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <ul id="page-numbers">{renderPageNumbers}</ul>
    </TableContainer>
  );
};

export default TableData;
