// Shopping Cart Manager
// Handles cart state, localStorage persistence, and cart operations

class CartManager {
    constructor() {
        this.cart = { items: [], lastUpdated: null };
        this.storageKey = 'pottery-cart';
    }

    // Initialize cart from localStorage
    init() {
        this.loadCart();
        this.setupStorageListener();
        this.dispatchEvent('cart-loaded', this.getCartData());
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Validate structure
                if (parsed && Array.isArray(parsed.items)) {
                    this.cart = parsed;
                }
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            this.cart = { items: [], lastUpdated: null };
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            this.cart.lastUpdated = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
            // Handle quota exceeded
            if (error.name === 'QuotaExceededError') {
                alert('Cart storage is full. Please complete your order or remove items.');
            }
        }
    }

    // Check if an item is purchasable (has numeric price)
    isItemPurchasable(piece) {
        if (!piece || !piece.price) return false;
        // Match pattern: number + $
        return /\d+\$/.test(piece.price);
    }

    // Parse price string to numeric value
    parsePrice(priceString) {
        if (!priceString) return null;
        const match = priceString.match(/(\d+)\$/);
        return match ? parseInt(match[1], 10) : null;
    }

    // Get piece from database by ID
    getPiece(pieceId) {
        const id = parseInt(pieceId, 10);
        return potteryDatabase.find(p => p.id === id);
    }

    // Add item to cart
    addItem(pieceId, quantity = 1) {
        const piece = this.getPiece(pieceId);

        if (!piece) {
            console.error('Piece not found:', pieceId);
            return { success: false, message: 'Item not found' };
        }

        if (!this.isItemPurchasable(piece)) {
            return { success: false, message: 'This item is not available for purchase' };
        }

        const price = this.parsePrice(piece.price);
        if (price === null) {
            return { success: false, message: 'Invalid price' };
        }

        // Check if item already exists in cart
        const existingItem = this.cart.items.find(item => item.id === piece.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.items.push({
                id: piece.id,
                title: piece.title,
                price: price,
                priceDisplay: piece.price,
                image: piece.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.dispatchEvent('cart-updated', this.getCartData());

        return { success: true, message: 'Added to cart!' };
    }

    // Remove item from cart
    removeItem(pieceId) {
        const id = parseInt(pieceId, 10);
        this.cart.items = this.cart.items.filter(item => item.id !== id);
        this.saveCart();
        this.dispatchEvent('cart-updated', this.getCartData());
    }

    // Update item quantity
    updateQuantity(pieceId, quantity) {
        const id = parseInt(pieceId, 10);
        const item = this.cart.items.find(item => item.id === id);

        if (item) {
            quantity = parseInt(quantity, 10);
            if (quantity > 0 && quantity <= 10) {
                item.quantity = quantity;
                this.saveCart();
                this.dispatchEvent('cart-updated', this.getCartData());
                return true;
            } else if (quantity <= 0) {
                this.removeItem(pieceId);
                return true;
            }
        }
        return false;
    }

    // Get cart contents
    getCart() {
        return this.cart;
    }

    // Get total item count (sum of quantities)
    getItemCount() {
        return this.cart.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Clear cart
    clear() {
        this.cart = { items: [], lastUpdated: null };
        this.saveCart();
        this.dispatchEvent('cart-cleared', { itemCount: 0, subtotal: 0, items: [] });
    }

    // Get cart data for events
    getCartData() {
        return {
            itemCount: this.getItemCount(),
            subtotal: this.getSubtotal(),
            items: this.cart.items
        };
    }

    // Dispatch custom event
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    // Setup storage event listener for cross-tab synchronization
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.loadCart();
                this.dispatchEvent('cart-updated', this.getCartData());
            }
        });
    }
}

// Create and initialize cart manager singleton
const cartManager = new CartManager();

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => cartManager.init());
} else {
    cartManager.init();
}
