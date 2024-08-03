function onload() {
    getRestaurant(0);
    getMenu(0);
    getBasket();
}

let basket = [];
let subtotal = 0;
let delivery = 5.0;
let total = 0;