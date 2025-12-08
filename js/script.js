// Products Data
const products = [
    {
        id: 1,
        name: "Wireless Headphone",
        description: "Premium noise-cancelling over-ear headphones with spatial audio",
        price: 549.99,
        category: "Audio",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },

    {
        id: 2,
        name: "Smartwatch",
        description: "Rugged smartwatch with GPS, fitness tracking and 36-hour battery life",
        price: 399.99,
        category: "Wearables",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },

    {
        id: 3,
        name: "Wireless Mouse",
        description: "Computing mouse with ergonomic design and adjustable DPI settings",
        price: 79.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },

    {
        id: 4,
        name: "Superslim Keyboard",
        description: "Compact and portable keyboard with backlit keys and rechargeable battery",
        price: 49.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
    },

    {
        id: 5,
        name: "MX Master 3S Mouse",
        description: "Ergonomic wireless mouse with 8K DPI and multi-device support",
        price: 79.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
    },

    {
        id: 6,
        name: "Mechanical Keyboard RGB",
        description: "Customizable RGB backlit keys with tactile switches",
        price: 69.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop"
    },

    {
        id: 7,
        name: "Gaming Monitor",
        description: "27-inch 144Hz 1ms curved display with FreeSync",
        price: 149.99,
        category: "Computing",
        image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop"
    },

    {
        id: 8,
        name: "Portable HDD 2TB",
        description: "USB 3.0 external hard drive with shock resistance",
        price: 249.99,
        category: "Computing",
        image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop"
    },

    {
        id: 9,
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise cancellation with 30-hour battery",
        price: 499.99,
        category: "Audio",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop"
    },

    {
        id: 10,
        name: "iPad Pro 12.9\"",
        description: "M2 chip, Liquid Retina XDR display, 128GB storage",
        price: 1099.99,
        category: "Computing",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
    },

    {
        id: 11,
        name: "Gaming Headset RGB",
        description: "7.1 surround sound, detachable mic, memory foam cushions",
        price: 129.99,
        category: "Gaming",
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop"
    },

    {
        id: 12,
        name: "IMac 24\" M1",
        description: "Apple M1 chip, 4.5K Retina display, 256GB SSD",
        price: 1299.99,
        category: "Computing",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop"
    }

];


// Cart Object - Handles all cart operations
const cart = {
    items: [],

    // Add product to cart
    add(product) {
        try {
            const existingItem = this.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }

            this.save();
            return true;

        } catch (error) {
            console.error("Error adding to cart:", error);
            return false;

        }

    },

    // Update quantity of a product
    updateQuantity(productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error("Quantity cannot be negative");
            }

            if (quantity === 0) {
                this.remove(productId);
                return;
            }

            const item = this.items.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                this.save();

            }

        } catch (error) {
            console.error("Error updating quantity:", error);
            alert(error.message);
        }
    },

    // Remove product from cart
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();

    },

    // Clear all items from cart
    clear() {
        this.items = [];
        this.save();

    },

    // Get total count of items in cart
    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);

    },

    // Calculate total price
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    },

    // Save cart state and update UI
    save() {
        UI.updateCart();

    }

};

// UI Object - Handles all user interface operations
const UI = {
    // Initialize the application
    init() {
        this.renderProducts();
        this.attachEventListeners();

    },

    // Render all products to the grid
    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = products.map((product, index) => `
            <div class="glass-effect product-card bg-white rounded-2xl shadow-xl overflow-hidden fade-in border border-indigo-100" style="animation-delay: ${index * 0.1}s">
                <div class="relative overflow-hidden group">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        New
                    </div>
                </div>
                <div class="p-6 bg-[linear-gradient(135deg,#2e2d32_0%,#3a3a3c_50%,#24243e_100%)] bg-fixed">
                    <h3 class="text-xl font-bold text-white mb-2 hover:text-indigo-600 transition-colors">${product.name}</h3>
                    <p class="text-white mb-4 text-sm leading-relaxed">${product.description}</p>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-xs text-gray-500 mb-1">Price</p>
                            <span class="text-3xl font-extrabold gradient-text">$${product.price.toFixed(2)}</span>
                        </div>
                        <button onclick="UI.addToCart(${product.id})" class="add-to-cart-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg font-semibold">
                            <span class="flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span>Add</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Add product to cart with visual feedback
    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product && cart.add(product)) {
            const cartCount = document.getElementById('cartCount');
            cartCount.classList.add('cart-badge-pulse');
            setTimeout(() => cartCount.classList.remove('cart-badge-pulse'), 300);

            this.showNotification(`${product.name} added to cart!`);

        }

    },

    // Show success notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-3 animate-slide-in';
        notification.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="font-semibold">${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);

    },

    // Update cart count and render cart items
    updateCart() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = cart.getCount();
        this.renderCartItems();

    },

    // Render cart items in the sidebar
    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cart.items.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-12">
                    <div class="mb-4">
                        <svg class="w-24 text-white h-24 mx-auto text-White" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <p class="text-white text-lg">Your cart is empty</p>
                    <p class="text-white text-sm mt-2">Add some items to get started!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.items.map(item => `
                <div class="cart-item bg-white rounded-2xl p-5 mb-4 cart-slide-in shadow-lg border border-indigo-50 hover:border-indigo-200 transition-all">
                    <div class="flex gap-4">
                        <div class="relative group">
                            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-gray-800 text-lg mb-1">${item.name}</h4>
                            <p class="text-sm text-gray-500 mb-2">${item.description}</p>
                            <p class="gradient-text font-extrabold text-xl mb-3">$${item.price.toFixed(2)}</p>
                            <div class="flex items-center gap-3">
                                <button onclick="UI.decrementQuantity(${item.id})" class="quantity-btn bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-3 py-2 rounded-lg hover:from-indigo-200 hover:to-purple-200 font-bold shadow-md">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4"></path>
                                    </svg>
                                </button>
                                <input type="number" value="${item.quantity}" min="1" onchange="UI.changeQuantity(${item.id}, this.value)" class="w-20 text-center border-2 border-indigo-200 rounded-lg px-3 py-2 font-bold text-gray-800 focus:border-indigo-500 focus:outline-none">
                                <button onclick="UI.incrementQuantity(${item.id})" class="quantity-btn bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-3 py-2 rounded-lg hover:from-indigo-200 hover:to-purple-200 font-bold shadow-md">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </button>
                                <button onclick="UI.removeFromCart(${item.id})" class="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

        }

        // FIXED: Added dollar sign
        cartTotal.textContent = `$${cart.getTotal().toFixed(2)}`;
    },

    // Handle quantity change from input field
    changeQuantity(productId, value) {
        const quantity = parseInt(value);
        // FIXED: Changed from < 0 to < 1
        if (isNaN(quantity) || quantity < 1) {
            alert("Please enter a valid quantity (1 or more).");
            this.renderCartItems();
            return;

        }
        cart.updateQuantity(productId, quantity);

    },

    // Increment product quantity
    incrementQuantity(productId) {
        const item = cart.items.find(item => item.id === productId);
        if (item) {
            cart.updateQuantity(productId, item.quantity + 1);

        }

    },

    // Decrement product quantity
    decrementQuantity(productId) {
        const item = cart.items.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            cart.updateQuantity(productId, item.quantity - 1);
        }

    },

    // Remove product from cart
    removeFromCart(productId) {
        cart.remove(productId);

    },

    // Toggle cart sidebar visibility
    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('overlay');
        const modal = document.getElementById('checkoutModal');

        // FIXED: Removed undefined 'isOpen' variable and unnecessary if-else
        // Only toggle overlay if checkout modal is not open
        if (modal.classList.contains('hidden')) {
            cartSidebar.classList.toggle('translate-x-full');
            overlay.classList.toggle('hidden');
        } else {
            // Just close the cart sidebar, keep overlay for modal
            cartSidebar.classList.add('translate-x-full');

        }

    },

    // Show checkout modal
    showCheckout() {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;

        }

        // FIXED: Close the cart sidebar before showing checkout
        const cartSidebar = document.getElementById('cartSidebar');
        cartSidebar.classList.add('translate-x-full');

        const modal = document.getElementById('checkoutModal');
        const overlay = document.getElementById('overlay');
        const content = document.getElementById('checkoutContent');
        const total = document.getElementById('checkoutTotal');

        content.innerHTML = cart.items.map(item => `
            <div class="bg-white flex justify-between items-center py-6 border-b border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 rounded-xl px-4 transition-all">
                <div class="flex items-center gap-5">
                    <div class="relative group">
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                        <div class="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg">
                            ${item.quantity}
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-lg">${item.name}</h4>
                        <p class="text-sm text-gray-500 mt-1">${item.description}</p>
                        <p class="text-indigo-600 font-semibold mt-2">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                </div>
                <span class="font-extrabold gradient-text text-2xl">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        // FIXED: Added dollar sign
        total.textContent = `$${cart.getTotal().toFixed(2)}`;
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');

    },

    // Close checkout modal
    closeCheckout() {
        document.getElementById('checkoutModal').classList.add('hidden');
        document.getElementById('overlay').classList.add('hidden');

    },

    // Attach all event listeners
    attachEventListeners() {
        document.getElementById('cartBtn').addEventListener('click', () => this.toggleCart());
        document.getElementById('closeCart').addEventListener('click', () => this.toggleCart());

        // FIXED: Better overlay click handler
        document.getElementById('overlay').addEventListener('click', () => {
            const sidebar = document.getElementById('cartSidebar');
            const modal = document.getElementById('checkoutModal');
            const overlay = document.getElementById('overlay');

            // Close cart sidebar if open
            if (!sidebar.classList.contains('translate-x-full')) {
                sidebar.classList.add('translate-x-full');
            }

            // Close checkout modal if open
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }

            // Hide overlay
            overlay.classList.add('hidden');
        });


        document.getElementById('clearCart').addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the cart?')) {
                cart.clear();
            }

        });

        document.getElementById('checkoutBtn').addEventListener('click', () => this.showCheckout());
        document.getElementById('closeCheckout').addEventListener('click', () => this.closeCheckout());
    }
    
};

// Initialize the application
UI.init();