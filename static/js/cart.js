// Sample cart data
let cartItems = [
    { id: 1, name: "Laptop Dell Inspiron 15 3000", price: 12990000, quantity: 1, supplier: "Viết Sơn JSC", image: "💻" },
    { id: 2, name: "Mainboard ASUS TUF GAMING B650M-PLUS", price: 28990000, quantity: 1, supplier: "Viết Sơn JSC", image: "💻" },
    { id: 3, name: "ROSA office I", price: 24990000, quantity: 2, supplier: "ROSA COMPUTER AI", image: "💻" }
];
let appliedPromo = null;

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Render cart items
function renderCartItems() {
    const list = document.getElementById("cartItemsList");
    const cartContent = document.getElementById("cartContent");
    const emptyCart = document.getElementById("emptyCart");

    if (cartItems.length === 0) {
        cartContent.style.display = "none";
        emptyCart.style.display = "block";
        return;
    }

    cartContent.style.display = "grid";
    emptyCart.style.display = "none";

    list.innerHTML = "";
    cartItems.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
                    <span class="cart-col name">${item.image} ${item.name}</span>
                    <span class="cart-col supplier">${item.supplier}</span>
                    <span class="cart-col quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        ${item.quantity}
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </span>
                    <span class="cart-col price">${formatPrice(item.price * item.quantity)}</span>
                `;
        list.appendChild(row);
    });

    updateSummary();
    updateCartBadge();
}

// Update quantity
function updateQuantity(id, delta) {
    const item = cartItems.find(i => i.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        renderCartItems();
    }
}

// Remove all items
function clearCart() {
    if (confirm("Bạn có chắc muốn xóa tất cả sản phẩm?")) {
        cartItems = [];
        renderCartItems();
    }
}

// Update summary
function updateSummary() {
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 500000 ? 0 : 30000;
    const discount = appliedPromo ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;

    // cập nhật tạm tính trong giỏ hàng
    document.getElementById("cartSubtotal").textContent = formatPrice(subtotal);

    // cập nhật tóm tắt đơn hàng
    document.getElementById("subtotal").textContent = formatPrice(subtotal);
    document.getElementById("shipping").textContent = formatPrice(shipping);
    document.getElementById("discount").textContent = formatPrice(-discount);
    document.getElementById("cartTotal").textContent = formatPrice(total);

    document.getElementById("checkoutBtn").disabled = cartItems.length === 0;
}

// Apply promo code
function applyPromo() {
    const code = document.getElementById("promoInput").value.trim();
    if (code === "SAVE10") {
        appliedPromo = true;
        alert("Mã giảm giá đã được áp dụng (10%)!");
    } else {
        appliedPromo = null;
        alert("Mã giảm giá không hợp lệ.");
    }
    updateSummary();
}

// Checkout
function checkout() {
    if (cartItems.length === 0) return alert("Giỏ hàng trống!");
    alert("Chuyển đến trang thanh toán...");
}

// Update cart badge
function updateCartBadge() {
    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById("cartBadge").textContent = totalItems;
}

// Init
document.addEventListener("DOMContentLoaded", renderCartItems);