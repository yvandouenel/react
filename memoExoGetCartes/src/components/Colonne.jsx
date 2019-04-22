import React, { Component } from 'react';
import Carte from "./Carte";
import Request from "./Request";
class Colonne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titre: this.props.titre,
            cartes: [],
            erreur: false
        }
        this.request = new Request();
        this.request.getData(this.succesRequest, this.failedRequest);
    } 
   
    succesRequest = (data) => {
        console.log("dans successRequest");
        const state = {...this.state};
        state.cartes = data;
        state.erreur = false;
        this.setState(state);
    }
    failedRequest = (errornumber) => {
        console.log("dans failedRequest");
        const state = {...this.state};
        state.erreur = "Problème de récupération des données. Erreur n° : " + errornumber;
        this.setState(state);
    }
    render() {
        const errorStyle = {
            color: 'red'
          };
        return (<div>
            {this.state.cartes.map(carte => {
                return <Carte key={carte.id} question={carte.question} reponse={carte.reponse} />
            })}
            {this.state.erreur && (<h1 style={errorStyle}>{this.state.erreur}</h1>)}

        </div>);
    }
}

export default Colonne;