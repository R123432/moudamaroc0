const products = [
{id:1,name:"Smart Watch",price:50,image:"https://images.unsplash.com/photo-1519741497674-611481863552",badge:"NEW",rating:4},
{id:2,name:"Headphones",price:80,image:"https://images.unsplash.com/photo-1580894908361-967195033215",badge:"SALE",rating:5},
{id:3,name:"Sneakers",price:120,image:"https://images.unsplash.com/photo-1528701800489-20be3c69a1b1",badge:"",rating:4},
{id:4,name:"Backpack",price:40,image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",badge:"NEW",rating:3}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const container = document.getElementById("products");
const cartBox = document.getElementById("cartBox");
const cartBtn = document.getElementById("cartBtn");
const count = document.getElementById("count");
const total = document.getElementById("total");
const cartItems = document.getElementById("cartItems");

function displayProducts(){
container.innerHTML="";
products.forEach(p=>{
container.innerHTML+=`
<div class="card">
${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
<img src="${p.image}" onclick="openModal(${p.id})">
<div class="card-content">
<h3>${p.name}</h3>
<div class="price">$${p.price}</div>
<div class="stars">${"⭐".repeat(p.rating)}</div>
<div class="actions">
<button onclick="addToCart(${p.id})">Add</button>
<span class="fav" onclick="toggleFav(${p.id})">
${favorites.includes(p.id) ? "❤️" : "🤍"}
</span>
</div>
</div>
</div>`;
});
}

function addToCart(id){
let product = products.find(p=>p.id===id);
cart.push(product);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function updateCart(){
cartItems.innerHTML="";
let sum=0;
cart.forEach(item=>{
sum+=item.price;
cartItems.innerHTML+=`<p>${item.name} - $${item.price}</p>`;
});
total.textContent=sum;
count.textContent=cart.length;
}

function toggleFav(id){
if(favorites.includes(id)){
favorites = favorites.filter(f=>f!==id);
}else{
favorites.push(id);
}
localStorage.setItem("favorites",JSON.stringify(favorites));
displayProducts();
}

cartBtn.onclick=()=>cartBox.classList.toggle("active");
document.getElementById("darkBtn").onclick=()=>document.body.classList.toggle("dark");

function openModal(id){
let p = products.find(x=>x.id===id);
document.getElementById("modal").style.display="flex";
document.getElementById("modalImg").src=p.image;
document.getElementById("modalTitle").textContent=p.name;
document.getElementById("modalPrice").textContent="$"+p.price;
}

document.getElementById("closeModal").onclick=()=>{
document.getElementById("modal").style.display="none";
}

displayProducts();
updateCart();