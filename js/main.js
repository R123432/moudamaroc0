/* ===== المنتجات ===== */

let products = [
{
id:1,
name:"Nike Shoes",
price:299,
stock:10,
image:"https://via.placeholder.com/250"
},
{
id:2,
name:"Adidas Shirt",
price:199,
stock:15,
image:"https://via.placeholder.com/250"
}
];

/* ===== السلة ===== */

let cart = [];

function addToCart(id){

const product = products.find(p=>p.id===id);
if(!product) return;

if(product.stock<=0){
alert("المنتج غير متوفر ❌");
return;
}

let existing = cart.find(item=>item.id===id);

if(existing){
if(existing.quantity>=product.stock){
alert("وصلت للحد الأقصى ⚠️");
return;
}
existing.quantity++;
}else{
cart.push({
id:product.id,
name:product.name,
price:product.price,
quantity:1
});
}

renderCart();
updateCartCount();
}

/* ===== عرض المنتجات ===== */

function displayProducts(){

const container=document.getElementById("products");
container.innerHTML="";

products.forEach(product=>{
container.innerHTML+=`
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>${product.price} DH</p>
<button class="btn" onclick="addToCart(${product.id})">
أضف للسلة
</button>
</div>
`;
});
}

/* ===== عرض السلة ===== */

function renderCart(){

const container=document.getElementById("cartItems");
container.innerHTML="";
let total=0;

cart.forEach((item,index)=>{
let itemTotal=item.price*item.quantity;
total+=itemTotal;

container.innerHTML+=`
<div>
${item.name} × ${item.quantity} = ${itemTotal} DH
<button onclick="changeQty(${index},-1)">➖</button>
<button onclick="changeQty(${index},1)">➕</button>
<button onclick="removeItem(${index})">حذف</button>
<hr>
</div>
`;
});

document.getElementById("cartTotal").innerText=total;
}

/* ===== تحديث العدد ===== */

function updateCartCount(){
let totalQty=cart.reduce((sum,item)=>sum+item.quantity,0);
document.getElementById("cartCount").innerText=totalQty;
}

/* ===== تغيير الكمية ===== */

function changeQty(index,amount){

cart[index].quantity+=amount;

if(cart[index].quantity<=0){
cart.splice(index,1);
}

renderCart();
updateCartCount();
}

/* ===== حذف ===== */

function removeItem(index){
cart.splice(index,1);
renderCart();
updateCartCount();
}

/* ===== تشغيل ===== */

document.addEventListener("DOMContentLoaded",()=>{
displayProducts();
});