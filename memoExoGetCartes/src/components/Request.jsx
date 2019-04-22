class Request {
    constructor() {
        this.url = "http://memogetdatatest.coopernet.fr/get.php";
    }
    getData(success,failed) {
        // création de l'objet XMLHttpRequest
        const req = new XMLHttpRequest();
        // ouverture de la connexion
        req.open("GET", this.url);
        // envoi de la requête
        req.send(null);

        req.onload = function (event) {
            // On test directement le status de notre instance de XMLHttpRequest
            if (this.status === 200) {
                // Tout baigne, voici le contenu de la réponse
                
                let data = JSON.parse(this.responseText);

                //console.log("Contenu", data.data);
                success(data.data);
            } else {
                // On y est pas encore, voici le statut actuel
                console.log("Statut actuel", this.status, this.statusText);
            }
        }
        req.onerror = function (event) {
            // Cette fonction sera appellée uniquement en cas d'erreur de la requête.
            // Il nous suffit d'indiquer l'erreur dans la console pour en savoir plus.
            console.error("Erreur", event.target.status);
            failed(event.target.status)
        }
    }
}

export default Request;