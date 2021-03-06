import React, { Component } from "react";
import Colonne from "./Colonne";

class Tableau extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row  text-white">
          <h1 className="text-light sr-only">{this.props.sujet}</h1>
          <form onSubmit={this.props.onSubmitLabelTableau}>
            <label>
              <input
                type="text"
                className="ml-4 input-label-tableau text-light"
                value={this.props.tableau.sujet}
                onChange={e =>
                  this.props.onChangeLabelTableau(e, this.props.tableau)
                }
              />
            </label>
          </form>
          <button
            className="btn text-white"
            onClick={e => {
              this.props.onShowAllReponse(e, this.props.tableau);
            }}
          >
            Voir toutes les réponses
          </button>
          <button
            className="btn text-white bg-danger delete-tableau"
            onClick={e => {
              this.props.onRemoveTableau(e, this.props.tableau);
            }}
          >
            Supprimer ce tableau
          </button>
        </div>
        <div>
          <div className="row">
            {this.props.tableau.colonnes.map(col => {
              return (
                <Colonne
                  key={col.id}
                  id={col.id}
                  colonne={col}
                  tableau={this.props.tableau}
                  title={col.title}
                  cartes={col.cartes}
                  onMoveCarte={this.props.onMoveCarte}
                  onRemoveCarte={this.props.onRemoveCarte}
                  onAddCarte={this.props.onAddCarte}
                  onChangeQuestion={this.props.onChangeQuestion}
                  onChangeReponse={this.props.onChangeReponse}
                  onChangeHtml={this.props.onChangeHtml}
                  onHandleShowForm={this.props.onHandleShowForm}
                  onHandleCloseForm={this.props.onHandleCloseForm}
                  onSubmitQR={this.props.onSubmitQR}
                  onShowReponse={this.props.onShowReponse}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Tableau;
