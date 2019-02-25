import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  state = {
    counters: [
      { value: 1, id: 1 },
      { value: 1, id: 2 },
      { value: 1, id: 3 },
      { value: 5, id: 4 },
      { value: 5, id: 5 }
    ]
  };
  reset = () => {
    console.log("dans reset");
    let state = { ...this.state };
    /* state.counters = state.counters.map(counter => {
      counter.value = 0;
      return counter;
    }); */
    state.counters.forEach(item => (item.value = 0));
    this.setState(state);
  };
  // il est préférable que cette méthode prenne en paramètre le compteur plutôt que son id,
  // cela permet de le retrouver plus facilement avec indexOf
  incrementCounter = counter => {
    let state = { ...this.state };
    /* let index = state.counters.indexOf(counter);
    state.counters[index].value++; */
    counter.value++;
    this.setState(state);
  };
  decrementCounter = counter => {
    console.log("Id du compteur à décrémenter", counter.id);
    if (counter.value > 0) {
      let state = { ...this.state };
      let index = state.counters.indexOf(counter);
      state.counters[index].value--;
      this.setState(state);
    }
  };
  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.reset}>
          Mettre à zéro
        </button>
        {this.state.counters.map(counter => {
          return (
            <Counter
              value={counter.value}
              key={counter.id}
              counter={counter}
              onIncrement={this.incrementCounter}
              onDecrement={this.decrementCounter}
            />
          );
        })}
      </div>
    );
  }
}

export default Counters;
