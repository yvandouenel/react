import React, { Component } from "react";
import Tableau from "./Tableau";
import Neore from "./Neore";
import { FaRegSave } from "react-icons/fa";

//var tableaux = require("../config/tableaux.json");

class Tableaux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_answers: false,
      tableaux: [],
      isLogged: false,
      email: "",
      neore: new Neore(),
      justRecorded: false,
      token: false
    };
    this.timeout = false;
    this.modifyingQR = false;
    this.isLogged();
  }
  isLogged = () => {
    const state = { ...this.state };
    // récupère le token
    const token = this.state.neore.getToken();
    // si le token est ok, on peut récupérer les données
    if (token) {
      // récupération des données
      this.state.neore.apiGetData(token, this.successApiGetData, false, false);
      state.token = token;
      this.setState(state);
    } else {
      this.setState(state);
    }
  };
  saveData = () => {
    let state = { ...this.state };
    state = this.setCartesToInvisible(state);

    this.state.neore.postMemo(
      this.state.token,
      { tableaux: state.tableaux },
      this.successPostMemo,
      false,
      false
    );

    // on sauvegarde toutes les 5s console.log("Données sauvegardées : ",{tableaux:state.tableaux});
    /* setInterval(() => {
      console.log("Ecriture json sur serveur");
      this.state.neore.postMemo(
        this.state.email,
        { tableaux: state.tableaux },
        this.successPostMemo,
        false,
        false
      );
    }, 5000); */
  };

  isEmpty = obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  successSignIn = data => {
    console.log("data: ", data);
    const state = { ...this.state };
    state.isLogged = true;
    state.token = data.data;
    this.setState(state);
    // on va chercher les données
    this.state.neore.apiGetData(
      data.data,
      this.successApiGetData,
      false,
      false
    );
  };
  successGetMemo = (data, email) => {
    const state = { ...this.state };
    state.tableaux = data.data.tableaux;
    console.log("Data récupérées : ", data);
    this.setState(state);
    // on enregistre les données
    //this.saveData();
  };
  successApiGetData = data => {
    console.log("Dans successApiGetData", data);
    const state = { ...this.state };
    state.tableaux = data.data.tableaux;
    console.log("Data récupérées : ", data);
    this.setState(state);
  };
  successPostMemo = data => {
    const state = { ...this.state };
    state.justRecorded = true;
    const mythis = this;
    // on affiche l'icône qui montre que l'on a enregistré
    setTimeout(() => {
      const state = { ...mythis.state };
      state.justRecorded = false;
      mythis.setState(state);
    }, 1000);
    this.setState(state);
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
    //on enregistre les données
    this.saveData();
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
    //on enregistre les données
    this.saveData();
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
    //on enregistre les données
    this.saveData();
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
      //on enregistre les données
      this.saveData();
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
    //on enregistre les données
    this.saveData();
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
    //on enregistre les données après 5 secondes
    const this_timeout = this;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log(
        "handleChangeQuestion : enregistrement après changement de question"
      );
      this_timeout.saveData();
    }, 5000);
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
    //on enregistre les données après 5 secondes
    const this_timeout = this;
    clearTimeout(timeoutId);
    let timeoutId = setTimeout(() => {
      console.log(
        "handleChangeQuestion : enregistrement après changement de réponse"
      );
      this_timeout.saveData();
    }, 5000);
  };
  handleChangeLabelTableau = (event, tableau_event) => {
    let state = { ...this.state };
    let tableau_index = state.tableaux.indexOf(tableau_event);

    state.tableaux[tableau_index].sujet = event.target.value;
    this.setState(state);
    event.preventDefault();
  };
  handleShowForm = (event, carte_event, colonne_event, tableau_event) => {
    console.log("handleShowForm");
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
    ].show_form = true;
    this.setState(state);
    //this.setState({ show: true });
  };
  handleCloseForm = (event, carte_event, colonne_event, tableau_event) => {
    console.log("Dans handleCloseForm");
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
    ].show_form = false;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();
    return false;
  };
  handleSubmitLabelTableau = event => {
    event.preventDefault();
    return false;
  };
  handleChangeHtml = (event, carte_event, colonne_event, tableau_event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //this.setState({selected: !this.state.selected});
    /* const name = target.name; */
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
    ].reponse_html = value;
    this.setState(state);
    //on enregistre les données
    this.saveData();
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
    if(this.modifyingQR) {
      this.handleShowForm(event, carte_event, colonne_event, tableau_event);
    } else {
      this.modifyingQR = true;
      setTimeout(() => {
        this.modifyingQR = false;
      }, 300);

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
    }

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
  changeFormSign = event => {
    event.preventDefault();
  };

  submitSign = event => {
    event.preventDefault();
    const email = document.getElementById("signemail");
    const pwd = document.getElementById("signpwd");

    this.state.neore.apiSignIn(
      email.value,
      pwd.value,
      this.successSignIn,
      false,
      false
    );
    return false;
  };
  logOut = () => {
    const state = { ...this.state };
    state.isLogged = false;
    state.token = false;
    state.tableaux = [];
    console.log("logOut");
    localStorage.removeItem("token");
    this.setState(state);
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.isLogged === false && (
                <div>
                  <form
                    onSubmit={e => {
                      this.submitSign(e);
                    }}
                  >
                    <label>
                      Email:
                      <input
                        type="email"
                        className="ml-4"
                        id="signemail"
                        value="y.douenel@coopernet.fr"
                        onChange={e => this.changeFormSign(e)}
                      />
                    </label>
                    <label>
                      Mot de passe :
                      <input
                        type="password"
                        className="ml-4"
                        id="signpwd"
                        value="test"
                        onChange={e => this.changeFormSign(e)}
                      />
                    </label>
                    <button type="submit">Se connecter</button>
                  </form>
                </div>
              )}
              {this.state.isLogged && (
                <div>
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
                  <button
                    className="btn text-white"
                    onClick={e => {
                      this.logOut();
                    }}
                  >
                    Déconnexion
                  </button>
                  <div>
                    <button
                      className="btn text-white"
                      onClick={e => {
                        this.addTableau(e);
                      }}
                    >
                      Ajouter un tableau
                    </button>
                    {this.state.justRecorded && (
                      <span style={{ color: "white" }}>
                        <FaRegSave />
                      </span>
                    )}
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
                onChangeHtml={this.handleChangeHtml}
                onHandleShowForm={this.handleShowForm}
                onHandleCloseForm={this.handleCloseForm}
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
