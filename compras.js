// Datos de ejemplo para los productos
const products = [
    { id: 1, name: "Procesador Intel i7", price: 300, image: "img/procesador.png", description: "Procesador de alta gama para un rendimiento excepcional." },
    { id: 2, name: "Tarjeta RAM 16GB", price: 80, image: "img/ram.png", description: "Memoria RAM de 16GB para multitarea fluida." },
    { id: 3, name: "Fuente de Alimentación 750W", price: 100, image: "img/FuenteAlimentacion.png", description: "Fuente de alimentación potente y eficiente." },
    { id: 4, name: "Disco Duro SSD 1TB", price: 150, image: "img/discoD.png", description: "Almacenamiento rápido y confiable de 1TB." },
];

let cart = [];

// Función para cargar los productos en el menú
function loadProducts() {
    const productMenu = document.getElementById('product-menu');
    productMenu.innerHTML = products.map(product => `
        <div class="product-item" onclick="openModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        </div>
    `).join('');
}

// Función para abrir el modal con detalles del producto
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-product-details');
    
    modalContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%;">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
    `;
    
    modal.style.display = "block";
}

// Cerrar el modal
document.querySelector('.close').onclick = function() {
    document.getElementById('product-modal').style.display = "none";
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = "none";
    }
}

// Funcionalidad del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    document.getElementById('product-modal').style.display = "none";
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">X</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
}

// Toggle del carrito desplegable
document.getElementById('cart-icon').addEventListener('click', () => {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('checkout').addEventListener('click', () => {
    alert(`Pedido realizado por un total de $${document.getElementById('cart-total').textContent}`);
    cart = [];
    updateCartDisplay();
    document.getElementById('cart-dropdown').style.display = 'none';
});

// Cargar los productos al iniciar la página
loadProducts();