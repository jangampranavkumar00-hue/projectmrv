let users = JSON.parse(localStorage.users || "[]");
let foods = [
    {name:"Biryani 🍛", price:180},
    {name:"Pizza 🍕", price:250},
    {name:"Burger 🍔", price:120},
    {name:"Dosa 🥞", price:60}
];
let cart = [], orders = [];

function signup() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (!name || !email || password.length < 6)
        return alert("Enter valid details!");
    if (users.some(u => u.email === email))
        return alert("Account already exists!");
    users.push({name,email,password});
    localStorage.users = JSON.stringify(users);
    alert("Signup successful! Now login.");
}

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(email === "admin@gmail.com" && password === "admin123") {
        show("admin");
        return;
    }
    let user = users.find(u => u.email === email && u.password === password);
    if(!user) return alert("Invalid login!");
    show("customer");
    display();
}

function show(page) {
    ["login","customer","admin"].forEach(id =>
        document.getElementById(id).hidden = id !== page);
}

function display() {
    menu.innerHTML = foods.map((f,i) =>
        `<div class="food">${f.name}<p>₹${f.price}</p>
        <button onclick="add(${i})">Add</button></div>`).join("");
}

function add(i) {
    cart.push(foods[i]);
    update();
}

function update() {
    cart.innerHTML = "";
    document.getElementById("cart").innerHTML =
        cart.map(f => `<p>${f.name} - ₹${f.price}</p>`).join("");
    document.getElementById("total").textContent =
        cart.reduce((s,f) => s+f.price,0);
}

function order() {
    if(!cart.length) return alert("Cart is empty!");
    orders.push({items:[...cart], total:cart.reduce((s,f)=>s+f.price,0)});
    cart = [];
    update();
    alert("Order placed successfully!");
}

function logout() {
    show("login");
}

function adminView() {
    document.getElementById("orders").textContent = orders.length;
    document.getElementById("adminMenu").innerHTML =
        foods.map(f => `<p>${f.name} - ₹${f.price}</p>`).join("");
    document.getElementById("adminOrders").innerHTML =
        orders.map(o => `<p>Order: ₹${o.total}</p>`).join("");
}

const oldLogin = login;
login = function() {
    oldLogin();
    if (!document.getElementById("admin").hidden) adminView();
};

show("login");


