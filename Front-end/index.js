//variable container
let container = document.getElementById("container");

// Fonction pour afficher les élements en page d'accueil (page produit)
const display = camera => {
    container.innerHTML += `
    <article id="cardsProduct" class="produit">
        <div class="card_img">
           <img src=${camera.imageUrl} alt="photos produits" />
        </div>
        <div class="description">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
            <a href="pages/produit.html?id=${camera.id}"> En savoir plus</a>
        </div>
    </article>`
};

//Appel d'api avec fetch
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(listeProduct => {
        // boucle for pour prendre un produit de la liste 
        for (let product of listeProduct) {
            let camera = new Camera(product)
            display(camera);
        }
    })

//Si l'api ne répond pas 
.catch(function(err) {
    console.log("fetch Error")
    alert("Exusez nous les produits ne sont pas disponible pour le moment ")
});