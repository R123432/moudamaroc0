let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let editingId = null;

/* ================== عرض المنتجات ================== */
function showCategory(cat){
const container = document.getElementById("products");
container.innerHTML="";

products.filter(p=>p.cat===cat).forEach(p=>{

container.innerHTML+=`
<div class="product">

${p.old ? `<div class="badge">-${Math.round((1 - p.price/p.old)*100)}%</div>` : ""}

<img src="${p.image}">
<h3>${p.name}</h3>

<div class="price">
${p.old ? `<span style="text-decoration:line-through;color:gray">${p.old} DH</span><br>` : ""}
${p.price} DH
</div>

<button onclick="addToCart(${p.id})">أضف للسلة</button>

</div>
`;
});
}

/* ================== إضافة منتج ================== */
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
Object.assign(product,{name,price,old,cat,image:reader.result});
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

function saveProducts(){
localStorage.setItem("products", JSON.stringify(products));
}

/* ================== إدارة ================== */
function loadAdminProducts(){
let container=document.getElementById("adminProducts");
if(!container) return;

container.innerHTML="";

products.forEach(p=>{
container.innerHTML+=`
<div style="border:1px solid #ddd;padding:10px;margin-bottom:10px;border-radius:8px">
<img src="${p.image}" width="60"><br>
${p.name} - ${p.price} DH
<br><br>
<button onclick="editProduct(${p.id})">تعديل</button>
<button onclick="deleteProduct(${p.id})">حذف</button>
</div>`;
});
}

function deleteProduct(id){
products=products.filter(p=>p.id!==id);
saveProducts();
loadAdminProducts();
}

function editProduct(id){
let p=products.find(p=>p.id===id);
document.getElementById("pname").value=p.name;
document.getElementById("pprice").value=p.price;
document.getElementById("pold").value=p.old;
document.getElementById("pcat").value=p.cat;
editingId=id;
window.scrollTo(0,0);
}

function openAdmin(){
document.getElementById("adminPanel").classList.toggle("active");
}

function loginAdmin(){
if(document.getElementById("adminCode").value==="2025"){
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
loadStats();
}else{
alert("❌ كود خاطئ");
}
}

/* ================== سلة احترافية ================== */
function addToCart(id){

let product=products.find(p=>p.id===id);

let existing=cart.find(item=>item.id===id);

if(existing){
existing.qty++;
}else{
cart.push({...product, qty:1});
}

saveCart();
renderCart();
updateCartCount();
}

function renderCart(){

let container=document.getElementById("cartItems");
if(!container) return;

container.innerHTML="";
let total=0;

cart.forEach((p,index)=>{
total += p.price * p.qty;

container.innerHTML+=`
<div style="margin-bottom:10px;border-bottom:1px solid #ddd;padding-bottom:5px">
<b>${p.name}</b><br>
${p.price} DH × ${p.qty}
<br>
<button onclick="changeQty(${index},1)">+</button>
<button onclick="changeQty(${index},-1)">-</button>
<button onclick="removeItem(${index})">❌</button>
</div>`;
});

container.innerHTML+=`<h3>المجموع: ${total} DH</h3>`;
}

function changeQty(index,amount){
cart[index].qty += amount;
if(cart[index].qty <=0) cart.splice(index,1);
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

function updateCartCount(){
document.getElementById("cartCount").innerText =
cart.reduce((sum,p)=>sum+p.qty,0);
}

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function toggleCart(){
document.getElementById("cart").classList.toggle("active");
renderCart();
}

/* ================== الطلب ================== */
function sendOrder(){

if(cart.length===0){
alert("⚠️ السلة فارغة");
return;
}

let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;

if(!name || !phone){
alert("⚠️ دخل الاسم والهاتف");
return;
}

let message="طلب جديد:%0A";
let total=0;

cart.forEach(p=>{
total += p.price*p.qty;
message+=`${p.name} × ${p.qty} - ${p.price*p.qty} DH%0A`;
});

message+=`%0Aالمجموع: ${total} DH`;

window.open("https://wa.me/212712120673?text="+message);

cart=[];
saveCart();
renderCart();
updateCartCount();
}

/* ================== بحث ================== */
function searchProduct(){
let value=document.getElementById("searchInput").value.toLowerCase();
let container=document.getElementById("products");
container.innerHTML="";

products
.filter(p=>p.name.toLowerCase().includes(value))
.forEach(p=>{
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">${p.price} DH</div>
<button onclick="addToCart(${p.id})">أضف للسلة</button>
</div>`;
});
}

/* ================== إحصائيات ================== */
function loadStats(){
let orders=JSON.parse(localStorage.getItem("orders")) || [];
document.getElementById("stats").innerHTML=
"📦 عدد المنتجات: "+products.length+"<br>🧾 عدد الطلبات: "+orders.length;
}

/* ================== Dark Mode محفوظ ================== */
function toggleDark(){
document.body.classList.toggle("dark");
localStorage.setItem("darkMode",document.body.classList.contains("dark"));
}

if(localStorage.getItem("darkMode")==="true"){
document.body.classList.add("dark");
}

/* ================== عداد تنازلي ================== */
function startCountdown(){
let end=new Date();
end.setHours(23,59,59);

setInterval(()=>{
let now=new Date();
let diff=end-now;

if(diff<=0) return;

let h=Math.floor(diff/1000/60/60);
let m=Math.floor(diff/1000/60)%60;
let s=Math.floor(diff/1000)%60;

document.getElementById("countdown").innerHTML=
`⏳ ${h}:${m}:${s}`;
},1000);
}

startCountdown();
updateCartCount();
renderCart();