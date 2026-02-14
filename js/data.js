let products = JSON.parse(localStorage.getItem("products"));

if(!products){
products = [];
localStorage.setItem("products", JSON.stringify(products));
}