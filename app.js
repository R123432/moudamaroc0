let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];
let editingId = null;

/* عرض المنتجات حسب القسم */
function showCategory(cat){
const container = document.getElementById("products");
container.innerHTML="";

products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">
${p.old ? `<span style="text-decoration:line-through;color:gray">${p.old} DH</span><br>` : ""}
${p.price} DH
</div>
<button onclick="addToCart(${p.id})">أضف للسلة</button>
</div>`;
});
}

/* إضافة أو تعديل منتج */
function addProduct(){

const file = document.getElementById("pimage").files[0];
const name = document.getElementById("pname").value;
const price = document.getElementById("pprice").value;
const old = document.getElementById("pold").value;
const cat = document.getElementById("pcat").value;

if(!name || !price){
alert("⚠️ دخل الاسم والسعر");
return;
}

if(file){
const reader = new FileReader();
reader.onload=function(){

if(editingId){
let product = products.find(p=>p.id===editingId);
product.name=name;
product.price=price;
product.old=old;
product.cat=cat;
product.image=reader.result;
editingId=null;
alert("✅ تم التعديل");
}else{
products.push({
id:Date.now(),
name,
price,
old,
cat,
image:reader.result
});
alert("✅ تمت الإضافة");
}

saveProducts();
loadAdminProducts();
}
reader.readAsDataURL(file);
}else{
alert("⚠️ اختر صورة");
}
}

/* حفظ المنتجات */
function saveProducts(){
localStorage.setItem("products", JSON.stringify(products));
}

/* عرض منتجات داخل الإدارة */
function loadAdminProducts(){
let container = document.getElementById("adminProducts");
if(!container) return;

container.innerHTML="";

products.forEach(p=>{
container.innerHTML+=`
<div style="border:1px solid #ddd;padding:10px;margin-bottom:10px">
<img src="${p.image}" width="60"><br>
${p.name} - ${p.price} DH
<br>
<button onclick="editProduct(${p.id})">تعديل</button>
<button onclick="deleteProduct(${p.id})">حذف</button>
</div>`;
});
}

/* حذف */
function deleteProduct(id){
products = products.filter(p=>p.id!==id);
saveProducts();
loadAdminProducts();
alert("🗑 تم الحذف");
}

/* تعديل */
function editProduct(id){
let p = products.find(p=>p.id===id);
document.getElementById("pname").value=p.name;
document.getElementById("pprice").value=p.price;
document.getElementById("pold").value=p.old;
document.getElementById("pcat").value=p.cat;
editingId=id;
window.scrollTo(0,0);
}

/* سلة */
function addToCart(id){
cart.push(products.find(p=>p.id===id));
alert("تمت الإضافة للسلة");
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

/* إدارة */
function openAdmin(){
document.getElementById("adminPanel").classList.toggle("active");
}

function loginAdmin(){
const code = document.getElementById("adminCode").value;

if(code==="2025"){
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
loadStats();
}else{
alert("❌ كود خاطئ");
}
}

/* إحصائيات */
function loadStats(){
let orders = JSON.parse(localStorage.getItem("orders")) || [];
alert("📊 عدد المنتجات: "+products.length+"\n📦 عدد الطلبات: "+orders.length);
}

/* طلب واتساب */
function sendOrder(){

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let order = {
date:new Date().toLocaleString(),
items:cart
};

orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

let message="طلب جديد:%0A";

cart.forEach(p=>{
message+=p.name+" - "+p.price+" DH%0A";
});

window.open("https://wa.me/212712120673?text="+message);

cart=[];
alert("✅ تم إرسال الطلب");
}