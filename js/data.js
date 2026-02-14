let products = JSON.parse(localStorage.getItem("products")) || [
{
id:1,
name:"Nike Shoes",
price:299,
stock:10,
discount:0,
image:"https://via.placeholder.com/250"
},
{
id:2,
name:"Adidas Shirt",
price:199,
stock:15,
discount:10,
image:"https://via.placeholder.com/250"
}
];