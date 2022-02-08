/**
 * JavaScricpt Shopping Cart
 */
var products = [{
        name: "Orchidea",
        image: "https://images.pexels.com/photos/992734/pexels-photo-992734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 8.50,
        qtty: 1
    }, {
        name: "Orange roses",
        image: "https://images.pexels.com/photos/462402/pexels-photo-462402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 5.80,
        qtty: 1
    }, {
        name: "Daisy",
        image: "https://images.pexels.com/photos/1166869/pexels-photo-1166869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 2.70,
        qtty: 1
    }, {
        name: "Pink roses",
        image: "https://images.pexels.com/photos/617967/pexels-photo-617967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 6.70,
        qtty: 1
    }, {
        name: "Sun flowers",
        image: "https://images.pexels.com/photos/1390433/pexels-photo-1390433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 3.70,
        qtty: 1
    },
    {
        name: "White Orchidea",
        image: "https://images.pexels.com/photos/3686216/pexels-photo-3686216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        price: 10.70,
        qtty: 1
    }

];
for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${val.price} €</p>
        <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `
}

var cart = [];

function addToCart(product, index) {

    if (cart.length == 0) {
        cart.push(product);

    } else if (cart.find((val) => val.name == product.name)) {

        product.qtty++;

    } else {
        cart.push(product);

    }
    createRows();

    Total();
    allItems()

}




let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i]);
    })
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
            allItems()


        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
            allItems()


        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();

            allItems()

        });
    }


}

function allItems() {
    let allItemsInCard = 0;

    for (let val of cart) {
        allItemsInCard += val.qtty;
    }
    document.getElementById("cardAmmount").innerHTML = allItemsInCard
}

function Total() {
    let total = 0;
    let newTotal = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }
    if (total >= 10 && total < 30) {
        newTotal = total * 95 / 100

    } else if (total >= 20 && total < 40) {
        newTotal = total * 90 / 100
    } else if (total >= 30 && total < 100) {
        newTotal = total * 85 / 100

    } else {
        newTotal = total * 80 / 100
    }

    document.getElementById("newPrice").innerHTML = newTotal.toFixed(2) + "€"
    document.getElementById("price").innerHTML = total.toFixed(2) + " €";



}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;

}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

// function newTotal() {
//     let discountTwenty = total * 90 / 100;
//     let discountTwenty = total * 80 / 100;
// }