import React from "react";
import "./progress.css";

const Filler = (props) => {
  return (
    <div
      style={{
        background: "#1da598",
        height: "100%",
        width: `${props.max - props.min}%`,
        borderRadius: "inherit",
        transition: "width .2s ease-in",
      }}
    ></div>
  );
};

const ProgressBar = (props) => {
  return (
    <div
      style={{
        position: "relative",
        height: "20px",
        width: "350px",
        borderRadius: "50px",
        border: "1px solid #333",
      }}
    >
      <Filler min={props.min} max={props.max} />
    </div>
  );
};

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 25,
      max: 60,
    };
  }

  render() {
    return (
      <div>
        <ProgressBar min={this.state.min} max={this.state.max} />
      </div>
    );
  }
}

export default Progress;
