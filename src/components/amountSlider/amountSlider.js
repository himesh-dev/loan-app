import React from "react";
import { Slider } from "antd";

import "./amountSlider.css";

const AmountSlider = props => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p>Principle Amount: $ {props.value}</p>
      <div
        style={{
          display: "inline-flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <p style={{ margin: "0px", marginRight: "10px" }}>$ {props.min}</p>
        <Slider {...props} step={10} style={{ width: "300px" }} />
        <p style={{ margin: "0px", marginLeft: "10px" }}>$ {props.max}</p>
      </div>
    </div>
  );
};

export default AmountSlider;
