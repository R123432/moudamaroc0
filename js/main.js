let products = JSON.parse(localStorage.getItem("products"));

if(!products || products.length===0){

products = [
{ id:1, name:"Nike Shoes", price:299, stock:10, image:"https://via.placeholder.com/250" },
{ id:2, name:"Adidas Shirt", price:199, stock:15, image:"https://via.placeholder.com/250" }
];

localStorage.setItem("products", JSON.stringify(products));
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let discount = 0;
const PROMO_CODE = "MODA10";

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function displayProducts(list = products){

const container=document.getElementById("products");
container.innerHTML="";

if(list.length===0){
container.innerHTML="<p style='text-align:center'>لا يوجد منتج ❌</p>";
return;
}

list.forEach(product=>{
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
cart.push({ id:product.id, name:product.name, price:product.price, quantity:1 });
}

saveCart();
renderCart();
updateCartCount();
}

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

let finalTotal = discount>0 ? total - (total*discount/100) : total;

document.getElementById("cartTotal").innerHTML =
`${discount>0?`<del>${total} DH</del> ➜ `:""}${finalTotal.toFixed(2)} DH`;
}

function applyPromo(){
let code=document.getElementById("promoInput").value;
discount = (code===PROMO_CODE)?10:0;
alert(discount? "تم تطبيق الخصم ✅":"كود غير صحيح ❌");
renderCart();
}

function updateCartCount(){
let totalQty=cart.reduce((sum,item)=>sum+item.quantity,0);
document.getElementById("cartCount").innerText=totalQty;
}

function changeQty(index,amount){
let product = products.find(p=>p.id===cart[index].id);
if(amount===1 && cart[index].quantity>=product.stock){
alert("لا يمكن تجاوز المخزون ⚠️");
return;
}
cart[index].quantity+=amount;
if(cart[index].quantity<=0) cart.splice(index,1);
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

function toggleCart(){
document.getElementById("sideCart").classList.toggle("active");
}

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
message+=`📦 ${item.name}%0Aالعدد: ${item.quantity}%0Aالمجموع: ${itemTotal} DH%0A%0A`;
});

if(discount>0) total = total - (total*discount/100);

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

function filterProducts(){

let search=document.getElementById("searchInput").value.toLowerCase();
let priceRange=document.getElementById("priceFilter").value;

let filtered=products.filter(p=>{

let matchName=p.name.toLowerCase().includes(search);
let matchPrice=true;

if(priceRange){
let [min,max]=priceRange.split("-");
matchPrice=p.price>=Number(min)&&p.price<=Number(max);
}

return matchName && matchPrice;
});

displayProducts(filtered);
}

document.addEventListener("DOMContentLoaded",()=>{
displayProducts();
renderCart();
updateCartCount();
});