let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){

let products = JSON.parse(localStorage.getItem("products")) || [];
id = Number(id);

const product = products.find(p => Number(p.id) === id);

if(!product){
alert("المنتج غير موجود ❌");
return;
}

// نشوف واش موجود فالسلة
let existing = cart.find(item => item.id === id);

if(existing){
existing.quantity += 1;
}else{
cart.push({
id: product.id,
name: product.name,
price: Number(product.price),
quantity: 1
});
}

saveCart();
updateCartCount();
renderCart();

alert("تمت إضافة المنتج للسلة ✅");
}

function updateCartCount(){
const count = document.getElementById("cartCount");
if(count){
let totalQty = cart.reduce((sum,item)=> sum + item.quantity,0);
count.innerText = totalQty;
}
}

function renderCart(){

cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartItems");
if(!container) return;

container.innerHTML = "";
let total = 0;

cart.forEach((item,index)=>{

let itemTotal = item.price * item.quantity;
total += itemTotal;

container.innerHTML += `
<div class="cart-item">
<strong>${item.name}</strong><br>
${item.price} DH × ${item.quantity} = ${itemTotal} DH
<br>
<button onclick="changeQty(${index},-1)">➖</button>
<button onclick="changeQty(${index},1)">➕</button>
<button onclick="removeItem(${index})">حذف</button>
</div>
<hr>
`;
});

const totalElement = document.getElementById("cartTotal");
if(totalElement){
totalElement.innerText = total;
}
}

function changeQty(index,amount){
cart[index].quantity += amount;

if(cart[index].quantity <= 0){
cart.splice(index,1);
}

saveCart();
renderCart();
updateCartCount();
}

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartCount();
}

document.addEventListener("DOMContentLoaded", function(){
updateCartCount();
renderCart();
});