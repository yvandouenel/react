import React, { Component } from "react";
import Carte from "./Carte";
class Colonne extends Component {
  state = {};
  reponseHtml = (carte)=>{
    return (carte.reponse_html) ? true : false;
  }
  render() {
    return (
      <div className="col-md-4 col-lg-3">
        <div className="bg-white p-3 rounded">
          <h4 className=" ml-2">{this.props.title}</h4>
          <button
            className="btn bg-success ml-2 text-white"
            onClick={() =>
              this.props.onAddCarte(this.props.colonne, this.props.tableau)
            }
          >
            Ajouter une carte
          </button>
          {this.props.cartes.map(carte => {
            return (
              <Carte
                key={carte.id}
                id={carte.id}
                tableau={this.props.tableau}
                colonne={this.props.colonne}
                carte={carte}
                question={carte.question}
                reponse={carte.reponse}
                reponse_html={this.reponseHtml(carte)}
                show_reponse={carte.show_reponse}
                onRemove={this.props.onRemoveCarte}
                onMoveCarte={this.props.onMoveCarte}
                onChangeQuestion={this.props.onChangeQuestion}
                onChangeReponse={this.props.onChangeReponse}
                onChangeHtml={this.props.onChangeHtml}
                onSubmitQR={this.props.onSubmitQR}
                onShowReponse={this.props.onShowReponse}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Colonne;
