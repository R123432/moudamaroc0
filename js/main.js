let cart = [];

// عناصر DOM
const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector(".cart-items");
const cartPanel = document.querySelector(".cart-panel");
const cartIcon = document.querySelector(".cart-icon");

// فتح / إغلاق السلة
cartIcon.addEventListener("click", () => {
  cartPanel.classList.toggle("active");
});

// إضافة منتج للسلة
function addToCart(id, name, price) {

  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
}

// تحديث السلة
function updateCart() {

  cartItemsContainer.innerHTML = "";

  let totalCount = 0;

  cart.forEach(item => {

    totalCount += item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <h4>${item.name}</h4>
      <p>${item.price} DH</p>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        ${item.quantity}
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = totalCount;
}

// تغيير الكمية
function changeQuantity(id, amount) {

  const product = cart.find(item => item.id === id);

  if (!product) return;

  product.quantity += amount;

  if (product.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}