let products = [];
let cart = [];

function showCategory(cat){
const container = document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">${p.price} DH</div>
<button onclick="addToCart(${p.id})">أضف للسلة</button>
</div>`;
});
}

function addProduct(){
const file = document.getElementById("pimage").files[0];
const reader = new FileReader();
reader.onload=function(){
products.push({
id:Date.now(),
name:pname.value,
price:pprice.value,
old:pold.value,
cat:pcat.value,
image:reader.result
});
alert("تمت الإضافة");
}
reader.readAsDataURL(file);
}

function addToCart(id){
cart.push(products.find(p=>p.id===id));
alert("تمت الإضافة للسلة");
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

function openAdmin(){
document.getElementById("adminPanel").classList.toggle("active");
}

function loginAdmin(){
if(adminCode.value=="2025"){
adminContent.style.display="block";
}else{
alert("كود خاطئ");
}
}

function sendOrder(){
let message="طلب جديد:%0A";
cart.forEach(p=>{
message+=p.name+" - "+p.price+" DH%0A";
});
message+="%0Aالاسم: "+name.value;
window.open("https://wa.me/212712120673?text="+message);
}

setInterval(()=>{
let d=new Date();
document.getElementById("countdown").innerHTML=
"الوقت الآن: "+d.toLocaleTimeString();
},1000);
function loginAdmin(){
const code = document.getElementById("adminCode").value;

if(code === "2025"){
document.getElementById("adminContent").style.display="block";
loadStats();
}else{
alert("❌ كود خاطئ");
}
}

function loadStats(){
let totalProducts = products.length;
let totalOrders = JSON.parse(localStorage.getItem("orders")) || [];

alert(
"📊 الإحصائيات:\n\n" +
"عدد المنتجات: " + totalProducts + "\n" +
"عدد الطلبات: " + totalOrders.length
);
}
function sendOrder(){

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let order = {
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
city: document.getElementById("city").value,
date: new Date().toLocaleString(),
items: cart
};

orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

let message="طلب جديد:%0A";

cart.forEach(p=>{
message+=p.name+" - "+p.price+" DH%0A";
});

message+="%0Aالاسم: "+order.name;
message+="%0Aالهاتف: "+order.phone;
message+="%0Aالمدينة: "+order.city;

window.open("https://wa.me/212712120673?text="+message);

cart=[];
alert("✅ تم تسجيل الطلب");
}