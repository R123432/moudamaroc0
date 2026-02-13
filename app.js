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