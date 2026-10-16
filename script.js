/* =====================================================
   SWEET CRUMBS BAKERY
   JAVASCRIPT
===================================================== */


/* ================= VARIABLES ================= */

const navbar = document.getElementById("navbar");

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const cartButton = document.getElementById("cartButton");

const cartSidebar = document.getElementById("cartSidebar");

const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const checkoutButton = document.getElementById("checkoutButton");

const currentYear = document.getElementById("currentYear");


/* ================= YEAR ================= */

currentYear.textContent = new Date().getFullYear();


/* ================= NAVBAR SCROLL ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= MOBILE MENU ================= */

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* Close menu when clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* ================= PRODUCT FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        productCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ================= FAVORITES ================= */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            showToast("Added to favorites ❤️");

        } else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

        }

    });

});


/* ================= CART ================= */

let cart = [];


/* ================= ADD TO CART ================= */

const addButtons =
    document.querySelectorAll(".add-button");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(button.getAttribute("data-price"));

        addToCart(name, price);

    });

});


function addToCart(name, price) {

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }

    updateCart();

    showToast(`${name} added to your bag!`);

}


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <span>🛍️</span>

                <h4>Your bag is empty</h4>

                <p>Add something delicious!</p>

            </div>

        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">
                    ${getProductEmoji(item.name)}
                </div>

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>₹${item.price}</span>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;

            cartItemsContainer.appendChild(cartItem);

        });

    }


    /* Cart count */

    const totalItems =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

    cartCount.textContent = totalItems;


    /* Total price */

    const totalPrice =
        cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );

    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;

}


/* ================= PRODUCT EMOJI ================= */

function getProductEmoji(name) {

    if (name.includes("Strawberry")) return "🎂";

    if (name.includes("Chocolate")) return "🍫";

    if (name.includes("Croissant")) return "🥐";

    if (name.includes("Cookie")) return "🍪";

    if (name.includes("Puff")) return "🥟";

    if (name.includes("Bread")) return "🍞";

    return "🧁";

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* ================= REMOVE ITEM ================= */

function removeFromCart(index) {

    const itemName = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showToast(`${itemName} removed from your bag`);

}


/* ================= OPEN CART ================= */

cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

});


/* ================= CLOSE CART ================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);

cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* ================= WHATSAPP ORDER ================= */

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        showToast("Your bag is empty!");

        return;

    }


    let message =
        "Hello Sweet Crumbs Bakery! 👋%0A%0A";

    message +=
        "I would like to place an order:%0A%0A";


    cart.forEach(item => {

        message +=
            `• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}%0A`;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0A*Total: ₹${total}*%0A%0A`;

    message +=
        "Please confirm my order. Thank you! ❤️";


    /*
        IMPORTANT:
        Replace 919876543210 with
        your friend's real WhatsApp number.
    */

    const phone =
        "919876543210";


    const whatsappURL =
        `https://wa.me/${phone}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

});


/* ================= TOAST ================= */

let toastTimeout;


function showToast(message) {

    const toastText =
        toast.querySelector("span");

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeCartSidebar();

        navMenu.classList.remove("active");

    }

});


/* ================= INITIALIZE ================= */

updateCart();