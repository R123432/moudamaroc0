let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id){

const product = products.find(p => p.id === id);

if(!product){
alert("خطأ: المنتج غير موجود");
return;
}

cart.push(product);

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

document.getElementById("cartTotal").innerText = total;
}

function removeItem(index){
cart.splice(index,1);
saveCart();
renderCart();
updateCartCount();
}

updateCartCount();