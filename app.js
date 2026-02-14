const ADMIN_PASS="2025";
const WHATSAPP="212712120673";

let products=JSON.parse(localStorage.getItem("products"))||[];
let cart=[];
let editId=null;
let discount=localStorage.getItem("discount")||0;

document.getElementById("discountInput").value=discount;

function openAdmin(){
document.getElementById("adminPanel").style.display="flex";
}

function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

function loginAdmin(){
let pass=document.getElementById("adminPass").value;
if(pass===ADMIN_PASS){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
}else{
document.getElementById("adminError").style.display="block";
}
}

function saveProduct(){
let product={
id:editId||Date.now(),
name:pname.value,
price:Number(pprice.value),
colors:pcolors.value.split(","),
sizes:psizes.value.split(","),
images:pimages.value.split(",")
};

if(editId){
products=products.map(p=>p.id===editId?product:p);
editId=null;
}else{
products.push(product);
}

localStorage.setItem("products",JSON.stringify(products));
clearForm();
loadProducts();
loadAdminProducts();
}

function loadProducts(){
let container=document.getElementById("products");
container.innerHTML="";

products.forEach(p=>{
let finalPrice=p.price-(p.price*discount/100);

container.innerHTML+=`
<div class="product">
<img src="${p.images[0]}">
<h4>${p.name}</h4>
<p><del>${p.price}</del> ${finalPrice} DH</p>
<p>الألوان: ${p.colors.join(", ")}</p>
<p>المقاسات: ${p.sizes.join(", ")}</p>
<button onclick="addToCart(${finalPrice},'${p.name}')">
إضافة للسلة
</button>
</div>`;
});
}

function loadAdminProducts(){
let box=document.getElementById("adminProducts");
box.innerHTML="";
products.forEach(p=>{
box.innerHTML+=`
<div class="admin-item">
${p.name}
<button onclick="editProduct(${p.id})">تعديل</button>
<button onclick="deleteProduct(${p.id})">حذف</button>
</div>`;
});
}

function editProduct(id){
let p=products.find(x=>x.id===id);
pname.value=p.name;
pprice.value=p.price;
pcolors.value=p.colors.join(",");
psizes.value=p.sizes.join(",");
pimages.value=p.images.join(",");
editId=id;
}

function deleteProduct(id){
products=products.filter(p=>p.id!==id);
localStorage.setItem("products",JSON.stringify(products));
loadProducts();
loadAdminProducts();
}

function clearForm(){
pname.value="";
pprice.value="";
pcolors.value="";
psizes.value="";
pimages.value="";
}

function addToCart(price,name){
cart.push({price,name});
updateCart();
}

function updateCart(){
document.getElementById("cartCount").innerText=cart.length;
let total=0;
let items="";
cart.forEach(p=>{
total+=p.price;
items+=`<p>${p.name}</p>`;
});
document.getElementById("cartItems").innerHTML=items;
document.getElementById("totalPrice").innerText=total;
}

function sendOrder(){
let total=cart.reduce((a,b)=>a+b.price,0);
let msg="طلب جديد:%0A";
cart.forEach(p=>msg+=p.name+"%0A");
msg+="المجموع: "+total+" DH";
window.open("https://wa.me/"+WHATSAPP+"?text="+msg);
}

function saveDiscount(){
discount=document.getElementById("discountInput").value;
localStorage.setItem("discount",discount);
loadProducts();
}

loadProducts();