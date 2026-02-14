const ADMIN_PASS="1995";
const WHATSAPP="212712120673";

let products=JSON.parse(localStorage.getItem("products"))||[];
let cart=[];
let editId=null;
let discount=localStorage.getItem("discount")||0;
document.getElementById("discountInput").value=discount;

function openAdmin(){adminModal.style.display="flex"}
function closeAdmin(){adminModal.style.display="none"}
function toggleCart(){cartModal.style.display="flex"}
function openOrder(){orderModal.style.display="flex"}

function loginAdmin(){
if(adminPass.value===ADMIN_PASS){
adminLogin.style.display="none";
adminPanel.style.display="block";
loadAdminProducts();
}else adminError.style.display="block";
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
images:pimages.value.split(",")
};

if(editId){
products=products.map(p=>p.id===editId?product:p);
editId=null;
}else products.push(product);

localStorage.setItem("products",JSON.stringify(products));
loadProducts();
loadAdminProducts();
clearForm();
}

function loadProducts(){
productsContainer=document.getElementById("products");
productsContainer.innerHTML="";

products.forEach(p=>{
let finalPrice=p.price-(p.price*discount/100);

productsContainer.innerHTML+=`
<div class="product" onclick="openProduct(${p.id})">
<img src="${p.images[0]}">
<h4>${p.name}</h4>
<p><del>${p.price}</del> ${finalPrice} DH</p>
<p>⭐ ${p.rating}</p>
</div>`;
});
}

function openProduct(id){
let p=products.find(x=>x.id===id);
let finalPrice=p.price-(p.price*discount/100);

productDetails.innerHTML=`
<h3>${p.name}</h3>
<img src="${p.images[0]}" style="width:100%">
<p>${p.desc}</p>
<p>المخزون: ${p.stock}</p>
<select id="selectedColor">${p.colors.map(c=>`<option>${c}</option>`)}</select>
<select id="selectedSize">${p.sizes.map(s=>`<option>${s}</option>`)}</select>
<input type="number" id="qty" value="1" min="1">
<p>${finalPrice} DH</p>
<button onclick="addToCart(${p.id})">إضافة للسلة</button>
<button onclick="closeModal()">إغلاق</button>
`;
productModal.style.display="flex";
}

function closeModal(){productModal.style.display="none"}

function addToCart(id){
let p=products.find(x=>x.id===id);
let finalPrice=p.price-(p.price*discount/100);

cart.push({
name:p.name,
price:finalPrice,
color:selectedColor.value,
size:selectedSize.value,
qty:qty.value
});
updateCart();
closeModal();
}

function updateCart(){
cartItems.innerHTML="";
let total=0;
cart.forEach(i=>{
total+=i.price*i.qty;
cartItems.innerHTML+=`
<p>${i.name} - ${i.color} - ${i.size} × ${i.qty}</p>`;
});
totalPrice.innerText=total;
cartCount.innerText=cart.length;
}

function sendOrder(){
let total=cart.reduce((a,b)=>a+(b.price*b.qty),0);

let msg=`طلب جديد:%0A`;
msg+=`الاسم: ${clientName.value}%0A`;
msg+=`الهاتف: ${clientPhone.value}%0A`;
msg+=`المدينة: ${clientCity.value}%0A`;
msg+=`العنوان: ${clientAddress.value}%0A%0A`;

cart.forEach(i=>{
msg+=`${i.name} - ${i.color} - ${i.size} × ${i.qty}%0A`;
});
msg+=`%0Aالمجموع: ${total} DH`;

window.open(`https://wa.me/${WHATSAPP}?text=${msg}`);
}

function saveDiscount(){
discount=discountInput.value;
localStorage.setItem("discount",discount);
loadProducts();
}

function loadAdminProducts(){
adminProducts.innerHTML="";
products.forEach(p=>{
adminProducts.innerHTML+=`
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
pdesc.value="";
pprice.value="";
pstock.value="";
prating.value="";
pcolors.value="";
psizes.value="";
pimages.value="";
}

loadProducts();