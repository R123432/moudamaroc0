const ADMIN_PASS="1995";
const WHATSAPP="212712120673";

let products=JSON.parse(localStorage.getItem("products"))||[];
let cart=[];
let editId=null;
let discount=localStorage.getItem("discount")||0;

document.getElementById("discountInput").value=discount;

// منتجات افتراضية إذا فارغ
if(products.length===0){
products=[
{
id:1,
name:"قميص رجالي فاخر",
desc:"قميص أنيق بجودة عالية",
price:250,
stock:10,
rating:4.8,
colors:["أسود","أبيض"],
sizes:["S","M","L"],
image:"https://via.placeholder.com/400x400"
}
];
localStorage.setItem("products",JSON.stringify(products));
}

function loadProducts(){
let container=document.getElementById("products");
container.innerHTML="";
products.forEach(p=>{
let final=p.price-(p.price*discount/100);
container.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h4>${p.name}</h4>
<p><del>${p.price}</del> ${final} DH</p>
<p>⭐ ${p.rating}</p>
<button onclick="addToCart(${p.id})">إضافة للسلة</button>
</div>`;
});
}
loadProducts();

function addToCart(id){
let p=products.find(x=>x.id===id);
let final=p.price-(p.price*discount/100);
cart.push({name:p.name,price:final});
updateCart();
}

function updateCart(){
let items="";
let total=0;
cart.forEach(i=>{
items+=`<p>${i.name}</p>`;
total+=i.price;
});
document.getElementById("cartItems").innerHTML=items;
document.getElementById("totalPrice").innerText=total;
document.getElementById("cartCount").innerText=cart.length;
}

function toggleCart(){document.getElementById("cartModal").style.display="flex";}
function closeCart(){document.getElementById("cartModal").style.display="none";}
function openOrder(){document.getElementById("orderModal").style.display="flex";}
function closeOrder(){document.getElementById("orderModal").style.display="none";}

function sendOrder(){
let total=cart.reduce((a,b)=>a+b.price,0);
let msg=`طلب جديد:%0Aالاسم: ${clientName.value}%0Aالهاتف: ${clientPhone.value}%0Aالمدينة: ${clientCity.value}%0Aالعنوان: ${clientAddress.value}%0A%0A`;
cart.forEach(i=>msg+=i.name+"%0A");
msg+=`%0Aالمجموع: ${total} DH`;
window.open(`https://wa.me/${WHATSAPP}?text=${msg}`);
}

function openAdmin(){document.getElementById("adminModal").style.display="flex";}
function closeAdmin(){document.getElementById("adminModal").style.display="none";}

function loginAdmin(){
if(adminPass.value===ADMIN_PASS){
loginBox.style.display="none";
adminPanel.style.display="block";
loadAdminProducts();
}else document.getElementById("adminError").style.display="block";
}

function saveProduct(){
let product={
id:editId||Date.now(),
name:pname.value,
desc:pdesc.value,
price:Number(pprice.value),
stock:Number(pstock.value),
rating:prating.value,
colors:pcolors.value.split(","),
sizes:psizes.value.split(","),
image:pimage.value
};

if(editId){
products=products.map(p=>p.id===editId?product:p);
editId=null;
}else products.push(product);

localStorage.setItem("products",JSON.stringify(products));
loadProducts();
loadAdminProducts();
}

function loadAdminProducts(){
let box=document.getElementById("adminProducts");
box.innerHTML="";
products.forEach(p=>{
box.innerHTML+=`
<p>${p.name}
<button onclick="editProduct(${p.id})">تعديل</button>
<button onclick="deleteProduct(${p.id})">حذف</button>
</p>`;
});
}

function editProduct(id){
let p=products.find(x=>x.id===id);
pname.value=p.name;
pdesc.value=p.desc;
pprice.value=p.price;
pstock.value=p.stock;
prating.value=p.rating;
pcolors.value=p.colors.join(",");
psizes.value=p.sizes.join(",");
pimage.value=p.image;
editId=id;
}

function deleteProduct(id){
products=products.filter(p=>p.id!==id);
localStorage.setItem("products",JSON.stringify(products));
loadProducts();
loadAdminProducts();
}

function saveDiscount(){
discount=discountInput.value;
localStorage.setItem("discount",discount);
loadProducts();
}