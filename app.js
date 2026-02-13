let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let editingId = null;

/* عرض حسب القسم */
function showCategory(cat){
let container=document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.cat===cat).forEach(p=>{
container.innerHTML+=`
<div class="product">
${p.old ? `<div class="badge">-${Math.round((1-p.price/p.old)*100)}%</div>`:""}
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">
${p.old?`<span style="text-decoration:line-through;color:gray">${p.old} DH</span><br>`:""}
${p.price} DH
</div>
<button onclick="addToCart(${p.id})">أضف للسلة</button>
</div>`;
});
}

/* حفظ */
function saveProducts(){localStorage.setItem("products",JSON.stringify(products))}
function saveCart(){localStorage.setItem("cart",JSON.stringify(cart))}

/* إضافة منتج */
function addProduct(){
let file=document.getElementById("pimage").files[0];
let name=document.getElementById("pname").value;
let price=document.getElementById("pprice").value;
let old=document.getElementById("pold").value;
let cat=document.getElementById("pcat").value;

if(!name||!price){alert("دخل الاسم والسعر");return}

let reader=new FileReader();
reader.onload=function(){
if(editingId){
let p=products.find(x=>x.id===editingId);
Object.assign(p,{name,price,old,cat,image:reader.result});
editingId=null;
}else{
products.push({id:Date.now(),name,price,old,cat,image:reader.result});
}
saveProducts();
loadAdminProducts();
}
reader.readAsDataURL(file);
}

/* سلة */
function addToCart(id){
let p=products.find(x=>x.id===id);
let existing=cart.find(x=>x.id===id);
if(existing){existing.qty++}
else{cart.push({...p,qty:1})}
saveCart();
renderCart();
updateCartCount();
}

function renderCart(){
let container=document.getElementById("cartItems");
container.innerHTML="";
let total=0;
cart.forEach((p,i)=>{
total+=p.price*p.qty;
container.innerHTML+=`
<div>
${p.name} x ${p.qty}
<br>
${p.price*p.qty} DH
<br>
<button onclick="changeQty(${i},1)">+</button>
<button onclick="changeQty(${i},-1)">-</button>
<button onclick="removeItem(${i})">❌</button>
<hr>
</div>`;
});
container.innerHTML+=`<h3>المجموع: ${total} DH</h3>`;
}

function changeQty(i,a){
cart[i].qty+=a;
if(cart[i].qty<=0)cart.splice(i,1);
saveCart();
renderCart();
updateCartCount();
}

function removeItem(i){
cart.splice(i,1);
saveCart();
renderCart();
updateCartCount();
}

function updateCartCount(){
document.getElementById("cartCount").innerText=
cart.reduce((sum,p)=>sum+p.qty,0);
}

function toggleCart(){document.getElementById("cart").classList.toggle("active")}

/* واتساب */
function sendOrder(){
if(cart.length==0){alert("السلة فارغة");return}
let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;
let msg="طلب جديد:%0A";
let total=0;
cart.forEach(p=>{
total+=p.price*p.qty;
msg+=`${p.name} x ${p.qty} - ${p.price*p.qty} DH%0A`;
});
msg+=`المجموع: ${total} DH`;
window.open("https://wa.me/212712120673?text="+msg);
cart=[];saveCart();renderCart();updateCartCount();
}

/* إدارة */
function openAdmin(){document.getElementById("adminPanel").classList.toggle("active")}
function loginAdmin(){
if(document.getElementById("adminCode").value==="2025"){
document.getElementById("adminContent").style.display="block";
loadAdminProducts();
}
}

/* بحث */
function searchProduct(){
let v=document.getElementById("searchInput").value.toLowerCase();
let container=document.getElementById("products");
container.innerHTML="";
products.filter(p=>p.name.toLowerCase().includes(v)).forEach(p=>{
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<div class="price">${p.price} DH</div>
<button onclick="addToCart(${p.id})">أضف للسلة</button>
</div>`;
});
}

/* Dark */
function toggleDark(){
document.body.classList.toggle("dark");
localStorage.setItem("dark",document.body.classList.contains("dark"));
}
if(localStorage.getItem("dark")==="true"){document.body.classList.add("dark")}

/* عداد */
function startCountdown(){
let end=new Date();end.setHours(23,59,59);
setInterval(()=>{
let diff=end-new Date();
if(diff<=0)return;
let h=Math.floor(diff/1000/60/60);
let m=Math.floor(diff/1000/60)%60;
let s=Math.floor(diff/1000)%60;
document.getElementById("countdown").innerHTML=`⏳ ${h}:${m}:${s}`;
},1000);
}
startCountdown();
updateCartCount();
renderCart();