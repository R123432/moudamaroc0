let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let editingId = null;

/* عرض المنتجات */
function showCategory(cat){
    const container = document.getElementById("products");
    container.innerHTML="";

    products.filter(p=>p.cat===cat).forEach(p=>{
        container.innerHTML+=`
        <div class="product">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <div class="price">${p.price} DH</div>
            <button onclick="addToCart(${p.id})">أضف للسلة</button>
        </div>
        `;
    });
}

/* إضافة منتج */
function addProduct(){
    const file = document.getElementById("pimage").files[0];
    const name = document.getElementById("pname").value;
    const price = document.getElementById("pprice").value;
    const old = document.getElementById("pold").value;
    const cat = document.getElementById("pcat").value;

    if(!name || !price || !file){
        alert("⚠️ جميع الخانات مطلوبة");
        return;
    }

    const reader = new FileReader();
    reader.onload=function(){
        products.push({
            id:Date.now(),
            name,price,old,cat,
            image:reader.result
        });
        localStorage.setItem("products",JSON.stringify(products));
        alert("✅ تمت الإضافة");
        loadAdminProducts();
    }
    reader.readAsDataURL(file);
}

/* سلة */
function addToCart(id){
    let item = products.find(p=>p.id===id);
    cart.push(item);
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
}

function updateCart(){
    document.getElementById("cartCount").innerText = cart.length;
}

function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

/* إدارة */
function openAdmin(){
    document.getElementById("adminPanel").classList.toggle("active");
}

function loginAdmin(){
    const code=document.getElementById("adminCode").value;
    if(code==="2025"){
        document.getElementById("adminContent").style.display="block";
        loadAdminProducts();
    }else{
        alert("❌ كود خاطئ");
    }
}

function loadAdminProducts(){
    let container=document.getElementById("adminProducts");
    container.innerHTML="";
    products.forEach(p=>{
        container.innerHTML+=`
        <div>
            ${p.name} - ${p.price} DH
        </div>
        `;
    });
}

/* الوضع الليلي */
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

updateCart();
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});