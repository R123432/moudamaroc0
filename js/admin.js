let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = parseInt(document.getElementById("stock").value) || 0;
    const image = document.getElementById("image").value;

    if (!name || !price) {
        alert("عمر الاسم والسعر");
        return;
    }

    products.push({
        name: name,
        price: price,
        stock: stock,
        image: image
    });

    saveProducts();
    displayAdminProducts();
    clearInputs();
}

function displayAdminProducts() {
    const container = document.getElementById("adminProducts");
    if (!container) return;

    container.innerHTML = "";

    products.forEach((product, index) => {
        container.innerHTML += `
        <div class="card">
            <h4>${product.name}</h4>
            <p>DH ${product.price}</p>
            <p>المخزون: ${product.stock ?? 0}</p>
            <button onclick="deleteProduct(${index})">حذف</button>
        </div>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    displayAdminProducts();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("image").value = "";
}

window.onload = function() {
    displayAdminProducts();
};