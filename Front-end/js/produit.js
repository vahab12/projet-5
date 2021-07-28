//Récuperer l'url
let params = (new URL(document.location)).searchParams;

//Stocker l'id
const id = params.get("id");

//Placer en page HTML
let produit = document.getElementById("produit");

// Fonction envoyer au local storage
const addLocalStorage = panier => {
    localStorage.setItem('panier', JSON.stringify(panier));
    //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
    console.log(addLocalStorage(camera));
};

// Inclure l'HTML
const display = camera => { // function display (camera){} 
    produit.innerHTML += `
    <div class="page_produit" id="card">
      <div class="img_produit">
        <img src=${camera.imageUrl} alt="">
      </div>
      <div class="description_produit">
         <div class="nom_produit">
             <h2 class="nom">${camera.name}</h2>
         </div>
         <div class="prix_produit">
             <p class="prix"> Prix unitaire: ${camera.price/ 100}€</p>
         <div/>
         <select class="options_produit" id ="option">
            <option>Choix options</option>
         </select>
         <div class="quantite">
            <p>Quantitée: </p>
            <select class="q_produit" id="quantity"> 
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>   
         <div>
         <div class="texte_produit">
             <p>${camera.description}</p>
         </div>
         <div class="button">      
            <a href ="./panier.html"><button type ="submit" id="panier" value="submit"> Ajouter au panier</button></a>
         </div>   
      </div>
    </div>
  `;
    // Choisir une option de camera
    for (let lenses of camera.lenses) {
        document.getElementById('option').innerHTML +=
            `<option value="1">${lenses}</option>`
    }
    //Evenement au click + fonction addProductBasket
    let panier = document.getElementById('panier');
    panier.addEventListener('click', function() {
        addProductBasket(camera)
    });
};


//Fonction ajouter dans le panier
const addProductBasket = camera => {
    camera.quantity = parseInt(document.getElementById('quantity').value);

    //Récupération du panier//memo : let variable=(condition) ? "valeur si vrai": "valeur si faux"
    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

    //Boucle (for) pour parcourir la ligne du panier 
    let cameraExistIndex = false;
    for (let i = 0; i < panier.length; i++) {
        let product = panier[i];
        //Condition si le produit existe
        if (product.id === camera.id) {
            cameraExistIndex = i;
        }
    };
    // Caméra existe dans le panier
    if (false !== cameraExistIndex) {
        panier[cameraExistIndex].quantity = parseInt(panier[cameraExistIndex].quantity) + camera.quantity;
    } else {
        panier.push(camera);
    };
    addLocalStorage(panier)
};


// Appel de l'api avec fetch
fetch("http://localhost:3000/api/cameras/" + id)
    .then(response => response.json())
    .then(product => {
        let camera = new Camera(product);
        display(camera);
    })
    // Si il y a problème d'api 
    .catch(function(err) {
        console.log("fetch Error")
    });