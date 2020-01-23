import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

const Form = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <Input
        id="standard-basic"
        label="Amount"
        type="number"
        required={true}
        value={props.amount}
        onChange={props.onChange}
        startAdornment={<InputAdornment position="start">PLN</InputAdornment>}
      ></Input>
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
      <Input
        id="date"
        onChange={props.onChangeDate}
        value={props.date}
        type="date"
        required={true}
      ></Input>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
