export class Carte {
    // constructeur de la carte
    constructor(question, reponse, colonne, tableau) {
      this.question = question;
      this.reponse = reponse;
      this.colonne = colonne;
      this.tableau = tableau;
      this.elementCarte = document.createElement("div");
      this.elementQuestion = document.createElement("div");
      this.elementReponse = document.createElement("div");
      this.elementDelete = document.createElement("div");
      this.elementModify = document.createElement("div");
      this.elementInputQuestion = document.createElement("input");
      this.elementInputReponse = document.createElement("input");
      this.elementMoveRight = document.createElement("div");
      this.elementMoveLeft = document.createElement("div");

      // gestion des événements : le bind permet d'associer l'objet carte à ses éléments enfants
      this.elementQuestion.onclick = function(e) {
        if (this.elementReponse.style.display == "none") {
          this.elementReponse.style.display = "block";
        } else {
          this.elementReponse.style.display = "none";
        }
      }.bind(this);

      this.elementDelete.onclick = function(e) {
        this.deleteCarte();
      }.bind(this);

      this.elementModify.onclick = function(e) {
        this.showFormElements();
      }.bind(this);

      this.elementInputReponse.onblur = function(e) {
        this.setReponse(this.elementInputQuestion.value);
        this.elementReponse.textContent = this.elementInputReponse.value;
        
        // Affiche à nouveau les éléments de la carte
        const all_elements = this.elementCarte.childNodes; 
        for(let i = 0; i < all_elements.length; i++) {
          all_elements[i].style.display = "block";
        }
        // Cache les éléments de formulaire
        this.elementInputQuestion.style.display = "none";
        this.elementInputReponse.style.display = "none";
      }.bind(this);

      this.elementMoveRight.onclick = function(e) {
        this.moveRight();
      }.bind(this);

      this.elementMoveLeft.onclick = function(e) {
        this.moveLeft();
      }.bind(this);
    }
    
    // Méthodes
    setQuestion(newquestion) {
      this.question = newquestion;
    };
    setReponse(newreponse) {
      this.reponse = newreponse;
    };
    showFormElements() {
      // cache tous les éléments de la carte
      const all_elements = this.elementCarte.childNodes; 
      for(let i = 0; i < all_elements.length; i++) {
        all_elements[i].style.display = "none";
      }
      // affiche les inputs
      this.elementInputQuestion.style.display = "block";
      this.elementInputReponse.style.display = "block";
      // Passe le tableau en mode modification
      this.tableau.carteBeingModify = this;
    }
    drawCarte() {
      // Carte
      this.elementCarte.setAttribute("class", "carte");
      this.elementCarte.style.minHeight = "100px";
    
      // bouton modify
      let text = document.createTextNode("Modifier");
      this.elementModify.appendChild(text);
      this.elementModify.setAttribute("class", "card-modify");
      this.elementCarte.appendChild(this.elementModify);
  
      // Question
      text = document.createTextNode(this.question);
      this.elementQuestion.appendChild(text);
      this.elementQuestion.setAttribute("class","question");
      this.elementCarte.appendChild(this.elementQuestion);
      this.colonne.elementCol.appendChild(this.elementCarte); // ajout de la carte à la colonne
  
      // réponse
      text = document.createTextNode(this.reponse);
      this.elementReponse.appendChild(text);
      this.elementReponse.setAttribute("class","reponse");
      this.elementCarte.appendChild(this.elementReponse);
      this.elementReponse.style.display = "none";

      // bouton delete
      text = document.createTextNode("- Supprimer");
      this.elementDelete.appendChild(text);
      this.elementDelete.setAttribute("class","delete-carte")
      this.elementCarte.appendChild(this.elementDelete);

      // Crée et cache les éléments du formulaire
      this.elementInputQuestion.type = "text";
      this.elementInputQuestion.className = "input-question"; 
      this.elementInputQuestion.style.width = "100%"; 
      this.elementInputQuestion.defaultValue = this.question; 
      this.elementCarte.appendChild(this.elementInputQuestion);
      this.elementInputQuestion.style.display = "none";

      this.elementInputReponse.type = "text";
      this.elementInputReponse.className = "input-reponse"; 
      this.elementInputReponse.style.width = "100%"; 
      this.elementInputReponse.defaultValue = this.reponse; 
      this.elementCarte.appendChild(this.elementInputReponse);
      this.elementInputReponse.style.display = "none";

      // flèche droite
      text = document.createTextNode("->");
      this.elementMoveRight.appendChild(text);
      this.elementCarte.appendChild(this.elementMoveRight);
      this.elementMoveRight.style.float = "right";
      this.elementMoveRight.setAttribute("class","move-right");

      // flèche gauche
      text = document.createTextNode("<-");
      this.elementMoveLeft.appendChild(text);
      this.elementCarte.appendChild(this.elementMoveLeft);
      this.elementMoveLeft.style.float = "left";
      this.elementMoveLeft.setAttribute("class","move-left");
    }
    deleteCarte() {
      // 1 supprimer la carte du tableau de cartes de la colonne
       this.colonne.cartes.splice( this.colonne.cartes.indexOf(this, 1 ) );

       // 2 supprimer l'element du dom qui correspond à cette carte
       this.elementCarte.parentNode.removeChild(this.elementCarte);
    }
    moveRight() {
      // 1 supprimer la carte du tableau de cartes de la colonne
      this.colonne.cartes.splice( this.colonne.cartes.indexOf(this, 1 ) );
      /* 2 Ajouter l'element du dom qui correspond à cette carte à la colonne suivante
       1.1 - Vérifie s'il y a bien une colonne de plus... 
      */
      let num_col = this.tableau.colonnes.indexOf(this.colonne, 1);
      if (num_col == -1) num_col = 0;
      if(this.tableau.colonnes.length - num_col > 1) {
        this.tableau.colonnes[num_col+1].cartes.push(this);
        this.colonne = this.tableau.colonnes[num_col+1];
        this.tableau.colonnes[num_col+1].elementCol.appendChild(this.elementCarte);
      }
    }
    moveLeft() {
      // 1 supprimer la carte du tableau de cartes de la colonne
      this.colonne.cartes.splice( this.colonne.cartes.indexOf(this, 1 ) );
      /* 2 Ajouter l'element du dom qui correspond à cette carte à la colonne suivante
       1.1 - Vérifie s'il y a bien une colonne de plus... 
      */
      let num_col = this.tableau.colonnes.indexOf(this.colonne, 1);
      if (num_col == -1) num_col = 0;
      console.log("col actuelle : " + num_col);
      
      if(num_col != 0) {
        this.tableau.colonnes[num_col-1].cartes.push(this);
        this.colonne = this.tableau.colonnes[num_col-1];
        this.tableau.colonnes[num_col-1].elementCol.appendChild(this.elementCarte);
      }
    }
  }
  