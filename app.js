let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showCategory(cat){
const container=document.getElementById("products");
container.innerHTML="";

products.filter(p=>p.cat===cat).forEach(p=>{

let colorsHTML=p.colors.map(c=>`<option>${c}</option>`).join("");
let sizesHTML=p.sizes.map(s=>`<option>${s}</option>`).join("");

container.innerHTML+=`
<div class="product-card">
<img src="${p.images[0]}">
<h3>${p.name}</h3>
<p>${p.price} DH</p>

<div class="product-options">
<select id="color-${p.id}">${colorsHTML}</select>
<select id="size-${p.id}">${sizesHTML}</select>
</div>

<button onclick="addToCart(${p.id})" class="btn-main">أضف للسلة</button>
</div>
`;
});
}

function addProduct(){
const files=document.getElementById("pimage").files;
const name=document.getElementById("pname").value;
const price=document.getElementById("pprice").value;
const old=document.getElementById("pold").value;
const cat=document.getElementById("pcat").value;
const colors=document.getElementById("pcolors").value.split(",");
const sizes=document.getElementById("psizes").value.split(",");

if(!name||!price||files.length===0){alert("أكمل المعلومات");return;}

let images=[];
let loaded=0;

for(let i=0;i<files.length;i++){
let reader=new FileReader();
reader.onload=function(e){
images.push(e.target.result);
loaded++;
if(loaded===files.length){
products.push({
id:Date.now(),
name,
price,
old,
cat,
images,
colors,
sizes
});
localStorage.setItem("products",JSON.stringify(products));
alert("تمت الإضافة");
loadAdminProducts();
}
}
reader.readAsDataURL(files[i]);
}
}

function addToCart(id){
let product=products.find(p=>p.id===id);
let color=document.getElementById(`color-${id}`).value;
let size=document.getElementById(`size-${id}`).value;

cart.push({...product,selectedColor:color,selectedSize:size});
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function sendOrder(){
if(cart.length===0){alert("السلة فارغة");return;}

let message="طلب جديد:%0A%0A";
cart.forEach(item=>{
message+=`المنتج: ${item.name}%0A`;
message+=`اللون: ${item.selectedColor}%0A`;
message+=`المقاس: ${item.selectedSize}%0A`;
message+=`السعر: ${item.price} DH%0A`;
message+="--------------------%0A";
});

window.open(`https://wa.me/212712120673?text=${message}`);
}

function loadAdminProducts(){
let container=document.getElementById("adminProducts");
container.innerHTML="";
products.forEach(p=>{
container.innerHTML+=`
<div>
${p.name} - ${p.price} DH
<button onclick="deleteProduct(${p.id})">❌</button>
</div>
`;
});
}

function deleteProduct(id){
products=products.filter(p=>p.id!==id);
localStorage.setItem("products",JSON.stringify(products));
loadAdminProducts();
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
document.getElementById("cartOverlay").classList.toggle("active");
}

function openAdmin(){
document.getElementById("adminPanel").classList.toggle("active");
}

function loginAdmin(){
if(document.getElementById("adminCode").value==="2025"){
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
}else{
alert("كود خاطئ");
}
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

function updateCart(){
document.getElementById("cartCount").innerText=cart.length;
}

updateCart();