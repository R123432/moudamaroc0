let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let coupons = JSON.parse(localStorage.getItem("coupons")) || {};
let discount = 0;

/* حفظ الوضع الليلي */
if(localStorage.getItem("darkMode")==="on"){
document.body.classList.add("dark");
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
localStorage.setItem("darkMode",
document.body.classList.contains("dark")?"on":"off");
}

/* عرض المنتجات */
function showCategory(cat){
const container=document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product-card" onclick="openProduct(${p.id})">
<img src="${p.images[0]}">
<h3>${p.name}</h3>
<p>${p.price} DH</p>
<small>المبيعات: ${p.sales||0}</small>
</div>`;
});
}

/* حفظ منتج */
function saveProduct(){
let id=document.getElementById("editId").value;
let name=document.getElementById("pname").value;
let price=document.getElementById("pprice").value;
let cat=document.getElementById("pcat").value;
let colors=document.getElementById("pcolors").value.split(",");
let sizes=document.getElementById("psizes").value.split(",");
let files=document.getElementById("pimage").files;

let images=[];
if(files.length>0){
let reader=new FileReader();
reader.onload=function(e){
images.push(e.target.result);
finishSave();
}
reader.readAsDataURL(files[0]);
}else{
finishSave();
}

function finishSave(){
if(id){
let p=products.find(x=>x.id==id);
p.name=name;
p.price=price;
}else{
products.push({
id:Date.now(),
name,price,cat,
images,
colors,
sizes,
sales:0
});
}
localStorage.setItem("products",JSON.stringify(products));
loadAdminProducts();
}
}

/* كوبونات */
function addCoupon(){
let code=document.getElementById("newCoupon").value;
let percent=document.getElementById("newDiscount").value;
coupons[code]=percent/100;
localStorage.setItem("coupons",JSON.stringify(coupons));
alert("تم إضافة الكوبون");
}

function applyCoupon(){
let code=document.getElementById("couponInput").value;
if(coupons[code]){
discount=coupons[code];
alert("تم تطبيق الخصم");
}else{
discount=0;
alert("كود غير صحيح");
}
renderCart();
}

/* بقية النظام نفس السابق مع احتساب المبيعات */
function sendOrder(){
if(cart.length===0){alert("السلة فارغة");return;}

let name=document.getElementById("customerName").value;
let phone=document.getElementById("customerPhone").value;
let address=document.getElementById("customerAddress").value;

let total=0;
let message="طلب جديد:%0A";
message+=`الاسم: ${name}%0Aالهاتف: ${phone}%0Aالعنوان: ${address}%0A%0A`;

cart.forEach(item=>{
total+=item.price*item.quantity;
message+=`${item.name} ×${item.quantity}%0A`;
let p=products.find(x=>x.id===item.id);
p.sales=(p.sales||0)+item.quantity;
});

total=total-(total*discount);
message+=`%0Aالمجموع: ${total} DH`;

localStorage.setItem("products",JSON.stringify(products));
window.open(`https://wa.me/212712120673?text=${message}`);
cart=[];
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

/* الباقي كما سبق */
function updateCart(){
document.getElementById("cartCount").innerText=cart.length;
}

updateCart();