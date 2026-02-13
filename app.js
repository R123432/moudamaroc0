let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];
const ADMIN_PASS = "2025";

function openAdmin(){
document.getElementById("adminPanel").style.display="flex";
document.getElementById("adminError").style.display="none";
}

function closeAdmin(){
document.getElementById("adminPanel").style.display="none";
}

function loginAdmin(){
let pass=document.getElementById("adminPass").value;
document.getElementById("adminError").style.display="none";

if(pass===ADMIN_PASS){
document.getElementById("loginBox").style.display="none";
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
}else{
document.getElementById("adminError").style.display="block";
}
}

function addProduct(){
let product={
id:Date.now(),
name:pname.value,
price:Number(pprice.value),
stock:Number(pstock.value),
rating:Number(prating.value),
image:pimage.value,
cat:pcat.value
};

products.push(product);
localStorage.setItem("products",JSON.stringify(products));
loadAdminProducts();
alert("تمت الإضافة");
}

function loadAdminProducts(){
let container=document.getElementById("adminProducts");
container.innerHTML="";
products.forEach(p=>{
container.innerHTML+=`
<div>
${p.name} - ${p.price} DH
<button onclick="deleteProduct(${p.id})" class="btn-main">حذف</button>
</div>`;
});
}

function deleteProduct(id){
products=products.filter(p=>p.id!==id);
localStorage.setItem("products",JSON.stringify(products));
loadAdminProducts();
}

function showCategory(cat){
let container=document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product-card">
<img src="${p.image}" onerror="this.src='https://via.placeholder.com/300x200'">
<h3>${p.name}</h3>
<p>${p.price} DH</p>
<div>⭐ ${p.rating}</div>
<div>المخزون: ${p.stock}</div>
<button onclick="addToCart(${p.id})" class="btn-main">إضافة للسلة</button>
</div>`;
});
}

function addToCart(id){
let product=products.find(p=>p.id===id);
if(!product||product.stock<=0){alert("نفذ المخزون");return;}
product.stock--;
localStorage.setItem("products",JSON.stringify(products));
cart.push(product);
updateCart();
}

function updateCart(){
document.getElementById("cartCount").innerText=cart.length;
let total=0;
let cartItems=document.getElementById("cartItems");
cartItems.innerHTML="";
cart.forEach(p=>{
total+=p.price;
cartItems.innerHTML+=`<p>${p.name}</p>`;
});
document.getElementById("totalPrice").innerText=total;
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
document.getElementById("cartOverlay").classList.toggle("active");
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

function sendOrder(){
let total=cart.reduce((a,b)=>a+b.price,0);
let msg="طلب جديد:%0A";
cart.forEach(p=>{msg+=p.name+"%0A";});
msg+="المجموع: "+total+" DH";
window.open("https://wa.me/212712120673?text="+msg);
}