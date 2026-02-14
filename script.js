const products = [
{
name: "قميص رجالي أنيق",
price: 150,
image: "https://images.unsplash.com/photo-1520975916090-3105956dac38"
},
{
name: "سترة شتوية",
price: 300,
image: "https://images.unsplash.com/photo-1544441893-675973e31985"
},
{
name: "تيشيرت عصري",
price: 120,
image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475"
}
];

const container = document.getElementById("products");

products.forEach(product => {

const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="${product.image}">
<h3>${product.name}</h3>
<p>${product.price} درهم</p>
<button onclick="order('${product.name}', ${product.price})">
اطلب عبر واتساب
</button>
`;

container.appendChild(card);

});

function order(name, price){
const phone = "212XXXXXXXXX"; // ضع رقمك هنا
const message = مرحبا أريد طلب ${name} بسعر ${price} درهم;
const url = https://wa.me/${phone}?text=${encodeURIComponent(message)};
window.open(url, "_blank");
}
