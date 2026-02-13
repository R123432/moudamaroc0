let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* عرض المنتجات */
function showCategory(cat){
    const container = document.getElementById("products");
    container.innerHTML="";

    products.filter(p=>p.cat===cat).forEach(p=>{

        let oldPriceHTML = "";
        if(p.old){
            oldPriceHTML = `<span class="old-price">${p.old} DH</span>`;
        }

        container.innerHTML+=`
        <div class="product-card">
            ${p.old ? '<div class="sale-badge">SALE</div>' : ""}
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <div class="price">
                ${oldPriceHTML}
                ${p.price} DH
            </div>
            <button onclick="addToCart(${p.id})" class="btn-main">
                أضف للسلة
            </button>
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
            name,
            price,
            old,
            cat,
            image:reader.result
        });

        localStorage.setItem("products",JSON.stringify(products));
        alert("✅ تمت الإضافة");
        loadAdminProducts();
        showCategory(cat);
    }

    reader.readAsDataURL(file);
}

/* السلة */
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
    document.getElementById("cartOverlay").classList.toggle("active");
}

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
        <div style="margin-bottom:8px;">
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