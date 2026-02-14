// نجيب المنتجات من localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// عرض المنتجات
function renderProducts(){

const container = document.getElementById("products");
if(!container) return;

container.innerHTML = "";

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

<a class="btn" onclick="openProduct(${product.id})">
عرض المنتج
</a>
</div>
</div>
`;
});

}

// فلترة وبحث
function filterProducts(){

let search = document.getElementById("searchInput")?.value.toLowerCase() || "";
let price = document.getElementById("priceFilter")?.value || "";

const container = document.getElementById("products");
if(!container) return;

container.innerHTML="";

products.forEach(product=>{

let matchSearch = product.name.toLowerCase().includes(search);
let matchPrice = price==="" || product.price <= Number(price);

if(matchSearch && matchPrice){

let finalPrice = product.price - (product.price * product.discount / 100);

container.innerHTML += `
<div class="card">
<img src="${product.image}">
<div class="card-content">
<h3>${product.name}</h3>
<p class="price">${finalPrice} DH</p>
<a class="btn" onclick="addToCart(${product.id})">أضف للسلة</a>
</div>
</div>
`;
}
});

}

// فتح popup المنتج
function openProduct(id){

id = Number(id);

let product = products.find(p=>Number(p.id)===id);
if(!product) return;

let finalPrice = product.price - (product.price * product.discount / 100);

document.getElementById("modalBody").innerHTML = `
<img src="${product.image}">
<h2>${product.name}</h2>
<p>${finalPrice} DH</p>
<p>باقي ${product.stock} فقط</p>
<button onclick="addToCart(${product.id})" class="btn">
أضف للسلة
</button>
`;

document.getElementById("productModal").style.display="flex";
}

function closeModal(){
document.getElementById("productModal").style.display="none";
}

// عداد العرض
function startCountdown(){
let time = 3600;

setInterval(()=>{
let minutes = Math.floor(time / 60);
let seconds = time % 60;

let el = document.getElementById("countdown");
if(el){
el.innerText =
"العرض ينتهي خلال: " + minutes + ":" + (seconds<10?"0":"") + seconds;
}

if(time > 0) time--;
},1000);
}

document.addEventListener("DOMContentLoaded", function(){
renderProducts();
startCountdown();
});