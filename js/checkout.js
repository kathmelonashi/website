// Checkout Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Listen for navigation to checkout page
    window.addEventListener('hashchange', handleCheckoutNavigation);

    // Initial check
    handleCheckoutNavigation();

    // Set up form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
});

function handleCheckoutNavigation() {
    const hash = window.location.hash.substring(1);

    if (hash === 'checkout') {
        const cart = cartManager.getCart();

        // Redirect to gallery if cart is empty
        if (cart.items.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            window.location.hash = 'gallery';
            return;
        }

        renderCheckoutPage();
    } else if (hash.startsWith('order-confirmation')) {
        // Handle order confirmation page
        const parts = hash.split('/');
        if (parts.length > 1) {
            const orderId = parts[1];
            renderOrderConfirmation(orderId);
        }
    }
}

function renderCheckoutPage() {
    const cart = cartManager.getCart();
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');

    if (!checkoutItemsContainer) return;

    // Clear existing content
    checkoutItemsContainer.innerHTML = '';

    // Render checkout items
    cart.items.forEach(item => {
        const checkoutItem = createCheckoutItemElement(item);
        checkoutItemsContainer.appendChild(checkoutItem);
    });

    // Update totals
    const subtotal = cartManager.getSubtotal();
    if (checkoutSubtotal) {
        checkoutSubtotal.textContent = `$${subtotal}`;
    }
    if (checkoutTotal) {
        checkoutTotal.textContent = `$${subtotal}+`;
    }
}

function createCheckoutItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'checkout-item';

    const itemSubtotal = item.price * item.quantity;

    itemDiv.innerHTML = `
        <div class="checkout-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="checkout-item-details">
            <div class="checkout-item-title">${item.title}</div>
            <div class="checkout-item-quantity">Quantity: ${item.quantity}</div>
            <div class="checkout-item-price">$${itemSubtotal}</div>
        </div>
    `;

    return itemDiv;
}

async function handleCheckoutSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    clearFormErrors();

    // Validate form
    const formData = getFormData();
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors);
        return;
    }

    // Disable submit button
    const submitButton = e.target.querySelector('.submit-order-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;

    try {
        // Create order object
        const order = createOrderObject(formData);

        // Submit order to server
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Success! Clear cart and redirect to confirmation
            cartManager.clear();
            window.location.hash = `order-confirmation/${order.orderId}`;

            // Store order details for confirmation page
            sessionStorage.setItem('lastOrder', JSON.stringify(order));
        } else {
            throw new Error(result.error || 'Failed to process order');
        }
    } catch (error) {
        console.error('Order submission error:', error);
        displayCheckoutError('Unable to process your order. Please try again or contact us directly.');

        // Re-enable submit button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function getFormData() {
    return {
        name: document.getElementById('checkout-name').value.trim(),
        email: document.getElementById('checkout-email').value.trim(),
        phone: document.getElementById('checkout-phone').value.trim(),
        address: document.getElementById('checkout-address').value.trim(),
        city: document.getElementById('checkout-city').value.trim(),
        state: document.getElementById('checkout-state').value.trim(),
        zip: document.getElementById('checkout-zip').value.trim(),
        country: document.getElementById('checkout-country').value,
        notes: document.getElementById('checkout-notes').value.trim()
    };
}

function validateForm(data) {
    const errors = {};

    // Required fields
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.phone) errors.phone = 'Phone number is required';
    if (!data.address) errors.address = 'Address is required';
    if (!data.city) errors.city = 'City is required';
    if (!data.state) errors.state = 'State/Province is required';
    if (!data.zip) errors.zip = 'Zip/Postal code is required';
    if (!data.country) errors.country = 'Country is required';

    // Email format validation
    if (data.email && !isValidEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Phone format validation (basic)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    return phoneRegex.test(phone);
}

function createOrderObject(formData) {
    const cart = cartManager.getCart();
    const subtotal = cartManager.getSubtotal();

    return {
        orderId: generateOrderId(),
        items: cart.items,
        customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
            notes: formData.notes
        },
        subtotal: subtotal,
        shipping: null,
        total: subtotal,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString()
    };
}

function generateOrderId() {
    return `ORD-${Date.now()}`;
}

function clearFormErrors() {
    // Remove error classes
    const inputs = document.querySelectorAll('.form-group input, .form-group select');
    inputs.forEach(input => input.classList.remove('error'));

    // Remove error messages
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach(msg => msg.remove());

    // Clear general error message
    const checkoutError = document.getElementById('checkout-error');
    if (checkoutError) {
        checkoutError.textContent = '';
    }
}

function displayFormErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const input = document.getElementById(`checkout-${fieldName}`);
        if (input) {
            input.classList.add('error');

            // Add error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'field-error';
            errorMsg.textContent = errors[fieldName];
            input.parentNode.appendChild(errorMsg);
        }
    });

    // Scroll to first error
    const firstError = document.querySelector('.error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function displayCheckoutError(message) {
    const checkoutError = document.getElementById('checkout-error');
    if (checkoutError) {
        checkoutError.textContent = message;
        checkoutError.className = 'error-message';
        checkoutError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show order confirmation page
function showOrderConfirmation(orderId) {
    renderOrderConfirmation(orderId);
}

function renderOrderConfirmation(orderId) {
    // Try to get order from sessionStorage
    const lastOrderData = sessionStorage.getItem('lastOrder');
    let order = null;

    if (lastOrderData) {
        order = JSON.parse(lastOrderData);
    }

    // Update confirmation page content
    const orderIdElement = document.getElementById('confirmation-order-id');
    const emailElement = document.getElementById('confirmation-email');

    if (orderIdElement) {
        orderIdElement.textContent = orderId;
    }

    if (emailElement && order) {
        emailElement.textContent = order.customer.email;
    }
}
