//Récupérer les données de l'url
let paramsUrl = new URL(window.location).searchParams;
let orderId = paramsUrl.get("orderId");

//Récupérer les données contact
let contact = JSON.parse(localStorage.getItem("contact"));

// Récupérer le prix tital 
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// Afficher en page html la résumé de la commande 
(function display() {
    confirmation.innerHTML += `
        
        <h2>Félicitation! votre commande est passée avec succès !</h2>
        <p>
        Merci monsieur/madame   ${contact.firstName} ${contact.lastName} pour nous avoir fait confiance 
        </p>
        </br>
        <p>
        Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant total de :${prixTotal}  </br>
        </p>
        </br>
        <p>
        Votre adresse de livraison:</br>
        ${contact.firstName} ${contact.lastName}, </br>
        ${contact.address}, </br>
        ${contact.zipcode}, ${contact.city}
        </p>
        </br>
        <p>
        Nous vous enverrons un e-mail à l'adresse : </br> ${contact.email} à l'envoi de votre colis 
        </p> 
    `
})();