// عرض المنتجات
function displayProducts(list = products) {

    const container = document.getElementById("products");
    container.innerHTML = "";

    if (!list || list.length === 0) {
        container.innerHTML = "<p style='text-align:center'>لا توجد منتجات</p>";
        return;
    }

    list.forEach(product => {

        container.innerHTML += `
        <div class="card fade-in">
            <img src="${product.image}" onclick="openModal(${product.id})">
            <h3>${product.name}</h3>
            <p>${product.price} DH</p>
            <button class="btn" onclick="addToCart(${product.id})">
                أضف للسلة
            </button>
        </div>
        `;
    });
}

// فلترة المنتجات
function filterProducts() {

    const search = document.getElementById("searchInput").value.toLowerCase();
    const priceFilter = document.getElementById("priceFilter").value;

    let filtered = products.filter(product => 
        product.name.toLowerCase().includes(search)
    );

    if (priceFilter) {
        filtered = filtered.filter(product => product.price <= Number(priceFilter));
    }

    displayProducts(filtered);
}

// مودال المنتج
function openModal(id) {

    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById("modalBody").innerHTML = `
        <img src="${product.image}">
        <h2>${product.name}</h2>
        <p>السعر: ${product.price} DH</p>
        <button class="btn" onclick="addToCart(${product.id})">
            أضف للسلة
        </button>
    `;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// Countdown بسيط
function startCountdown() {

    const countdownElement = document.getElementById("countdown");
    if (!countdownElement) return;

    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);

    setInterval(() => {

        const now = new Date().getTime();
        const distance = targetDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        countdownElement.innerHTML = `العرض ينتهي خلال: ${hours} ساعة و ${minutes} دقيقة`;

    }, 60000);
}

// تشغيل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    displayProducts();
    startCountdown();
});