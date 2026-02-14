const container = document.getElementById("products");

if(container){
products.forEach(product=>{

let finalPrice = product.price - (product.price * product.discount / 100);

container.innerHTML += `
<div class="card fade-in">
<img src="${product.image}">
<div class="card-content">
<h3>${product.name}</h3>

<p class="price">
${finalPrice} DH 
<span style="text-decoration:line-through;color:gray;">
${product.price}
</span>
</p>

<div class="badge">خصم ${product.discount}%</div>

<div class="rating">⭐⭐⭐⭐☆</div>

<p style="color:gold;">باقي ${product.stock} فقط 🔥</p>

<a class="btn" onclick="addToCart(${product.id})">
أضف للسلة
</a>

</div>
</div>
`;
});
}