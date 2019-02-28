import React, { Component } from "react";
import Colonne from "./Colonne";

class Tableau extends Component {
  state = {
    colonnes: [
      {
        id: 1,
        title: "En cours d'apprentissage",
        cartes: [
          {
            id: 1,
            question: "Une question",
            reponse: "Sa réponse"
          }
        ]
      },
      {
        id: 2,
        title: "Je sais un peu",
        cartes: [
          {
            id: 2,
            question: "Une question",
            reponse: "Sa réponse"
          }
        ]
      },
      {
        id: 3,
        title: "Je sais bien",
        cartes: [
          {
            id: 3,
            question: "Une question",
            reponse: "Sa réponse"
          }
        ]
      },
      {
        id: 4,
        title: "Je sais très bien",
        cartes: [
          {
            id: 4,
            question: "Une question",
            reponse: "Sa réponse"
          }
        ]
      }
    ]
  };
  totalCartes = () => {
    let total = 0;
    this.state.colonnes.forEach(function(col) {
      col.cartes.forEach(function(carte) {
        total++;
      });
    });
    return total;
  };
  /**
   * La première chose est de faire le rapprochement entre la colonne du state et la colonne en tant qu'élément de React
   * C'est le rôle de find.
   * Une fois que l'on a trouvé la colonne, on y ajoute une carte
   */
  addCarte = col_react => {
    const state = { ...this.state };
    const col = state.colonnes.find(c => c.id === col_react.props.id);
    state.colonnes[col.id - 1].cartes.push({
      id: this.totalCartes() + 1,
      question: "Une question",
      reponse: "Sa réponse"
    });
    this.setState(state);
  };
  removeCarte = (carte_react, col_react_id) => {
    //console.log("remove Carte", carte_react, col_react_id);
    console.log("remove Carte", carte_react.props.id, col_react_id);
    const state = { ...this.state };
    const col = state.colonnes.find(c => c.id === col_react_id);
    state.colonnes[col.id - 1].cartes = state.colonnes[
      col.id - 1
    ].cartes.filter(carte => carte.id !== carte_react.props.id);

    this.setState(state);
  };
  /**
   * 1 Cloner la carte du state
   * 2 la suprimer
   * 3 l'ajouter dans la colonne voulue
   */
  moveCarte = (carte_react, col_react_id, direction) => {
    //console.log(carte_react, col_react_id, direction);
    const state = { ...this.state };
    const col = state.colonnes.find(col => col.id === col_react_id);
    // clonage de la carte
    const carte = {
      ...state.colonnes[col.id - 1].cartes.find(
        carte => carte.id === carte_react.props.id
      )
    };
    console.log(carte);
    switch (direction) {
      case "right":
        if (col_react_id < this.state.colonnes.length) {
          // On enlève la carte de la colonne
          state.colonnes[col.id - 1].cartes = state.colonnes[
            col.id - 1
          ].cartes.filter(carte => carte.id !== carte_react.props.id);

          // On l'ajoute dans la colonne suivante
          state.colonnes[col.id].cartes.push(carte);
        }
        break;
      case "left":
        if (col_react_id > 1) {
          // On enlève la carte de la colonne
          state.colonnes[col.id - 1].cartes = state.colonnes[
            col.id - 1
          ].cartes.filter(carte => carte.id !== carte_react.props.id);

          // On l'ajoute dans la colonne suivante
          state.colonnes[col.id - 2].cartes.push(carte);
        }
        break;
    }

    this.setState(state);
  };
  /**
   * Récupération de l'émetteur de l'événement + de la carte + de la colonne
   * Il faut passer par col_index et carte_index pour changer le clone du state
   */
  handleChangeQuestion = (event, carte_event, col_event) => {
    console.log("carte: " + carte_event + " - col : " + col_event);

    let state = { ...this.state };
    let col_index = state.colonnes.indexOf(col_event);
    let carte_index = state.colonnes[col_index].cartes.indexOf(carte_event);
    state.colonnes[col_index].cartes[carte_index].question = event.target.value;
    this.setState(state);
    event.preventDefault();
  };
  /**
   * Récupération de l'émetteur de l'événement + de la carte + de la colonne
   * Il faut passer par col_index et carte_index pour changer le clone du state
   */
  handleChangeReponse = (event, carte_event, col_event) => {
    console.log("carte: " + carte_event + " - col : " + col_event);

    let state = { ...this.state };
    let col_index = state.colonnes.indexOf(col_event);
    let carte_index = state.colonnes[col_index].cartes.indexOf(carte_event);
    state.colonnes[col_index].cartes[carte_index].reponse = event.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    console.log("test");
    alert("Une question ou une réponse ont été modifiées: ");
    event.preventDefault();
    return false;
  };
  render() {
    return (
      <div className="row p-4">
        {this.state.colonnes.map(col => {
          return (
            <Colonne
              key={col.id}
              id={col.id}
              colonne={col}
              title={col.title}
              cartes={col.cartes}
              onMoveCarte={this.moveCarte}
              onRemoveCarte={this.removeCarte}
              onAddCarte={this.addCarte}
              onChangeQuestion={this.handleChangeQuestion}
              onChangeReponse={this.handleChangeReponse}
              onSubmitQR={this.handleSubmit}
            />
          );
        })}
      </div>
    );
  }
}

export default Tableau;