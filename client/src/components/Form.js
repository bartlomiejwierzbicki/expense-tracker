import React from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const Form = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <TextField
        id="standard-basic"
        label="Amount"
        type="number"
        required={true}
        value={props.amount}
        onChange={props.onChange}
      />
      <br />
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        value={props.category}
        onChange={props.onChangeCategory}
      >
        {props.categorySets.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <br />
      <TextField
        id="date"
        onChange={props.onChangeDate}
        value={props.date}
        type="date"
        required={true}
      ></TextField>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
