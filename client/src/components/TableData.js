import React from "react";

import axios from "axios";
import MaterialTable from "material-table";

const TableData = props => {
  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      options={{ pageSize: 10 }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (props.type === "expense") {
                axios({
                  method: "post",
                  url: `http://localhost:5000/api/${props.type}`,
                  data: {
                    category: newData.category,
                    amount: -Math.abs(newData.amount),
                    date: newData.date
                  }
                });
              }
              else {
                axios({
                  method: "post",
                  url: `http://localhost:5000/api/${props.type}`,
                  data: {
                    category: newData.category,
                    amount: Math.abs(newData.amount),
                    date: newData.date
                  }
                });
              }
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (props.type === "expense") {
                axios({
                  method: "put",
                  url: `http://localhost:5000/api/${props.type}/${oldData._id}`,
                  data: {
                    category: newData.category,
                    amount: -Math.abs(newData.amount),
                    date: newData.date
                  }
                });
                props.fetchData();
              }
              else {
                axios({
                  method: "put",
                  url: `http://localhost:5000/api/${props.type}/${oldData._id}`,
                  data: {
                    category: newData.category,
                    amount: Math.abs(newData.amount),
                    date: newData.date
                  }
                });
              }
              props.fetchData();
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              axios({
                method: "delete",
                url: `http://localhost:5000/api/${props.type}/${oldData._id}`
              });
              props.fetchData();
              resolve()
            }, 1000)
          }),
      }}
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => props.fetchData(),
        }
      ]}
    />
  );
};

export default TableData;
