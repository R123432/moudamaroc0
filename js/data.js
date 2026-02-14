let products = JSON.parse(localStorage.getItem("products")) || [
    {
        id: 1,
        name: "هاتف ذكي",
        price: 1200,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 2,
        name: "حاسوب محمول",
        price: 3500,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "سماعات بلوتوث",
        price: 300,
        image: "https://via.placeholder.com/200"
    }
];

localStorage.setItem("products", JSON.stringify(products));