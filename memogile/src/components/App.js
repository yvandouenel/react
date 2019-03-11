import * as React from "react";

import { Component } from "react";
import Neore from "./Neore";

import Tableaux from "./Tableaux";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      email: "",
      data: {}
    };
    this.email = "";
  }
  isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  successSign = (data, email) => {
    const state = { ...this.state };
    state.isLogged = true;
    state.email = email;
    this.setState(state);
  };
  successGetMemo = (data, email) => {
    const state = { ...this.state };
    state.data = data.data;

    this.setState(state);
    console.log("data dans le state :",this.state.data);

  };
  render() {
    return (
      <div>

        {(this.state.isLogged === false) && <Neore onSuccessSign={this.successSign} onSuccessGetMemo={this.successGetMemo} />}
        {this.state.isLogged && <div>Vous êtes identifié.e.s</div>}
        {!this.isEmpty(this.state.data) && <Tableaux key="1" data={this.state.data} email={this.state.email}  />}
      </div>
    );
  }
}

export default App;
