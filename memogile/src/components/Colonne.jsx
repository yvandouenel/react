import React, { Component } from "react";
import Carte from "./Carte";
class Colonne extends Component {
  state = {
    cartes: [
      {
        id: 1,
        question: "Une question",
        reponse: "Sa réponse"
      },
      {
        id: 2,
        question: "Une question",
        reponse: "Sa réponse"
      },
      {
        id: 3,
        question: "Une question",
        reponse: "Sa réponse"
      }
    ]
  };
  render() {
    return (
      <div>
        {this.state.cartes.map(carte => {
          return (
            <Carte
              key={carte.id}
              id={carte.id}
              question={carte.question}
              reponse={carte.reponse}
            />
          );
        })}
      </div>
    );
  }
}

export default Colonne;
