import React, { useState } from "react";
import { InputNumber } from "antd";

const MonthInput = props => {
  const [error, setError] = useState(null);

  const onChangeHandler = value => {
    if (value >= props.min && value <= props.max && typeof value === "number") {
      props.onChange(value);
      setError(null);
    } else {
      setError("months should be between 6 to 24");
      props.onChange("");
    }
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <InputNumber
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={onChangeHandler}
          onPressEnter={e => onChangeHandler(e.target.value)}
        />
        <p
          style={{
            marginLeft: "10px",
            marginBottom: "0px"
          }}
        >
          months
        </p>
      </div>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
};

export default MonthInput;
