import React, { Component } from "react";
import Colonne from "./Colonne";

class Tableau extends Component {
  render() {
    return (
      <div>
        <div className="row p-4 justify-content-center">
          <h1 className="text-light">{this.props.sujet}</h1>
        </div>
        <div className="row p-4">
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
                onSubmitQR={this.props.onSubmitQR}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tableau;
