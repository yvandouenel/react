import React, { Component } from "react";
import Colonne from "./Colonne";

class Tableau extends Component {
  state = {
    colonnes: [
      { id: 1, title: "En cours d'apprentissage" },
      { id: 2, title: "Je sais un peu" },
      { id: 3, title: "Je sais bien" },
      { id: 4, title: "Je sais très bien" }
    ]
  };
  render() {
    return (
      <div className="row p-4">
        {this.state.colonnes.map(col => {
          return <Colonne key={col.id} title={col.title} />;
        })}
      </div>
    );
  }
}

export default Tableau;
