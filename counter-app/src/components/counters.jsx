import React, { Component } from "react";
import Counter from "./counter";
import { compileFunction } from "vm";
class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
      { id: 4, value: 3 },
      { id: 5, value: 4 }
    ]
  };
  handleIncrement = counter => {
    /* let newCounter = this.state.counters.map(counter => {
      console.log("hello");
    });
    this.setState(newCounter); */
    console.log(counter);
  };
  handleDelete = counterId => {
    let newCounter = this.state.counters.filter(counter => {
      //if (counter.id != counterId) return counter;
      return counter.id != counterId && counter;
    });
    this.setState({
      counters: newCounter
    });
  };
  setToZero = () => {
    let newCounter = this.state.counters.map(counter => {
      counter.value = 0;
      return counter;
    });
    console.log(newCounter);
    this.setState({
      counters: newCounter
    });
  };

  render() {
    return (
      <div>
        <button className="btn-warning" onClick={this.setToZero}>
          Remettre à zéro les compteurs
        </button>
        {this.state.counters.map(counter => (
          <Counter
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            key={counter.id}
            counter={counter}
            selected={true}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
