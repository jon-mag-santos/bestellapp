function onload() {
    getRestaurant(0);
    getMenu(0);
    getFromLocalStorage();
    getBasket();
}

let basket = [];
let subtotal = 0;
let delivery = 5.0;
let total = 0;

function saveToLocalStorage() {
    localStorage.setItem("basket-bestellapp", JSON.stringify(basket));
}

function getFromLocalStorage() {
    let localBasket = JSON.parse(localStorage.getItem("basket-bestellapp"));
    if (localBasket != null) {
        basket = localBasket;
    }
}

function deleteFromLocalStorage() {
    localStorage.removeItem("basket-bestellapp");
}