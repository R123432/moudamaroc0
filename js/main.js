/* =========================
   تحميل المنتجات
========================= */

let products = JSON.parse(localStorage.getItem("products"));

if(!products || products.length === 0){

products = [
{
id:1,
name:"Nike Shoes",
price:299,
stock:10,
image:"https://via.placeholder.com/250"
},
{
id:2,
name:"Adidas Shirt",
price:199,
stock:15,
image:"https://via.placeholder.com/250"
}
];

localStorage.setItem("products", JSON.stringify(products));
}

/* =========================
   السلة
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   عرض المنتجات
========================= */

function displayProducts(){

const container = document.getElementById("products");
if(!container) return;

container.innerHTML = "";

products.forEach(product=>{

container.innerHTML += `
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>${product.price} DH</p>
<button class="btn" onclick="addToCart(${product.id})">
أضف للسلة
</button>
</div>
`;

});
}

/* =========================
   إضافة للسلة
========================= */

function addToCart(id){

const product = products.find(p=>p.id===id);
if(!product) return;

if(product.stock <= 0){
alert("المنتج غير متوفر ❌");
return;
}

let existing = cart.find(item=>item.id===id);

if(existing){

if(existing.quantity >= product.stock){
alert("وصلت للحد الأقصى من المخزون ⚠️");
return;
}

existing.quantity++;

}else{

cart.push({
id:product.id,
name:product.name,
price:product.price,
quantity:1
});
}

saveCart();
updateCartCount();
renderCart();

alert("تمت الإضافة ✅");
}

/* =========================
   تحديث عدد السلة
========================= */

function updateCartCount(){

const count = document.getElementById("cartCount");
if(!count) return;

let totalQty = cart.reduce((sum,item)=>sum+item.quantity,0);
count.innerText = totalQty;
}

/* =========================
   عرض السلة
========================= */

function renderCart(){

const container = document.getElementById("cartItems");
if(!container) return;

container.innerHTML="";
let total=0;

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
<hr>
</div>
`;

});

const totalElement = document.getElementById("cartTotal");
if(totalElement){
totalElement.innerText = total;
}
}

/* =========================
   تغيير الكمية
========================= */

function changeQty(index,amount){

let product = products.find(p=>p.id===cart[index].id);
if(!product) return;

if(amount===1 && cart[index].quantity >= product.stock){
alert("لا يمكنك تجاوز المخزون ⚠️");
return;
}

cart[index].quantity += amount;

if(cart[index].quantity<=0){
cart.splice(index,1);
}

saveCart();
renderCart();
updateCartCount();
}

/* =========================
   حذف عنصر
========================= */

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartCount();
}

/* =========================
   طلب عبر واتساب
========================= */

function orderWhatsApp(){

if(cart.length===0){
alert("السلة فارغة ❌");
return;
}

let phone="212712120673";
let message="🛍️ طلب جديد:%0A%0A";
let total=0;

cart.forEach(item=>{

let itemTotal=item.price*item.quantity;
total+=itemTotal;

message+=`📦 ${item.name}%0A`;
message+=`العدد: ${item.quantity}%0A`;
message+=`المجموع: ${itemTotal} DH%0A%0A`;
});

message+=`💰 المجموع الكلي: ${total} DH`;

let url=`https://wa.me/${phone}?text=${message}`;
window.open(url,"_blank");

cart=[];
saveCart();
renderCart();
updateCartCount();
}

/* =========================
   تشغيل الصفحة
========================= */

document.addEventListener("DOMContentLoaded",function(){
displayProducts();
renderCart();
updateCartCount();
});