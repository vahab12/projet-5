//Classe caméra
//Une classe JavaScript est un type de fonction. Les classes sont déclarées avec le mot-clé class.
class Camera {
    //La méthode constructor est une méthode qui est utilisée pour créer et initialiser un objet lorsqu'on utilise le mot clé class
    constructor({
        name,
        imageUrl,
        price,
        _id,
        description,
        lenses,
        quantity
    }) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = _id;
        this.description = description;
        this.lenses = lenses;
        // parseInt transformation le chaine de caractère(string) en nombre (number)
        this.quantity = parseInt(quantity, 10);
    }
};


//**************/ Menu Toggle /******************/
function menuToggle() {

    var menu = document.getElementById("myTopnav");

    if (menu.className === "topnav") {
        menu.className += " responsive";
    } else {
        menu.className = "topnav";
    }
}