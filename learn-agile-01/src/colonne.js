import { Carte } from './carte';
export class Colonne {
    //constructeur de la colonne
    constructor(nom, tableau) {
      this.nom = nom;
      this.tableau = tableau;
      this.cartes = [];
      this.elementCol = document.createElement("div");
      this.elementColTitle = document.createElement("h1");
      this.buttonPlus = document.createElement("div");

      // gestion des événements
      this.buttonPlus.onclick = function(e) {
        const newCarte = this.createCarte("question", "réponse");
        newCarte.drawCarte();
      }.bind(this);
    }

    // Méthodes
    setNom(newnom) {
      this.nom = newnom;
    }
    createCarte(question, reponse) {
      let carte = new Carte(question, reponse, this, this.tableau);
      this.cartes.push(carte);
      return carte;
    }
    drawColonne() {
      let text = document.createTextNode(this.nom);
      this.elementColTitle.appendChild(text);
      this.elementColTitle.setAttribute("class","colonne-h1");
      this.elementCol.appendChild(this.elementColTitle);
      document.body.appendChild(this.elementCol);
      this.elementCol.addEventListener("click", this, false);
      this.elementCol.setAttribute("class", "colonne");
      this.elementCol.style.minHeight = ( window.innerHeight - 50 ) + "px";
      this.elementCol.style.width = "295px";
      this.elementCol.style.float = "left";
      this.elementCol.style.marginRight = "40px";

      //Ajout du bouton d'ajout
      text = document.createTextNode("+ Ajouter une carte");
      this.buttonPlus.appendChild(text);
      this.elementCol.appendChild(this.buttonPlus);
      this.buttonPlus.setAttribute("class", "add-colonne");
      this.buttonPlus.style.height = "25px";
      this.buttonPlus.style.width = "285px";
    }
  }