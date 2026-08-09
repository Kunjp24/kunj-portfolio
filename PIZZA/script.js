// =========================================
// PIZZAIOLO - COMPLETE SCRIPT
// =========================================


// =========================================
// 1. PIZZA DATA
// =========================================

const pizzas = [

    {
        name: "Honey Heat",
        price: 20.26,
        description: "Sweet honey, spicy heat and bold flavours.",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
        badge: "POPULAR"
    },

    {
        name: "Pepperoni",
        price: 18.99,
        description: "Classic pepperoni with rich tomato sauce and cheese.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
        badge: "CLASSIC"
    },

    {
        name: "Margherita",
        price: 17.99,
        description: "Fresh tomato, mozzarella, basil and tomato sauce.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
        badge: "FAVOURITE"
    },

    {
        name: "BBQ Chicken",
        price: 21.99,
        description: "Grilled chicken, smoky BBQ sauce and melted cheese.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
        badge: "NEW"
    },

    {
        name: "Veggie",
        price: 19.99,
        description: "Fresh vegetables, herbs and premium mozzarella.",
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c94d?auto=format&fit=crop&w=900&q=85",
        badge: "VEGGIE"
    },

    {
        name: "Spicy Chicken",
        price: 21.49,
        description: "Spicy chicken, peppers, onions and signature sauce.",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=85",
        badge: "SPICY"
    }

];


// =========================================
// 2. MENU
// =========================================

const pizzaGrid =
    document.getElementById("pizzaGrid");


pizzas.forEach(function (pizza) {

    const card =
        document.createElement("article");


    card.classList.add("pizza-card");


    card.innerHTML = `

        <div class="pizza-image">

            <img
                src="${pizza.image}"
                alt="${pizza.name} pizza"
            >

            <span class="pizza-badge">
                ${pizza.badge}
            </span>

        </div>


        <div class="pizza-info">

            <div class="pizza-info-top">

                <h3 class="pizza-name">
                    ${pizza.name}
                </h3>

                <span class="pizza-price">
                    $${pizza.price.toFixed(2)}
                </span>

            </div>


            <p class="pizza-description">
                ${pizza.description}
            </p>


            <button
                type="button"
                class="add-pizza"
                data-name="${pizza.name}">

                ADD TO ORDER

            </button>

        </div>

    `;


    pizzaGrid.appendChild(card);

});


// =========================================
// 3. CART
// =========================================

let cart = [];


const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTax =
    document.getElementById("cartTax");

const cartTotal =
    document.getElementById("cartTotal");


// =========================================
// 4. CART DRAWER
// =========================================

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartClose =
    document.getElementById("cartClose");


function openCart() {

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCart() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartButton.addEventListener(
    "click",
    openCart
);


cartClose.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


// =========================================
// 5. ADD TO CART
// =========================================

const addButtons =
    document.querySelectorAll(".add-pizza");


addButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const pizzaName =
                button.dataset.name;


            const selectedPizza =
                pizzas.find(function (pizza) {

                    return pizza.name === pizzaName;

                });


            if (!selectedPizza) {

                return;

            }


            const existingPizza =
                cart.find(function (pizza) {

                    return pizza.name === pizzaName;

                });


            if (existingPizza) {

                existingPizza.quantity++;

            }

            else {

                cart.push({

                    name: selectedPizza.name,

                    price: selectedPizza.price,

                    quantity: 1

                });

            }


            updateCart();

            openCart();

        }
    );

});


// =========================================
// 6. UPDATE CART
// =========================================

function updateCart() {

    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious
                    from our menu.
                </p>

            </div>

        `;

    }


    // CART ITEMS

    else {

        cart.forEach(function (item, index) {

            const cartItem =
                document.createElement("div");


            cartItem.classList.add(
                "cart-item"
            );


            cartItem.innerHTML = `

                <div>

                    <h3 class="cart-item-name">
                        ${item.name}
                    </h3>

                    <p class="cart-item-price">
                        $${item.price.toFixed(2)}
                    </p>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-button decrease"
                            data-index="${index}">

                            −

                        </button>


                        <span class="quantity-number">
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-button increase"
                            data-index="${index}">

                            +

                        </button>

                    </div>

                </div>


                <div class="cart-item-right">

                    <strong>
                        $${(
                            item.price *
                            item.quantity
                        ).toFixed(2)}
                    </strong>


                    <button
                        type="button"
                        class="remove-item"
                        data-index="${index}">

                        Remove

                    </button>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    // CART COUNT

    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent =
        totalQuantity;


    // SUBTOTAL

    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.quantity;

    });


    // TAX

    const tax =
        subtotal * 0.13;


    // TOTAL

    const total =
        subtotal + tax;


    cartSubtotal.textContent =
        "$" + subtotal.toFixed(2);


    cartTax.textContent =
        "$" + tax.toFixed(2);


    cartTotal.textContent =
        "$" + total.toFixed(2);

}


// =========================================
// 7. CART ITEM BUTTONS
// =========================================

cartItems.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");


        if (!button) {

            return;

        }


        const index =
            Number(button.dataset.index);


        // DECREASE

        if (
            button.classList.contains(
                "decrease"
            )
        ) {

            if (!cart[index]) return;


            cart[index].quantity--;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(index, 1);

            }


            updateCart();

        }


        // INCREASE

        else if (
            button.classList.contains(
                "increase"
            )
        ) {

            if (!cart[index]) return;


            cart[index].quantity++;


            updateCart();

        }


        // REMOVE

        else if (
            button.classList.contains(
                "remove-item"
            )
        ) {

            if (!cart[index]) return;


            cart.splice(index, 1);


            updateCart();

        }

    }
);


// =========================================
// 8. CLEAR CART
// =========================================

const clearCartButton =
    document.getElementById("clearCart");


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {

            cart = [];

            updateCart();

        }
    );

}


// =========================================
// 9. CHECKOUT ELEMENTS
// =========================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


const checkoutOverlay =
    document.getElementById(
        "checkoutOverlay"
    );


const checkoutClose =
    document.getElementById(
        "checkoutClose"
    );


const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );


// =========================================
// 10. OPEN CHECKOUT
// =========================================

function openCheckout() {

    // Don't checkout empty cart

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a pizza first."
        );

        return;

    }


    // Calculate total

    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.quantity;

    });


    const tax =
        subtotal * 0.13;


    const total =
        subtotal + tax;


    // Show total

    checkoutTotal.textContent =
        "$" + total.toFixed(2);


    // Close cart

    closeCart();


    // Open checkout

    checkoutOverlay.classList.add(
        "active"
    );

}


// =========================================
// 11. CLOSE CHECKOUT
// =========================================

function closeCheckout() {

    checkoutOverlay.classList.remove(
        "active"
    );

}


// =========================================
// 12. CHECKOUT BUTTON
// =========================================

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            openCheckout();

        }
    );

}


// =========================================
// 13. CHECKOUT CLOSE
// =========================================

if (checkoutClose) {

    checkoutClose.addEventListener(
        "click",
        function () {

            closeCheckout();

        }
    );

}


// =========================================
// 14. PICKUP / DELIVERY
// =========================================

const orderTypeInputs =
    document.querySelectorAll(
        'input[name="orderType"]'
    );


const pickupSection =
    document.getElementById(
        "pickupSection"
    );


const deliverySection =
    document.getElementById(
        "deliverySection"
    );


orderTypeInputs.forEach(function (input) {

    input.addEventListener(
        "change",
        function () {

            if (
                input.value === "delivery"
            ) {

                deliverySection.classList.add(
                    "active"
                );


                pickupSection.style.display =
                    "none";

            }

            else {

                deliverySection.classList.remove(
                    "active"
                );


                pickupSection.style.display =
                    "block";

            }

        }
    );

});


// =========================================
// 15. INITIALIZE
// =========================================

updateCart();


console.log(
    "🍕 Pizzaiolo website loaded successfully!"
);