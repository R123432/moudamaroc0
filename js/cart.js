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

if(product.stock <= 0){
alert("هذا المنتج نفذ من المخزون ❌");
return;
}

let existing = cart.find(item => item.id === id);

if(existing){

if(existing.quantity >= product.stock){
alert("وصلت للحد الأقصى من المخزون ⚠️");
return;
}

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

let products = JSON.parse(localStorage.getItem("products")) || [];
let product = products.find(p => p.id === cart[index].id);

if(amount === 1 && cart[index].quantity >= product.stock){
alert("لا يمكنك تجاوز المخزون ⚠️");
return;
}

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

function orderWhatsApp(){

if(cart.length === 0){
alert("السلة فارغة ❌");
return;
}

let products = JSON.parse(localStorage.getItem("products")) || [];

let phone = "212712120673";
let message = "🛍️ طلب جديد:%0A%0A";
let total = 0;

cart.forEach(item=>{

let product = products.find(p => p.id === item.id);

if(product){
product.stock -= item.quantity;
}

let itemTotal = item.price * item.quantity;
total += itemTotal;

message += `📦 ${item.name}%0A`;
message += `العدد: ${item.quantity}%0A`;
message += `المجموع: ${itemTotal} DH%0A%0A`;
});

localStorage.setItem("products", JSON.stringify(products));

message += `💰 المجموع الكلي: ${total} DH%0A%0A`;
message += "الاسم:%0A";
message += "المدينة:%0A";
message += "العنوان:%0A";
message += "رقم الهاتف:%0A";

let url = `https://wa.me/${phone}?text=${message}`;

window.open(url, "_blank");

cart = [];
saveCart();
updateCartCount();
renderCart();

alert("تم إرسال الطلب وتحديث المخزون ✅");
}

document.addEventListener("DOMContentLoaded", function(){
updateCartCount();
renderCart();
});