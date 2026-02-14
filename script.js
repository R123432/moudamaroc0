const products = [
{name:"Smart Watch",price:50,image:"https://images.unsplash.com/photo-1519741497674-611481863552"},
{name:"Headphones",price:80,image:"https://images.unsplash.com/photo-1580894908361-967195033215"},
{name:"Sneakers",price:120,image:"https://images.unsplash.com/photo-1528701800489-20be3c69a1b1"},
{name:"Backpack",price:40,image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const cartBox = document.getElementById("cartBox");
const cartBtn = document.querySelector(".cart-btn");
const total = document.getElementById("total");
const count = document.getElementById("count");
const cartItems = document.getElementById("cartItems");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const darkBtn = document.getElementById("darkBtn");
const checkout = document.getElementById("checkout");

function displayProducts(list){
productsContainer.innerHTML="";
list.forEach((product,index)=>{
productsContainer.innerHTML+=`
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>$${product.price}</p>
<button onclick="addToCart(${index})">Add</button>
</div>
`;
});
}

function addToCart(index){
cart.push(products[index]);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function updateCart(){
cartItems.innerHTML="";
let sum=0;

cart.forEach((item,i)=>{
sum+=item.price;
cartItems.innerHTML+=`
<div class="cart-item">
<span>${item.name}</span>
<span>$${item.price}</span>
<span class="remove" onclick="removeItem(${i})">❌</span>
</div>
`;
});

total.textContent=sum;
count.textContent=cart.length;
}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

cartBtn.onclick=()=>cartBox.classList.toggle("active");
darkBtn.onclick=()=>document.body.classList.toggle("dark");

search.onkeyup=filterProducts;
filter.onchange=filterProducts;

function filterProducts(){
let text=search.value.toLowerCase();
let price=filter.value;

let filtered=products.filter(p=>{
let matchName=p.name.toLowerCase().includes(text);
let matchPrice=(price==="all")||(p.price<=price);
return matchName && matchPrice;
});

displayProducts(filtered);
}

checkout.onclick=()=>{
alert("تم الطلب بنجاح ✅");
cart=[];
localStorage.removeItem("cart");
updateCart();
};

displayProducts(products);
updateCart();