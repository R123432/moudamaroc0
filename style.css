import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "PUT_YOURS",
  authDomain: "PUT_YOURS",
  projectId: "PUT_YOURS",
  storageBucket: "PUT_YOURS",
  messagingSenderId: "PUT_YOURS",
  appId: "PUT_YOURS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let cart=[];

async function loadProducts(){
let snapshot = await getDocs(collection(db,"products"));
let container=document.getElementById("products");
container.innerHTML="";

snapshot.forEach(doc=>{
let p=doc.data();

container.innerHTML+=`
<div class="product" onclick="openProduct('${doc.id}','${p.name}',${p.price},'${p.images}')">
<img src="${p.images[0]}">
<h4>${p.name}</h4>
<p>${p.price} DH</p>
</div>`;
});
}

window.openProduct=(id,name,price,images)=>{
let imgs=images.split(",");
let sliderHTML="";
imgs.forEach(img=>{
sliderHTML+=`<img src="${img}" class="slide">`;
});

document.getElementById("modalBody").innerHTML=`
<div class="slider">${sliderHTML}</div>
<h3>${name}</h3>
<p>${price} DH</p>
<button onclick="addToCart('${name}',${price})">إضافة للسلة</button>
`;
document.getElementById("productModal").style.display="flex";
}

window.addToCart=(name,price)=>{
cart.push({name,price});
alert("تمت الإضافة");
}

window.confirmOrder=()=>{
let name=document.getElementById("clientName").value;
let phone=document.getElementById("clientPhone").value;
let address=document.getElementById("clientAddress").value;

let total=cart.reduce((a,b)=>a+b.price,0);

let msg=`طلب جديد:%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالعنوان: ${address}%0A`;
cart.forEach(p=>msg+=p.name+"%0A");
msg+=`المجموع: ${total} DH`;

window.open("https://wa.me/212712120673?text="+msg);
}

loadProducts();