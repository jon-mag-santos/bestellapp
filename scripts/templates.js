
function getName(index) {
    return `<h1>${myRestaurants[index].name}</h1>
            <div class="restaurant-rating">Bewertung 
                (${myRestaurants[index].rating.toString().replace(".", ",")} 
            von 5 Sternen)</div>`;
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

function basketNotEmpty(){
    return basket.length > 0;
}

function getEmptyBasket() {
    return `<div class="empty-basket">
                <img class="img-empty-basket" src="./assets/icon/trolley-cart.png">
                <div class="empty-basket-text">Wähle leckere Gerichte aus der Karte und bestelle dein Menü.</div>
            </div>`;
}