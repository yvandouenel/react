import React, { Component } from "react";
class Counter extends Component {
    state = {
      count: this.props.value
    };
    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };
    render() {
      return (
        <React.Fragment>
          <span style={this.styles} className={this.getBadgeClasses()}>
            {this.formatCount()}
          </span>
          <button
            onClick={() => {
              this.handleIncrement();
            }}
            className="btn btn-secondary btn-sm"
          >
            Increment
          </button>
          
        </React.Fragment>
      );
    }
}