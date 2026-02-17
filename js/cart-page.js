// Cart Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Listen for navigation to cart page
    window.addEventListener('hashchange', renderCartIfActive);

    // Listen for cart updates
    window.addEventListener('cart-updated', renderCartIfActive);
    window.addEventListener('cart-cleared', renderCartIfActive);
    window.addEventListener('cart-loaded', renderCartIfActive);

    // Initial render if on cart page
    renderCartIfActive();
});

function renderCartIfActive() {
    const hash = window.location.hash.substring(1);
    if (hash === 'cart') {
        renderCartPage();
    }
}

function renderCartPage() {
    const cart = cartManager.getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const checkoutButton = document.getElementById('checkout-button');

    if (!cartItemsContainer) return;

    // Clear existing content
    cartItemsContainer.innerHTML = '';

    // Check if cart is empty
    if (cart.items.length === 0) {
        renderEmptyCart(cartItemsContainer);
        cartSubtotalElement.textContent = '$0';
        if (checkoutButton) {
            checkoutButton.style.display = 'none';
        }
        return;
    }

    // Show checkout button
    if (checkoutButton) {
        checkoutButton.style.display = 'inline-block';
    }

    // Render cart items
    cart.items.forEach(item => {
        const cartItemElement = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update subtotal
    updateCartTotals();
}

function createCartItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.setAttribute('data-id', item.id);

    const itemSubtotal = item.price * item.quantity;

    itemDiv.innerHTML = `
        <div class="cart-item-image" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-info">
            <h3 class="cart-item-title">${item.title}</h3>
            <p class="cart-item-price">${item.priceDisplay} each</p>
            <p class="cart-item-quantity">Subtotal: $${itemSubtotal}</p>
        </div>
        <div class="cart-item-controls">
            <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
            <span class="cart-item-quantity-display">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;

    // Add event listeners
    const imageElement = itemDiv.querySelector('.cart-item-image');
    imageElement.addEventListener('click', () => {
        window.location.hash = `detail/${item.id}`;
    });

    const minusBtn = itemDiv.querySelector('.qty-minus');
    minusBtn.addEventListener('click', () => handleQuantityChange(item.id, -1));

    const plusBtn = itemDiv.querySelector('.qty-plus');
    plusBtn.addEventListener('click', () => handleQuantityChange(item.id, 1));

    const removeBtn = itemDiv.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => handleRemoveItem(item.id, item.title));

    return itemDiv;
}

function handleQuantityChange(itemId, change) {
    const cart = cartManager.getCart();
    const item = cart.items.find(i => i.id === itemId);

    if (item) {
        const newQuantity = item.quantity + change;

        if (newQuantity > 0 && newQuantity <= 10) {
            cartManager.updateQuantity(itemId, newQuantity);
        } else if (newQuantity <= 0) {
            // Remove item if quantity goes to 0
            handleRemoveItem(itemId, item.title);
        } else if (newQuantity > 10) {
            alert('Maximum quantity is 10 per item');
        }
    }
}

function handleRemoveItem(itemId, itemTitle) {
    if (confirm(`Remove "${itemTitle}" from cart?`)) {
        cartManager.removeItem(itemId);
    }
}

function updateCartTotals() {
    const subtotal = cartManager.getSubtotal();
    const cartSubtotalElement = document.getElementById('cart-subtotal');

    if (cartSubtotalElement) {
        cartSubtotalElement.textContent = `$${subtotal}`;
    }
}

function renderEmptyCart(container) {
    container.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h3 class="empty-cart-message">Your cart is empty</h3>
            <p class="empty-cart-text">Browse the gallery to find beautiful handmade pottery pieces</p>
            <a href="#gallery" class="primary-button">Browse Gallery</a>
        </div>
    `;
}
