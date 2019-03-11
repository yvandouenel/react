import * as React from "react";

import { Component } from "react";
import Neore from "./Neore";

import Tableaux from "./Tableaux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      email: ""
    };
    this.email = "";
  }

  successSign = (data, email) => {
    const state = { ...this.state };
    state.isLogged = true;
    state.email = email;
    this.setState(state);
  };
  render() {
    return (
      <div>
        {(this.state.isLogged === false) && <Neore onSuccessSign={this.successSign} />}
        {this.state.isLogged && <Tableaux key="1" neore={this.state.neore} email={this.state.email}  />}
      </div>
    );
  }
}

export default App;
