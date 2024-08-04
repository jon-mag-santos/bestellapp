function getRestaurant(index) {
    let restaurantTitle = document.getElementById("restaurant-title");
    restaurantTitle.innerHTML = getName(index);

}

function getName(index) {
    return `<h1>${myRestaurants[index].name}</h1>
            <div class="restaurant-rating">Bewertung 
                (${myRestaurants[index].rating.toString().replace(".", ",")} 
            von 5 Sternen)</div>`;
}

function getMenu(index) {
    let restaurant = myRestaurants[index];
    let menu = document.getElementById('meal-menu');
    for (let product = 0; product < restaurant.meals.length; product++) {
        const element = restaurant.meals[product];
        menu.innerHTML += getProduct(element.name,
            element.description,
            element.price.toFixed(2),
            index,
            product);
    }
}

function getProduct(name, description, price, index, product) {
    return `<div class="add-to-basket" onclick="addToBasket(${index}, ${product})">
                <div class="meal-wrapper">
                    <div class="product-name">${name}</div>
                    <div class="product-description">${description}</div>
                    <div class="product-price">${price.toString().replace(".", ",")}€</div>
                </div>
                <div class="product-order-button"></div>
            </div>`;
}

function addToBasket(index, product) {
    let meal = myRestaurants[index].meals[product];
    let basketMeal = basket.findIndex((elem) => { return elem.name == meal.name });

    if (basketMeal != -1) {
        basket[basketMeal].amount += 1;
    } else {
        basket.push(meal);
        basket[basket.length - 1].amount += 1;
    }

    getBasket();
}

function getBasket() {
    let orders = document.getElementById('order-basket');
    orders.innerHTML = "";
    let ordersResponsive = document.getElementById('order-basket-responsive');
    ordersResponsive.innerHTML = "";
    subtotal = 0;
    if (basket.length > 0) {
        for (let index = 0; index < basket.length; index++) {
            const element = basket[index];
            orders.innerHTML += getProductBasket(element.name,
                element.amount,
                element.price);

            ordersResponsive.innerHTML += getProductBasket(element.name,
                element.amount,
                element.price);
            subtotal += (element.amount * element.price);
        }

        saveToLocalStorage();
    }else{
        orders.innerHTML = `<div class="empty-basket">
                                <img class="img-empty-basket" src="./assets/icon/trolley-cart.png">
                                <div class="empty-basket-text">Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
                            </div>`;

        ordersResponsive.innerHTML = `<div class="empty-basket">
                                        <img class="img-empty-basket" src="./assets/icon/trolley-cart.png">
                                        <div class="empty-basket-text">Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
                                    </div>`;

        deleteFromLocalStorage();
    }

    getTotalBasket();
    
}

function getProductBasket(name, amount, price) {
    return `<div class="product-order-basket">
                <h4>${name}</h4>
                <div class="amount-price-wrapper">
                    <div class="amount-wrapper">
                        <div class="basket-order-minus" onclick='updateMinusBasket("${name}")'></div>
                        <div class="product-basket-amount">${amount}</div>
                        <div class="basket-order-plus" onclick='updatePlusBasket("${name}")'></div>
                    </div>
                    <div class="product-basket-price">${(price * amount).toFixed(2).toString().replace('.', ',')}€</div>
                    <img class="delete-product-basket" onclick='deleteFromBasket("${name}")' src="./assets/icon/delete.png">
                </div>
            </div>`
}

function updatePlusBasket(name) {
    let basketMeal = basket.findIndex((elem) => { return elem.name == name });
    basket[basketMeal].amount += 1;
    getBasket();
}

function updateMinusBasket(name) {
    let basketMeal = basket.findIndex((elem) => { return elem.name == name });
    basket[basketMeal].amount -= 1;

    if (basket[basketMeal].amount == 0) {
        basket.splice(basketMeal, 1);
    }
    getBasket();
}

function getTotalBasket() {
    let subtotalBasket = document.getElementById("subtotal-basket");
    subtotalBasket.innerHTML = (basket.length == 0 ? "" : `<div>Zwischensumme</div><div>${(subtotal).toFixed(2).toString().replace('.', ',')}€</div>`);

    let subtotalBasketResponsive = document.getElementById("subtotal-basket-responsive");
    subtotalBasketResponsive.innerHTML = (basket.length == 0 ? "" : `<div>Zwischensumme</div><div>${(subtotal).toFixed(2).toString().replace('.', ',')}€</div>`);

    let deliveryBasket = document.getElementById("delivery-basket");
    deliveryBasket.innerHTML = (basket.length == 0 ? "" : `<div>Lieferkosten</div><div>${(delivery).toFixed(2).toString().replace('.', ',')}€</div>`);

    let deliveryBasketResponsive = document.getElementById("delivery-basket-responsive");
    deliveryBasketResponsive.innerHTML = (basket.length == 0 ? "" : `<div>Lieferkosten</div><div>${(delivery).toFixed(2).toString().replace('.', ',')}€</div>`);

    let pickUpBasket = document.getElementById("pick-up-basket");
    pickUpBasket.style.display = (basket.length == 0 ? "none" : "flex");

    let pickUpBasketResponsive = document.getElementById("pick-up-basket-responsive");
    pickUpBasketResponsive.style.display = (basket.length == 0 ? "none" : "flex");

    total = subtotal + delivery;

    let totalBasket = document.getElementById("total-basket");
    totalBasket.innerHTML = (basket.length == 0 ? "" : `<div>Gesamt</div><div>${(total).toFixed(2).toString().replace('.', ',')}€</div>`);

    let totalBasketResponsive = document.getElementById("total-basket-responsive");
    totalBasketResponsive.innerHTML = (basket.length == 0 ? "" : `<div>Gesamt</div><div>${(total).toFixed(2).toString().replace('.', ',')}€</div>`);

    let btnTotalBasket = document.getElementById("btn-basket-total");
    btnTotalBasket.innerHTML = (basket.length == 0 ? "" : ` (${(total).toFixed(2).toString().replace('.', ',')}€)`);
}

function setPickUp() {
    let pickUpCheckBox = document.getElementById("pick-up-checkbox").checked;
    let pickUpCheckBoxResponsive = document.getElementById("pick-up-checkbox-responsive").checked;

    if ((pickUpCheckBox || pickUpCheckBoxResponsive) && delivery == 5.0) {
        delivery = 0;
        document.getElementById("pick-up-checkbox").checked = true;
        document.getElementById("pick-up-checkbox-responsive").checked = true;
    } else {
        delivery = 5.0;
        document.getElementById("pick-up-checkbox").checked = false;
        document.getElementById("pick-up-checkbox-responsive").checked = false;
    }
    getTotalBasket();
}

function deleteFromBasket(name) {
    let basketMeal = basket.findIndex((elem) => { return elem.name == name });

    basket[basketMeal].amount = 0;
    basket.splice(basketMeal, 1);

    getBasket();
}

function closeBasket() {
    let basketResponsive = document.getElementById("basket-responsive-wrapper");

    basketResponsive.classList.add("closed-basket");
}

function openBasket() {
    let basketResponsive = document.getElementById("basket-responsive-wrapper");

    basketResponsive.classList.remove("closed-basket");
}

function openCloseMenu() {
    let btnMenu = document.getElementById("dropbtn-menu");
    btnMenu.classList.toggle("menu-bars");
    btnMenu.classList.toggle("menu-x-bars");
    let menu = document.getElementById("drop-content");
    menu.classList.toggle("open-menu");
}