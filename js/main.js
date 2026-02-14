let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayProducts(list = products) {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    container.innerHTML = "";

    list.forEach((product, index) => {
        container.innerHTML += `
        <div class="card">
            <img src="${product.image || 'https://via.placeholder.com/300'}" style="width:100%;height:200px;object-fit:cover;border-radius:10px;">
            <h3>${product.name}</h3>
            <p>DH ${product.price}</p>
            <p>المخزون: ${product.stock ?? 0}</p>
            <button class="btn" onclick="addToCart(${index})">أضف للسلة</button>
        </div>
        `;
    });
}

function addToCart(index) {
    const product = products[index];

    if ((product.stock ?? 0) <= 0) {
        alert("المنتج غير متوفر في المخزون");
        return;
    }

    cart.push(product);
    product.stock -= 1;

    saveProducts();
    saveCart();
    updateCartCount();
    displayProducts();
}

function updateCartCount() {
    const count = document.querySelector(".cart-count");
    if (count) {
        count.innerText = cart.length;
    }
}

function displayCart() {
    const panel = document.getElementById("cartItems");
    if (!panel) return;

    panel.innerHTML = "";

    cart.forEach((item, i) => {
        panel.innerHTML += `
        <div class="cart-item">
            <h4>${item.name}</h4>
            <p>DH ${item.price}</p>
            <button onclick="removeFromCart(${i})">حذف</button>
        </div>
        `;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCart();
}

function toggleCart() {
    const panel = document.querySelector(".cart-panel");
    panel.classList.toggle("active");
}

window.onload = function() {
    displayProducts();
    displayCart();
    updateCartCount();
};