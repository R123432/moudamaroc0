let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){

let products = JSON.parse(localStorage.getItem("products")) || [];

// نحولو id لرقم باش نضمنو التطابق
id = Number(id);

const product = products.find(p => Number(p.id) === id);

if(!product){
alert("خطأ: المنتج غير موجود ❌");
console.log("ID المرسل:", id);
console.log("المنتجات:", products);
return;
}



cart.push({
id: product.id,
name: product.name,
price: Number(product.price)
});

saveCart();
updateCartCount();
renderCart();

alert("تمت إضافة المنتج للسلة ✅");
}

function updateCartCount(){
const count = document.getElementById("cartCount");
if(count){
count.innerText = cart.length;
}
}

function renderCart(){

cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cartItems");
if(!container) return;

container.innerHTML = "";
let total = 0;

cart.forEach((item,index)=>{
total += Number(item.price);

container.innerHTML += `
<div class="cart-item">
${item.name} - ${item.price} DH
<button onclick="removeItem(${index})">حذف</button>
</div>
`;
});

const totalElement = document.getElementById("cartTotal");
if(totalElement){
totalElement.innerText = total;
}
}

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartCount();
}

document.addEventListener("DOMContentLoaded", function(){
updateCartCount();
renderCart();
});