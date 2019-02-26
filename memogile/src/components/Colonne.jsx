import React, { Component } from "react";
import Carte from "./Carte";
class Colonne extends Component {
  state = {};

  render() {
    return (
      <div className="col-md-4 col-lg-3">
        <div className="bg-white p-3 rounded">
          <h4 className=" ml-2">{this.props.title}</h4>
          <button
            className="btn bg-success ml-2 text-white"
            onClick={() => this.props.onAddCarte(this)}
          >
            Ajouter une carte
          </button>
          {this.props.cartes.map(carte => {
            return (
              <Carte
                key={carte.id}
                id={carte.id}
                col_id={this.props.id}
                question={carte.question}
                reponse={carte.reponse}
                onRemove={this.props.onRemoveCarte}
                onMoveCarte={this.props.onMoveCarte}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Colonne;
