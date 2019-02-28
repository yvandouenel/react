import React, { Component } from "react";
import Tableau from "./Tableau";

class Tableaux extends Component {
  state = {
    tableaux: [
      {
        id: 1,
        sujet: "js"
      },
      {
        id: 2,
        sujet: "react"
      }
    ]
  };
  render() {
    return (
      <div>
        <div className="row pl-4 pr-4">
          <div className="col-md-12">
            {this.state.tableaux.map(tableau => {
              return (
                <button className="btn btn-warning m-2">{tableau.sujet}</button>
              );
            })}
          </div>
        </div>

        {this.state.tableaux.map(tableau => {
          return <Tableau key={tableau.id} sujet={tableau.sujet} />;
        })}
      </div>
    );
  }
}

export default Tableaux;
