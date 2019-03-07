import React, { Component } from "react";
import Tableau from "./Tableau";

var tableaux = require("../config/tableaux.json");
console.log(tableaux);

class Tableaux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_answers: false,
      tableaux: []
    };
    this.saveData();
  }
  saveData = () => {
    console.log("Hello dans saveData");
    console.log(this);
    setInterval(() => {
      this.writeJson();
      //console.log(this);
    }, 10000);
  };
  totalCartes = () => {
    let total = 0;
    this.state.tableaux.forEach(function(tableau) {
      tableau.colonnes.forEach(function(col) {
        col.cartes.forEach(function(carte) {
          total++;
        });
      });
    });

    return total;
  };
  componentWillMount() {
    fetch("http://localhost:3003/api/tableaux")
      .then(response => response.json())
      .then(
        tableaux =>
          this.setState({ show_answers: false, tableaux: tableaux.tableaux })
        //console.log({ show_answers: false, tableaux: tableaux.tableaux })
      );
  }
  writeJson = () => {
    console.log("Ecriture json");

    let json = {
      tableaux: this.state.tableaux
    };
    fetch("http://localhost:3003/api/writetableaux", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });
  };

  componentDidUpdate(prevProps, prevState) {}

  /**
   * La première chose est de faire le rapprochement entre la colonne du state et la colonne en tant qu'élément de React
   * C'est le rôle de find.
   * Une fois que l'on a trouvé la colonne, on y ajoute une carte
   */
  addCarte = (col_event, tableau_event) => {
    const state = { ...this.state };
    const tab_index = state.tableaux.indexOf(tableau_event);
    const col_index = state.tableaux[tab_index].colonnes.indexOf(col_event);

    state.tableaux[tab_index].colonnes[col_index].cartes.push({
      id: this.totalCartes() + 1,
      question: "Une question",
      reponse: "Sa réponse",
      show_reponse: false
    });
    this.setState(state);
  };

  addTableau = event => {
    const state = { ...this.state };
    state.tableaux.push({
      id: state.tableaux.length + 1,
      visible: true,
      sujet: "Nouveau tableau",
      colonnes: [
        {
          id: 1,
          title: "En cours ",
          cartes: [
            {
              id: 1,
              show_reponse: true,
              question: "Vrai question ?",
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
              show_reponse: false,
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
              show_reponse: false,
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
              show_reponse: false,
              question: "Une question",
              reponse: "Sa réponse"
            }
          ]
        }
      ]
    });
    this.setState(state);
  };

  removeCarte = (carte_event, colonne_event, tableau_event) => {
    if (window.confirm("Sûr.e de vouloir supprimer cette carte ?")) {
      const state = { ...this.state };
      const tabeau_index = state.tableaux.indexOf(tableau_event);
      const colonne_index = state.tableaux[tabeau_index].colonnes.indexOf(
        colonne_event
      );

      //on supprime la carte en filtrant le clone du state
      state.tableaux[tabeau_index].colonnes[
        colonne_index
      ].cartes = state.tableaux[tabeau_index].colonnes[
        colonne_index
      ].cartes.filter(carte => carte.id !== carte_event.id);

      this.setState(state);
    }
  };
  /**
   * 1 Cloner la carte du state
   * 2 la suprimer
   * 3 l'ajouter dans la colonne voulue
   */
  moveCarte = (carte_event, col_event, tableau_event, direction) => {
    console.log(carte_event, col_event, tableau_event, direction);
    const state = { ...this.state };
    const index_tableau = this.state.tableaux.indexOf(tableau_event);
    const index_colonne = this.state.tableaux[index_tableau].colonnes.indexOf(
      col_event
    );

    // clonage de la carte
    const carte = { ...carte_event };

    switch (direction) {
      case "right":
        if (
          index_colonne <
          this.state.tableaux[index_tableau].colonnes.length - 1
        ) {
          // On enlève la carte de la colonne
          state.tableaux[index_tableau].colonnes[
            index_colonne
          ].cartes = state.tableaux[index_tableau].colonnes[
            index_colonne
          ].cartes.filter(c => c.id !== carte.id);

          // On l'ajoute dans la colonne suivante
          state.tableaux[index_tableau].colonnes[index_colonne + 1].cartes.push(
            carte
          );
        } else
          console.log("Cette carte est déjà dans la colonne la plus à droite");
        break;
      case "left":
        if (index_colonne > 0) {
          // On enlève la carte de la colonne
          state.tableaux[index_tableau].colonnes[
            index_colonne
          ].cartes = state.tableaux[index_tableau].colonnes[
            index_colonne
          ].cartes.filter(c => c.id !== carte.id);

          // On l'ajoute dans la colonne suivante
          state.tableaux[index_tableau].colonnes[index_colonne - 1].cartes.push(
            carte
          );
        } else
          console.log("Cette carte est déjà dans la colonne la plus à gauche");

        break;
    }

    this.setState(state);
  };
  /**
   * Récupération de l'émetteur de l'événement + de la carte + de la colonne
   * Il faut passer par col_index et carte_index pour changer le clone du state
   */
  handleChangeQuestion = (event, carte_event, colonne_event, tableau_event) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);
    let colonne_index = state.tableaux[tableau_index].colonnes.indexOf(
      colonne_event
    );
    let carte_index = state.tableaux[tableau_index].colonnes[
      colonne_index
    ].cartes.indexOf(carte_event);
    state.tableaux[tableau_index].colonnes[colonne_index].cartes[
      carte_index
    ].question = event.target.value;
    this.setState(state);
    event.preventDefault();
  };
  /**
   * Récupération de l'émetteur de l'événement + de la carte + de la colonne
   * Il faut passer par col_index et carte_index pour changer le clone du state
   */
  handleChangeReponse = (event, carte_event, colonne_event, tableau_event) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);
    let colonne_index = state.tableaux[tableau_index].colonnes.indexOf(
      colonne_event
    );
    let carte_index = state.tableaux[tableau_index].colonnes[
      colonne_index
    ].cartes.indexOf(carte_event);
    state.tableaux[tableau_index].colonnes[colonne_index].cartes[
      carte_index
    ].reponse = event.target.value;
    this.setState(state);
    event.preventDefault();
  };
  handleChangeLabelTableau = (event, tableau_event) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);

    state.tableaux[tableau_index].sujet = event.target.value;
    this.setState(state);
    event.preventDefault();
  };

  handleSubmit = event => {
    alert("Une question ou une réponse ont été modifiées");
    event.preventDefault();
    return false;
  };
  handleSubmitLabelTableau = event => {
    alert("Un label de tableau a été modifié");
    event.preventDefault();
    return false;
  };

  toggleTableau = (event, tableau_event) => {
    const state = { ...this.state };
    const tableau_index = state.tableaux.indexOf(tableau_event);

    // efface tous les tableaux
    state.tableaux.forEach(tableau => (tableau.visible = false));

    // Affiche le tableau concerné
    state.tableaux[tableau_index].visible = true;
    this.setState(state);
  };

  showReponse = (event, carte_event, colonne_event, tableau_event) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);
    let colonne_index = state.tableaux[tableau_index].colonnes.indexOf(
      colonne_event
    );
    let carte_index = state.tableaux[tableau_index].colonnes[
      colonne_index
    ].cartes.indexOf(carte_event);

    if (
      state.tableaux[tableau_index].colonnes[colonne_index].cartes[carte_index]
        .show_reponse
    )
      state.tableaux[tableau_index].colonnes[colonne_index].cartes[
        carte_index
      ].show_reponse = false;
    else
      state.tableaux[tableau_index].colonnes[colonne_index].cartes[
        carte_index
      ].show_reponse = true;

    this.setState(state);
  };
  showAllReponse = (event, tableau_event, hide) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);
    state.tableaux[tableau_index].colonnes.forEach(colonne => {
      colonne.cartes.forEach(carte => {
        carte.show_reponse = state.show_answers ? false : true;
      });
    });
    if (hide !== undefined) {
      state.show_answers = false;
    } else state.show_answers = state.show_answers ? false : true;
    this.setState(state);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.tableaux
                .map(tableau => {
                  return (
                    <button
                      key={tableau.id}
                      className="btn btn-warning"
                      style={{ marginRight: "20px", marginBottom: "0" }}
                      onClick={e => this.toggleTableau(e, tableau)}
                    >
                      {tableau.sujet}
                    </button>
                  );
                })
                .sort()}
              <button
                className="btn text-white"
                onClick={e => {
                  this.addTableau(e);
                }}
              >
                Ajouter un tableau
              </button>
            </div>
          </div>
        </div>

        {this.state.tableaux.map(tableau => {
          return (
            tableau.visible && (
              <Tableau
                key={tableau.id}
                id={tableau.id}
                sujet={tableau.sujet}
                tableau={tableau}
                onMoveCarte={this.moveCarte}
                onRemoveCarte={this.removeCarte}
                onAddCarte={this.addCarte}
                onChangeQuestion={this.handleChangeQuestion}
                onChangeReponse={this.handleChangeReponse}
                onChangeLabelTableau={this.handleChangeLabelTableau}
                onSubmitQR={this.handleSubmit}
                onSubmitLabelTableau={this.handleSubmitLabelTableau}
                onShowReponse={this.showReponse}
                onShowAllReponse={this.showAllReponse}
              />
            )
          );
        })}
      </div>
    );
  }
}

export default Tableaux;
