import React, { Component } from "react";
import Carte from "./Carte";
class Colonne extends Component {
  state = {
    title: this.props.title,
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
  addCarte = event => {
    const state = { ...this.state };
    state.cartes.push({
      id: state.cartes.length,
      question: "Une question",
      reponse: "Sa réponse"
    });
    this.setState(state);
  };
  removeCarte = carte => {
    if (window.confirm("Etes vous sûr.e de vouloir supprimer cette carte ?")) {
      const state = { ...this.state };
      state.cartes = this.state.cartes.filter(c => c.id !== carte.props.id);
      this.setState(state);
    }
  };
  render() {
    return (
      <div className="col-md-4 col-lg-3">
        <div className="bg-white p-3 rounded">
          <h4 className="text-success ml-4">{this.state.title}</h4>
          <button className="btn btn-warning ml-4" onClick={this.addCarte}>
            Ajouter une carte
          </button>
          {this.state.cartes.map(carte => {
            return (
              <Carte
                key={carte.id}
                id={carte.id}
                question={carte.question}
                reponse={carte.reponse}
                onRemove={this.removeCarte}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Colonne;
