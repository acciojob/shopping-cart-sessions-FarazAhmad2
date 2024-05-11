// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

let cartProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	 cartList.innerHTML = "";
  cartProducts.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
  addRemoveFromCart();
}

// Add item to cart
function addToCart(productId) {
	 const product = products.find((product) => product.id === Number(productId));
  if (product) {
    cartProducts.push(product);
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
}

// Remove item from cart
function removeFromCart(productId) {
	const index = cartProducts.findIndex((product) => product.id === Number(productId));
  if (index !== -1) {
    cartProducts.splice(index, 1); // Remove one item from the cartProducts array at the found index
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
}

// Clear cart
function clearCart() {
	cartProducts = [];
  sessionStorage.clear();
  renderCart();
}

// Initial render
renderProducts();
renderCart();

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = btn.getAttribute("data-id");
    addToCart(id);
    renderCart();
  });
});

const clearCartBtn = document.getElementById("clear-cart-btn");
clearCartBtn.addEventListener("click", clearCart);

function addRemoveFromCart() {
  const removeFromCartBtn = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.getAttribute("data-id");
      removeFromCart(id);
      renderCart();
    });
  });
}

