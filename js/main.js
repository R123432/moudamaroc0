/* ===== تحميل المنتجات ===== */

let products = JSON.parse(localStorage.getItem("products"));

if(!products || products.length===0){

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

/* ===== السلة ===== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;
const PROMO_CODE = "MODA10";

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===== عرض المنتجات ===== */

function displayProducts(){

const container=document.getElementById("products");
container.innerHTML="";

products.forEach(product=>{

container.innerHTML+=`
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>${product.price} DH</p>
<p>المخزون: ${product.stock}</p>
<button class="btn" onclick="addToCart(${product.id})">
أضف للسلة
</button>
</div>
`;
});
}

/* ===== إضافة للسلة ===== */

function addToCart(id){

let product = products.find(p=>p.id===id);
if(!product || product.stock<=0){
alert("المنتج غير متوفر ❌");
return;
}

let existing = cart.find(item=>item.id===id);

if(existing){

if(existing.quantity>=product.stock){
alert("وصلت للحد الأقصى ⚠️");
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
renderCart();
updateCartCount();
}

/* ===== عرض السلة ===== */

function renderCart(){

const container=document.getElementById("cartItems");
container.innerHTML="";
let total=0;

cart.forEach((item,index)=>{

let itemTotal=item.price*item.quantity;
total+=itemTotal;

container.innerHTML+=`
<div>
${item.name} × ${item.quantity} = ${itemTotal} DH
<button onclick="changeQty(${index},-1)">➖</button>
<button onclick="changeQty(${index},1)">➕</button>
<button onclick="removeItem(${index})">حذف</button>
<hr>
</div>
`;
});

let finalTotal = total;

if(discount>0){
finalTotal = total - (total*discount/100);
}

document.getElementById("cartTotal").innerHTML =
`${discount>0?`<del>${total} DH</del> ➜ `:""}${finalTotal.toFixed(2)} DH`;
}

/* ===== تطبيق الكود ===== */

function applyPromo(){

let code=document.getElementById("promoInput").value;

if(code===PROMO_CODE){
discount=10;
alert("تم تطبيق خصم 10% ✅");
}else{
discount=0;
alert("كود غير صحيح ❌");
}

renderCart();
}

/* ===== تحديث العدد ===== */

function updateCartCount(){
let totalQty=cart.reduce((sum,item)=>sum+item.quantity,0);
document.getElementById("cartCount").innerText=totalQty;
}

/* ===== تغيير الكمية ===== */

function changeQty(index,amount){

let product = products.find(p=>p.id===cart[index].id);

if(amount===1 && cart[index].quantity>=product.stock){
alert("لا يمكن تجاوز المخزون ⚠️");
return;
}

cart[index].quantity+=amount;

if(cart[index].quantity<=0){
cart.splice(index,1);
}

saveCart();
renderCart();
updateCartCount();
}

/* ===== حذف ===== */

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartCount();
}

/* ===== فتح وإغلاق السلة ===== */

function toggleCart(){
document.getElementById("sideCart").classList.toggle("active");
}

/* ===== الطلب عبر واتساب ===== */

function orderWhatsApp(){

if(cart.length===0){
alert("السلة فارغة ❌");
return;
}

let phone="212712120673";
let message="🛍️ طلب جديد:%0A%0A";
let total=0;

cart.forEach(item=>{

let product = products.find(p=>p.id===item.id);
if(product) product.stock-=item.quantity;

let itemTotal=item.price*item.quantity;
total+=itemTotal;

message+=`📦 ${item.name}%0A`;
message+=`العدد: ${item.quantity}%0A`;
message+=`المجموع: ${itemTotal} DH%0A%0A`;
});

if(discount>0){
total = total - (total*discount/100);
}

localStorage.setItem("products", JSON.stringify(products));

message+=`💰 المجموع الكلي: ${total.toFixed(2)} DH`;

window.open(`https://wa.me/${phone}?text=${message}`,"_blank");

cart=[];
discount=0;
saveCart();
renderCart();
updateCartCount();
displayProducts();

alert("تم إرسال الطلب ✅");
}

/* ===== تشغيل الصفحة ===== */

document.addEventListener("DOMContentLoaded",()=>{
displayProducts();
renderCart();
updateCartCount();
});