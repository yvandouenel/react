import React, { Component } from "react";
import Tableau from "./Tableau";
import Neore from "./Neore";

//var tableaux = require("../config/tableaux.json");

class Tableaux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_answers: false,
      tableaux: [],
      isLogged: false,
      email: "",
      data: {}
    };
    this.saveData();
  }
  componentWillMount() {
    const state = { ...state };

    //this.setState({ show_answers: false, tableaux: this.props.data.tableaux });
  }
  saveData = () => {
    let state = { ...this.state };
    state = this.setCartesToInvisible(state);

    //this.props.neore.postMemo(this.props.email, data, false, false, false);
    /* setInterval(() => {
      console.log("Ecriture json sur serveur");
      this.props.neore.postMemo(this.props.email, data, false, false, false);
    }, 5000); */
    //postMemo = (email, data, success, before, progress)
    /* setInterval(() => {
      this.writeJson();
      //console.log(this);
    }, 50000); */
  };
  /* writeJson = () => {
    console.log("Ecriture json");
    let state = { ...this.state };
    state = this.setCartesToInvisible(state);
    let json = {
      tableaux: state.tableaux
    };
    fetch("http://localhost:3003/api/writetableaux", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });
  }; */
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  successSign = (data, email) => {
    const state = { ...this.state };
    state.isLogged = true;
    state.email = email;
    this.setState(state);
  };
  successGetMemo = (data, email) => {
    const state = { ...this.state };
    state.tableaux = data.data.data.tableaux;
    console.log("////////////////////////");
    console.log(data.data.data.tableaux);
    console.log("////////////////////////");
    this.setState(state);
    //console.log("successGetMemo : data dans le state :", this.state.tableaux);
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

  setCartesToInvisible = state => {
    state.tableaux.forEach(tableau => {
      if (tableau.visible) {
        tableau.colonnes.forEach(colonne => {
          colonne.cartes.forEach(carte => {
            carte.show_reponse = false;
          });
        });
      }
    });
    return state;
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
    state.tableaux.forEach(tableau => {
      if (tableau.visible) {
        tableau.visible = false;
      }
    });
    state.tableaux.push({
      id: state.tableaux.length + 1,
      visible: true,
      sujet: "Nouveau tableau",
      colonnes: [
        {
          id: 1,
          title: "En cours ",
          cartes: []
        },
        {
          id: 2,
          title: "Je sais un peu",
          cartes: []
        },
        {
          id: 3,
          title: "Je sais bien",
          cartes: []
        },
        {
          id: 4,
          title: "Je sais très bien",
          cartes: []
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
  removeTableau = (e, tableau_event) => {
    console.log("dans remove tableau", tableau_event);
    if (window.confirm("Sûr.e de vouloir supprimer ce tableau ?")) {
      const state = { ...this.state };

      //on supprime le tableau en filtrant le clone du state
      state.tableaux = state.tableaux.filter(
        tableau => tableau.id !== tableau_event.id
      );

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
      default:
        console.log(
          'La méthode moveCarte attend comme paramètre "left" ou "right"'
        );
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
    event.preventDefault();
    return false;
  };
  handleSubmitLabelTableau = event => {
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
  manageButtonLabelClass = visible => {
    return visible ? "btn btn-warning btn-dark" : "btn btn-warning";
  };

  compareLabelTableau = (a, b) => {
    const sujetA = a.sujet.toUpperCase();
    const sujetB = b.sujet.toUpperCase();

    let comparison = 0;
    if (sujetA > sujetB) {
      comparison = 1;
    } else if (sujetA < sujetB) {
      comparison = -1;
    }
    return comparison;
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.isLogged === false && (
                <Neore
                  onSuccessSign={this.successSign}
                  onSuccessGetMemo={this.successGetMemo}
                />
              )}
              {this.state.isLogged && (
                <div>
                  Vous êtes identifié.e.s
                  {this.state.tableaux
                    .sort(this.compareLabelTableau)
                    .map(tableau => {
                      return (
                        <button
                          key={tableau.id}
                          className={this.manageButtonLabelClass(
                            tableau.visible
                          )}
                          style={{ marginRight: "20px", marginBottom: "0" }}
                          onClick={e => this.toggleTableau(e, tableau)}
                        >
                          {tableau.sujet}
                        </button>
                      );
                    })}
                  <div>
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
              )}
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
                onRemoveTableau={this.removeTableau}
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
