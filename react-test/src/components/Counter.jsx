import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-warning m-2">
          {this.props.counter.value}
        </button>
        <button
          className="btn btn-info m-2"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Ajouter
        </button>
        <button
          className="btn btn-info m-2"
          onClick={() => this.props.onDecrement(this.props.counter)}
        >
          Soustraire
        </button>
      </div>
    );
  }
}

export default Counter;
