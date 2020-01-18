import React from "react";

const Form = props => {
  return (
    <form className="App" onSubmit={props.onSubmit}>
      <label>
        Amount:{" "}
        <input
          type="number"
          required={true}
          value={props.amount}
          onChange={props.onChange}
        />{" "}
        PLN
      </label>
      <br></br>
      <label>
        Select category:{" "}
        <select onChange={props.onChangeCategory}>
          {props.categorySets.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <br></br>
        <label>
          Date:{" "}
          <input
            onChange={props.onChangeDate}
            value={props.date}
            type="date"
            required={true}
          ></input>
        </label>
      </label>
      <br></br>
      <button>Submit</button>
    </form>
  );
};

export default Form;
