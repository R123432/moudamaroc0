let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

const ADMIN_PASS="1234";

const adminPanel=document.getElementById("adminPanel");
const cartPanel=document.getElementById("cart");
const cartOverlay=document.getElementById("cartOverlay");
const cartCount=document.getElementById("cartCount");
const cartItems=document.getElementById("cartItems");
const totalPrice=document.getElementById("totalPrice");

/* ADMIN */
function openAdmin(){adminPanel.style.display="flex";}
function closeAdmin(){adminPanel.style.display="none";}

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

/* ADD PRODUCT */
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
alert("تم إضافة المنتج");
}

/* LOAD ADMIN PRODUCTS */
function loadAdminProducts(){
let container=document.getElementById("adminProducts");
container.innerHTML="";
products.forEach(p=>{
container.innerHTML+=`
<div class="admin-product">
${p.name} - ${p.price} DH
<button onclick="deleteProduct(${p.id})" class="btn-main">حذف</button>
</div>`;
});
}

/* DELETE */
function deleteProduct(id){
products=products.filter(p=>p.id!==id);
localStorage.setItem("products",JSON.stringify(products));
loadAdminProducts();
}

/* SHOW PRODUCTS */
function showCategory(cat){
let container=document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product-card">
<img src="${p.image}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
<h3>${p.name}</h3>
<p>${p.price} DH</p>
<div class="rating">${"⭐".repeat(p.rating)}</div>
<div class="stock">المخزون: ${p.stock}</div>
<button onclick="addToCart(${p.id})" class="btn-main">إضافة للسلة</button>
</div>`;
});
}

/* CART */
function addToCart(id){
let product=products.find(p=>p.id===id);
if(!product||product.stock<=0){alert("نفذ المخزون");return;}
product.stock--;
cart.push(product);
updateCart();
}

function updateCart(){
cartCount.innerText=cart.length;
let total=0;
cartItems.innerHTML="";
cart.forEach(p=>{
total+=p.price;
cartItems.innerHTML+=`<p>${p.name}</p>`;
});
totalPrice.innerText=total;
}

/* TOGGLE CART */
function toggleCart(){
cartPanel.classList.toggle("active");
cartOverlay.classList.toggle("active");
}

/* DARK MODE */
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

/* ORDER */
function sendOrder(){
let total=cart.reduce((a,b)=>a+b.price,0);
let msg="طلب جديد:%0A";
cart.forEach(p=>{msg+=p.name+"%0A";});
msg+="المجموع:"+total+" DH";
window.open("https://wa.me/212712120673?text="+msg);
}