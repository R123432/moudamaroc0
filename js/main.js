const container = document.getElementById("products");

if(container){
products.forEach(product=>{
container.innerHTML += `
<div class="card">
<img src="${product.image}">
<div class="card-content">
<h3>${product.name}</h3>
<p class="price">${product.price} DH</p>
<a class="btn" href="product.html?id=${product.id}">عرض التفاصيل</a>
</div>
</div>
`;
});
}