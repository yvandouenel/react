import React, { Component } from "react";

class Neore extends Component {
  state = {};
  // QUELQUES PARAMETRES DE BASE
  params = {
    url_serveur: "http://memo.coopernet.fr/",
    url_get: "get.php",
    url_post: "post.php",
    url_sign: "sign.php"
  };
  changeFormSign = event => {
    event.preventDefault();
  };
  submitSign = event => {
    event.preventDefault();
    const email = document.getElementById("signemail");
    const pwd = document.getElementById("signpwd");

    this.memoSign(
      email.value,
      pwd.value,
      this.props.onSuccessSign,
      false,
      false
    );

    /*  */

      /* const state = {...this.state};
      state.isLogged = true;
      this.setState(state);
    }*/

    return false;
  };


  /* getMemo
La fonction pour récupérer les données sur le serveur.
La fonction demande quelques arguments :
- l'adresse email de l'utilisateur,
- Une fonction (success) qui sera executée en cas de réussite, c'est la fonction de callback qui prendra en argument les données.
- Une fonction (before) qui est executée avant le lancement de la connexion, ça peut être pratique pour indiquer que les données sont en cours de récupération.
- Une fonction (progress), cerise sur le gateau, qui est executée à interval régulier pour indiquer la progression du téléchargement.
(Les fonctions before et success sont optionelles et peuvent être remplacées par 'false' si elles ne sont pas utilisées.
*/

  getMemo = (email, success, before, progress) => {
    // INIT
    // UN PEU DE LOG POUR DIRE CE QU'ON FAIT
    var url = this.params.url_serveur + this.params.url_get + "?email=" + email;
    console.log("[MEMO]", "GET DATA", email, url);

    // SI LA FONCTION BEFORE EXISTE, BEN ON L'EXECUTE
    if (before) before();

    // ON CREE LA CONNEXION
    var httpRequest = new XMLHttpRequest();

    // ON FIXE UN TIMEOUT, HISTOIRE DE...
    httpRequest.timeout = 30000;

    // ON DEFINI UN ECOUTEUR SUR LE CHANGEMENT D'ETAT DE LA CONNEXION
    httpRequest.onreadystatechange = function() {
      // ON ECOUTE SI LA CONNEXION EST TERMINE AVEC SUCCESS
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // SI ON RECUPERE UN CODE 200 (Indiquant que tout s'est bien passé)
        if (httpRequest.status === 200) {
          // ON TENTE DE PARSER LA REPONSE JSON
          try {
            var data = JSON.parse(httpRequest.responseText);
          } catch (e) {
            // CA CHIE, ON LOG L'ERREUR ET ON SORT
            console.error("[MEMO]", e, httpRequest.responseText);
            return false;
          }

          // TOUT VA BIEN ON RETOURNE LES DONNES VIA LA FONCTION DE CALLBACK success
          // Tu commences à comprendre à quoi ça sert la fonction de callback ?
          console.log("EMAIL : ", email);
          success(data, email);

          // on sauvegarde toutes les 10 s
          /* setInterval(() => {
            console.log("Ecriture json sur serveur");
            this.postMemo(email, data, false, false, false);
          }, 5000); */

          // ON RETOURNE QU'ON EST BIEN CONTENT
          return true;
        } else {
          // EN CAS D'ERREUR DE REPONSE
          if (httpRequest.status !== 0) {
            console.error(
              "[MEMO] La requête a retournée une erreur : " + httpRequest.status
            );
            return false;
          }
        }
      }
    };

    // ON VA ECOUTER LE TIMEOUT ET SI CE DERNIER ARRIVE... Ben, on le dit !
    httpRequest.ontimeout = function(evt) {
      console.error("[MEMO] La requête a expirée");
      return false;
    };

    // PENDANT QUE LE TELECHARGEMENT...
    httpRequest.onprogress = function(evt) {
      if (evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) * 100;

        // ON FILE LA PROGRESSION EN POURCENTAGE A LA FONCTION progress (Si elle existe of course...)
        if (progress) progress(percentComplete);
      }
    };

    // ON OUVRE LA CONNEXION
    httpRequest.open("GET", url, true);

    // ET ON LANCE LA REQUETE, FACILE QUOI !
    httpRequest.send();
  };

  success = data => {
    // On test le status
    if (data.status === "OK") {
      // Alors tout va bien
      // On affiche le message dans la console.
      console.log("[MEMO]", data.message);

      // On affiche les données dans la console.
      console.log("[MEMO]", data.data);

      // Maintenant, vous pouvez faire ici ce que vous voulez de ces données...
      // ...
      // ...
    } else {
      // IL Y A UNE COUILLE DANS LE POTAGE
      // ON va afficher le message d'erreur dans la console
      console.error("[MEMO]", data.message);
    }

    // C'était pas bien sorcier...
  };

  before = () => {
    // On affiche juste dans la console que le boulot est lancé
    console.log("[MEMO] Le boulot est commencé...");

    // Grosse fonction non ?
  };

  progress = pourcentage => {
    // On affiche juste dans la console que le boulot est lancé
    console.log(
      "[MEMO] Les données sont téléchargées à : " + pourcentage + "%"
    );

    // Vous suivez ?
  };

  success_post = data => {
    // On test le status
    if (data.status === "OK") {
      // Alors tout va bien
      // On affiche le message dans la console.
      console.log("[MEMO]", data.message);
    } else {
      // IL Y A UNE COUILLE DANS LE POTAGE
      // ON va afficher le message d'erreur dans la console
      console.error("[MEMO]", data.message);
    }

    // C'était pas bien sorcier...
  };

  before_post = () => {
    // On affiche juste dans la console que le boulot est lancé
    console.log("[MEMO] Le boulot est commencé...");

    // Grosse fonction non ?
  };

  before_sign = () => {
    // On affiche juste dans la console que le boulot est lancé
    console.log("[MEMO] Authentification en cours...");

    // Grosse fonction non ?
  };

  success_sign = data => {
    // On test le status
    if (data.status === "OK") {
      // Alors tout va bien
      // On affiche le message dans la console.
      console.log("[MEMO]", data.message);

      // On Stocke le token dans localStorage
      localStorage.setItem("token", data.data);
    } else {
      // IL Y A UNE COUILLE DANS LE POTAGE
      // ON va afficher le message d'erreur dans la console
      console.error("[MEMO]", data.message);
    }

    // C'était pas bien sorcier...
  };

  postMemo = (email, data, success, before, progress) => {
    // INIT
    var url = this.params.url_serveur + this.params.url_post;

    // ON CONVERTIT LES DONNEES EN STRING
    var data_json = "data=" + JSON.stringify(data);

    // ON AJOUTE L'EMAIL AUX DATA
    var data_send = "email=" + email + "&" + data_json;

    console.log("[MEMO]", "POST DATA", data_send);

    // SI LA FONCTION BEFORE EXISTE, BEN ON L'EXECUTE
    if (before) before();

    // ON CREE LA CONNEXION
    var httpRequest = new XMLHttpRequest();

    // ON FIXE UN TIMEOUT, HISTOIRE DE...
    httpRequest.timeout = 30000;

    // ON DEFINI UN ECOUTEUR SUR LE CHANGEMENT D'ETAT DE LA CONNEXION
    httpRequest.onreadystatechange = function() {
      // ON ECOUTE SI LA CONNEXION EST TERMINE AVEC SUCCESS
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // SI ON RECUPERE UN CODE 200 (Indiquant que tout s'est bien passé)
        if (httpRequest.status === 200) {
          // ON TENTE DE PARSER LA REPONSE JSON
          try {
            var data = JSON.parse(httpRequest.responseText);
          } catch (e) {
            // CA CHIE, ON LOG L'ERREUR ET ON SORT
            console.error("[MEMO]", e, httpRequest.responseText);
            return false;
          }

          // TOUT VA BIEN ON RETOURNE LES DONNES VIA LA FONCTION DE CALLBACK success
          // Tu commences à comprendre à quoi ça sert la fonction de callback ?
          success(data);

          // ON RETOURNE QU'ON EST BIEN CONTENT
          return true;
        } else {
          // EN CAS D'ERREUR DE REPONSE
          if (httpRequest.status !== 0) {
            console.error(
              "[MEMO] La requête a retournée une erreur : " + httpRequest.status
            );
            return false;
          }
        }
      }
    };

    // ON VA ECOUTER LE TIMEOUT ET SI CE DERNIER ARRIVE... Ben, on le dit !
    httpRequest.ontimeout = function(evt) {
      console.error("[MEMO] La requête a expirée");
      return false;
    };

    // PENDANT QUE LE TELECHARGEMENT...
    httpRequest.onprogress = function(evt) {
      if (evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) * 100;

        // ON FILE LA PROGRESSION EN POURCENTAGE A LA FONCTION progress (Si elle existe of course...)
        if (progress) progress(percentComplete);
      }
    };

    // ON OUVRE LA CONNEXION
    httpRequest.open("POST", url, true);

    // SEND HEADER
    httpRequest.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    // ET ON LANCE LA REQUETE, FACILE QUOI !
    httpRequest.send(data_send);
  };

  memoSign = (email, password, success, before, progress) => {
    // INIT
    var url = this.params.url_serveur + this.params.url_sign;

    // ON PREPARE LES DATA
    var data_send = "email=" + email + "&password=" + password;

    console.log("[MEMO]", "SIGN WITH DATA", data_send);

    // SI LA FONCTION BEFORE EXISTE, BEN ON L'EXECUTE
    if (before) before();

    // ON CREE LA CONNEXION
    var httpRequest = new XMLHttpRequest();

    // ON FIXE UN TIMEOUT, HISTOIRE DE...
    httpRequest.timeout = 30000;

    // ON DEFINI UN ECOUTEUR SUR LE CHANGEMENT D'ETAT DE LA CONNEXION
    httpRequest.onreadystatechange = () => {
      // ON ECOUTE SI LA CONNEXION EST TERMINE AVEC SUCCESS
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // SI ON RECUPERE UN CODE 200 (Indiquant que tout s'est bien passé)
        if (httpRequest.status === 200) {
          // ON TENTE DE PARSER LA REPONSE JSON
          try {
            var data = JSON.parse(httpRequest.responseText);
          } catch (e) {
            // CA CHIE, ON LOG L'ERREUR ET ON SORT
            console.error("[MEMO]", e, httpRequest.responseText);
            return false;
          }

          // TOUT VA BIEN ON RETOURNE LES DONNES VIA LA FONCTION DE CALLBACK success
          // Tu commences à comprendre à quoi ça sert la fonction de callback ?
          success(data,email);

          // on va chercher les données
          this.getMemo(email, this.props.onSuccessGetMemo, false, false);

          // ON RETOURNE QU'ON EST BIEN CONTENT
          return true;
        } else {
          // EN CAS D'ERREUR DE REPONSE
          if (httpRequest.status !== 0) {
            console.error(
              "[MEMO] La requête a retournée une erreur : " + httpRequest.status
            );
            return false;
          }
        }
      }
    };

    // ON VA ECOUTER LE TIMEOUT ET SI CE DERNIER ARRIVE... Ben, on le dit !
    httpRequest.ontimeout = function(evt) {
      console.error("[MEMO] La requête a expirée");
      return false;
    };

    // PENDANT QUE LE TELECHARGEMENT...
    httpRequest.onprogress = function(evt) {
      if (evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) * 100;

        // ON FILE LA PROGRESSION EN POURCENTAGE A LA FONCTION progress (Si elle existe of course...)
        if (progress) progress(percentComplete);
      }
    };

    // ON OUVRE LA CONNEXION
    httpRequest.open("POST", url, true);

    // SEND HEADER
    httpRequest.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    // ET ON LANCE LA REQUETE, FACILE QUOI !
    httpRequest.send(data_send);
  };
  render() {
    return (
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
    );
  }
}
export default Neore;
