import { Colonne } from './colonne';
export class Tableau {
    // constructeur du tableau
    constructor(nom) {
      this.nom = nom;
      this.colonnes = [];
      this.carteBeingModify = false;

      // Gestion des événements au clavier
      document.onkeydown = function handleKeyDown(e) {
        let key = e.keyCode;
        switch (key) {
          case 13:
            if(this.carteBeingModify) {
              this.carteBeingModify.setQuestion(this.carteBeingModify.elementInputQuestion.value);
              this.carteBeingModify.elementQuestion.textContent = this.carteBeingModify.elementInputQuestion.value;
              
              // Affiche à nouveau les éléments de la carte
              const all_elements = this.carteBeingModify.elementCarte.childNodes; 
              for(let i = 0; i < all_elements.length; i++) {
                all_elements[i].style.display = "block";
              }
              // Cache les éléments de formulaire
              this.carteBeingModify.elementInputQuestion.style.display = "none";
              this.carteBeingModify.elementInputReponse.style.display = "none";

              this.carteBeingModify = false;
            };
            return;
          default:
            return;
        }
      }.bind(this);
    }
    // Méthodes
    setTableauNom(newnom) {
      this.nom = newnom;
    }

    createColonne(nom) {
      let col = new Colonne(nom, this);
      this.colonnes.push(col);
    }

    drawTableau() {
      for (let i = 0; i < this.colonnes.length; i++) {
        this.colonnes[i].drawColonne();
      }
    }

  }