import Tableau from "./tableau";
tableau = new Tableau("anonyme");
//tableau.createColonne("En cours d'acquisition");
tableau.setTableauNom("js");
// colonnes
tableau.createColonne("En cours d'acquisition", tableau);
tableau.colonnes[0].drawColonne();

tableau.createColonne("Je sais un peu");
tableau.colonnes[1].drawColonne();

tableau.createColonne("Je sais bien");
tableau.colonnes[2].drawColonne();

tableau.createColonne("Je sais très bien");
tableau.colonnes[3].drawColonne();

// carte
tableau.colonnes[0].createCarte(
  "Le js s'est-il d'abord appelé livescript ?",
  "oui"
);
tableau.colonnes[0].cartes[0].drawCarte();

console.log(tableau);