
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id){
const product = products.find(p=>p.id===id);
cart.push(product);
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
}

function updateCartCount(){
const count = document.getElementById("cartCount");
if(count) count.innerText = cart.length;
}

function toggleCart(){
document.getElementById("cartPanel").classList.toggle("active");
renderCart();
}

function renderCart(){
const container = document.getElementById("cartItems");
container.innerHTML="";
let total=0;

cart.forEach(item=>{
total+=item.price;
container.innerHTML+=`
<div class="cart-item">
${item.name} - ${item.price} DH
</div>
`;
});

document.getElementById("cartTotal").innerText=total;
}

updateCartCount();