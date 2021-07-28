///***********************/ Panier /****************************///

//Récupération du panier dans le local storage
let cameras = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

//Placer dans le page HTML
let cart = document.getElementById("cart");

//Mettre le prix total du panier à 0
let prixPanier = 0;

//Récupérer l'id du produit
let addIdBasket = [];

//Boucle sur le panier et affichage en page HTML 
cameras.forEach((camera, sup) => {
    //La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
    cart.innerHTML += `
    <div class="element_panier">       
        <div class="image_panier">
           <img src=${camera.imageUrl} alt="" />
        </div>
        <div class="name">
           <h3> Nom</h3>
           <div>${camera.name}</div>
        </div>
        <div class="quantity">
           <h3> Quantitée</h3>
           <div>${camera.quantity}</div>
        </div>
        <div class="price">
           <h3> Prix</h3>
           <div >${camera.quantity * camera.price / 100} €</div>
        </div>
        <div class="delete">
          <h3> Supprimer</h3>
          <div><a href="#" id="supCamera" data-id="${sup}"> <i class="fas fa-trash-alt"></i></a></div>
        </div>
    </div>
  `;
    //Appel de la fonction de 
    priceTotalBasket(camera)

    //Le boucle pour incrementer l'id produit
    for (let i = 0; i < camera.quantity; i++) {
        addIdBasket.push(camera.id);
    }

    //Evenement au click + fonction plus
    let btnPlus = document.getElementById('supCamera');

    btnPlus.addEventListener('click', function() {
        supCamera(camera)
    });

});

//***************************************/ supprimer camera de la page panier /**********************************************/

function supCamera(id) {
    let camera = cameras[id];

    cameras.splice(id, 1);

    localStorage.setItem('panier', JSON.stringify(cameras));

    //Rafraichir la page panier
    window.location.reload();
}

//supprimer camera de page panier
let suprrimerCamera = document.querySelectorAll(".supCamera");

suprrimerCamera.forEach(supButton => {
    supButton.addEventListener('click', () => supCamera(supButton.dataset.id))
});


//*********/ Calculer le prix totale de panier et l'envoyer au local storage /**************/

function priceTotalBasket(camera) {
    prixPanier += camera.quantity * camera.price / 100;
    //Afficher le prix total de panier 
    let prixTotal = document.getElementById('prixTotal').textContent = prixPanier + " € ";
    //Envoyer le au localstorage
    localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

//***************************************/ Formulaire /**********************************************/

function sendOrder() {
    let form = document.getElementById("form");
    if (form.reportValidity() == true && addIdBasket.length > 0) {
        let contact = {

            'firstName': document.getElementById("nom").value,
            'lastName': document.getElementById("prenom").value,
            'address': document.getElementById("adresse").value,
            'zipcode': document.getElementById("zipcode").value,
            'city': document.getElementById("ville").value,
            'email': document.getElementById("email").value
        };

        let products = addIdBasket;

        let formulaireClient = JSON.stringify({
            contact,
            products,
        });

        // Appel d'api avec fetch et envoie des données avec la method POST 
        fetch('http://localhost:3000/api/cameras/order', {
                method: 'POST',
                headers: {
                    'content-type': "application/json"
                },
                mode: "cors",
                body: formulaireClient
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(r) {
                localStorage.setItem("contact", JSON.stringify(r.contact));
                window.location.assign("confirmation.html?orderId=" + r.orderId);
            })
            //Si problème d'api
            .catch(function(err) {
                console.log("fetch Error");
            });
    }

}

let envoiFormulaire = document.getElementById("envoiFormulaire");

envoiFormulaire.addEventListener('click', function(event) {
    event.preventDefault();
    sendOrder();
});