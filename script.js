// Global variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
let currentProductPage = 1;
const productsPerPage = 8;
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initHeroSlider();
    initSliders();
    setupEventListeners();
    updateCartUI();
    loadPageSpecificContent();
    initDarkMode();
    updateRecentlyViewedDisplay();
});

// Load products
async function loadProducts() {
    products = getDefaultProducts();
    displayOfferings();
    if (document.getElementById('relatedProductsGrid')) displayRelatedProducts();
    if (document.getElementById('categoryProductsGrid')) displayCategoryProducts();
    if (document.getElementById('ordersList')) displayOrders();
    if (document.getElementById('fullCategoryGrid')) displayFullCategories();
}

// Default products
function getDefaultProducts() {
    return [
        { id: 1, name: "Organic Apples", category: "fruits", price: 120, oldPrice: 150, discount: "20% off", unit: "1 kg", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200", rating: 4.5, inStock: true, isFeatured: true, isBestSelling: true, description: "Fresh organic apples from Himachal Pradesh. Rich in antioxidants and fiber.", nutritionalInfo: "High in Vitamin C, Dietary Fiber", shelfLife: "5-7 days", origin: "Himachal Pradesh", maxQuantity: 20 },
        { id: 2, name: "Fresh Bananas", category: "fruits", price: 49, oldPrice: 60, discount: "18% off", unit: "6 pcs", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200", rating: 4.3, inStock: true, isFeatured: true, isBestSelling: true, description: "Cavendish bananas, naturally ripened.", nutritionalInfo: "Rich in Potassium", shelfLife: "3-5 days", maxQuantity: 20 },
        { id: 3, name: "Fresh Carrots", category: "vegetables", price: 35, oldPrice: 45, discount: "22% off", unit: "500 g", image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=200", rating: 4.2, inStock: true, description: "Farm fresh orange carrots.", nutritionalInfo: "Rich in Vitamin A", shelfLife: "7-10 days", maxQuantity: 20 },
        { id: 4, name: "Orange Juice", category: "juices", price: 99, oldPrice: 120, discount: "17% off", unit: "1 L", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200", rating: 4.6, inStock: true, isFeatured: true, isNewArrival: true, description: "Cold-pressed orange juice, no added sugar.", nutritionalInfo: "Vitamin C Rich", shelfLife: "3 days refrigerated", maxQuantity: 20 },
        { id: 5, name: "Fresh Broccoli", category: "vegetables", price: 55, oldPrice: 70, discount: "21% off", unit: "500 g", image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=200", rating: 4.4, inStock: true, isBestSelling: true, maxQuantity: 20 },
        { id: 6, name: "Coconut Water", category: "beverages", price: 89, oldPrice: 110, discount: "19% off", unit: "500 ml", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200", rating: 4.7, inStock: true, isFeatured: true, isNewArrival: true, maxQuantity: 20 },
        { id: 7, name: "Chocolate Cake", category: "cakes", price: 399, oldPrice: 499, discount: "20% off", unit: "500 g", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200", rating: 4.8, inStock: true, isFeatured: true, isBestSelling: true, maxQuantity: 20 },
        { id: 8, name: "Vanilla Ice Cream", category: "icecream", price: 149, oldPrice: 199, discount: "25% off", unit: "1 L", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200", rating: 4.5, inStock: true, isNewArrival: true, maxQuantity: 20 },
        { id: 9, name: "Paneer Butter Masala", category: "meals", price: 249, oldPrice: 299, discount: "16% off", unit: "400 g", image: "https://images.unsplash.com/photo-1631452180519-c96fe4bdf330?w=200", rating: 4.6, inStock: true, isFeatured: true, maxQuantity: 20 },
        { id: 10, name: "Spicy Chicken Curry", category: "spicy", price: 299, oldPrice: 349, discount: "14% off", unit: "400 g", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200", rating: 4.7, inStock: true, isBestSelling: true, maxQuantity: 20 },
    ];
}

// Initialize sliders
function initSliders() {
    new Swiper('.heroSwiper', { loop: true, autoplay: { delay: 3000 }, pagination: { el: '.swiper-pagination' }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
    new Swiper('.recentlySwiper', { slidesPerView: 2.5, spaceBetween: 15, breakpoints: { 640: { slidesPerView: 3.5 }, 768: { slidesPerView: 4.5 }, 1024: { slidesPerView: 6.5 } } });
    new Swiper('.subscriptionSwiper', { slidesPerView: 2.5, spaceBetween: 15 });
    new Swiper('.feedbackSwiper', { slidesPerView: 1, spaceBetween: 20, breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }, autoplay: { delay: 4000 } });
}

// Initialize Hero Slider (auto-swipe, loops after 5)
function initHeroSlider() {
    const heroSlides = [
        { title: "Fresh Groceries Delivered", subtitle: "Get up to 40% off on first order", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", cta: "Order Now" },
        { title: "Farm Fresh Vegetables", subtitle: "Direct from farmers to your kitchen", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", cta: "Shop Now" },
        { title: "Organic Fruits Sale", subtitle: "30% off on all organic fruits", bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", cta: "Buy Now" },
        { title: "Fresh Juices & Beverages", subtitle: "Stay healthy with our fresh juices", bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", cta: "Order Now" },
        { title: "Cakes & Desserts", subtitle: "Celebrate with our delicious cakes", bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", cta: "Shop Now" }
    ];
    
    const sliderContainer = document.querySelector('#heroSlider');
    if (sliderContainer) {
        sliderContainer.innerHTML = heroSlides.map((slide, index) => `
            <div class="swiper-slide hero-slide" style="background: ${slide.bg}">
                <div class="hero-content">
                    <h2>${slide.title}</h2>
                    <p>${slide.subtitle}</p>
                    <button class="order-now" onclick="addToCart(${index + 1})">${slide.cta} →</button>
                </div>
            </div>
        `).join('');
    }
    
    const heroSwiper = new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        speed: 1000,
    });
}

// Display offerings
function displayOfferings() {
    const offeringsGrid = document.getElementById('offeringsGrid');
    if (!offeringsGrid) return;
    const currentTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'featured';
    let filtered = products.filter(p => p[currentTab === 'featured' ? 'isFeatured' : currentTab === 'best-selling' ? 'isBestSelling' : 'isNewArrival']);
    const paginated = filtered.slice(0, currentProductPage * productsPerPage);
    offeringsGrid.innerHTML = paginated.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image"><img src="${product.image}" alt="${product.name}">${product.discount ? `<div class="product-badge">${product.discount}</div>` : ''}</div>
            <div class="product-info"><div class="product-name">${product.name}</div><div class="price-section"><span class="current-price">₹${product.price}</span>${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}</div><button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button></div>
        </div>
    `).join('');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.style.display = paginated.length >= filtered.length ? 'none' : 'block';
}

// View product
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (!recentlyViewed.some(p => p.id === productId)) {
            recentlyViewed.unshift(product);
            if (recentlyViewed.length > 10) recentlyViewed.pop();
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
            updateRecentlyViewedDisplay();
        }
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'product.html';
    }
}

// Update recently viewed display
function updateRecentlyViewedDisplay() {
    const recentlyContainer = document.getElementById('recentlyViewed');
    if (recentlyContainer && recentlyViewed.length > 0) {
        recentlyContainer.innerHTML = recentlyViewed.map(product => `
            <div class="swiper-slide">
                <div class="recently-item" onclick="viewProduct(${product.id})">
                    <div class="recently-image"><img src="${product.image}" alt="${product.name}"></div>
                    <div class="recently-name">${product.name}</div>
                    <div class="recently-price">₹${product.price}</div>
                </div>
            </div>
        `).join('');
        if (window.recentlySwiper) window.recentlySwiper.update();
    }
}

// Add to cart with max quantity 20
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > 20) { showNotification(`Maximum ${product.maxQuantity || 20} kg/items allowed!`); return; }
        existingItem.quantity = newQuantity;
    } else {
        if (quantity > 20) { showNotification(`Maximum ${product.maxQuantity || 20} allowed!`); return; }
        cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Update cart UI
function updateCartUI() {
    const cartCounts = document.querySelectorAll('#cartCount, #bottomCartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => { if (el) el.textContent = totalItems; });
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    if (cartItemsList) {
        if (cart.length === 0) cartItemsList.innerHTML = '<div style="text-align:center;padding:40px;">Cart is empty</div>';
        else cartItemsList.innerHTML = cart.map(item => `
            <div style="display:flex;justify-content:space-between;margin-bottom:15px;padding:10px;border-bottom:1px solid #eee;">
                <div><strong>${item.name}</strong><br><small>${item.unit}</small><br><div><button onclick="updateQuantity(${item.id}, -1)">-</button><span style="margin:0 10px;">${item.quantity}</span><button onclick="updateQuantity(${item.id}, 1)">+</button></div></div>
                <div><strong>₹${item.price * item.quantity}</strong><br><button onclick="removeFromCart(${item.id})" style="color:red;">Remove</button></div>
            </div>
        `).join('');
    }
    if (cartTotalPrice) cartTotalPrice.textContent = `₹${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) removeFromCart(productId);
        else if (newQuantity > 20) showNotification(`Maximum 20 allowed!`);
        else { item.quantity = newQuantity; localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Item removed');
}

// Display related products
function displayRelatedProducts() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct && document.getElementById('relatedProductsGrid')) {
        const related = products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4);
        document.getElementById('relatedProductsGrid').innerHTML = related.map(p => `
            <div class="product-card" onclick="viewProduct(${p.id})">
                <div class="product-image"><img src="${p.image}"></div>
                <div class="product-info"><div class="product-name">${p.name}</div><div class="current-price">₹${p.price}</div><button onclick="event.stopPropagation(); addToCart(${p.id})">Add</button></div>
            </div>
        `).join('');
        const productDetail = document.getElementById('productDetail');
        if (productDetail) productDetail.innerHTML = `
            <div class="product-detail">
                <div class="product-detail-image"><img src="${selectedProduct.image}" alt="${selectedProduct.name}"></div>
                <div class="product-detail-info"><h1>${selectedProduct.name}</h1><div class="price-section"><span class="current-price">₹${selectedProduct.price}</span>${selectedProduct.oldPrice ? `<span class="old-price">₹${selectedProduct.oldPrice}</span>` : ''}${selectedProduct.discount ? `<span class="discount">${selectedProduct.discount}</span>` : ''}</div><div class="rating">${'★'.repeat(Math.floor(selectedProduct.rating))} (${selectedProduct.rating})</div><div class="quantity-selector"><button onclick="updateProductQuantity(-1)">-</button><span id="productQuantity">1</span><button onclick="updateProductQuantity(1)">+</button></div><button class="add-to-cart" onclick="addToCart(${selectedProduct.id}, parseInt(document.getElementById('productQuantity').innerText))">Add to Cart</button><div class="product-description"><h3>Product Details</h3><p>${selectedProduct.description || 'Fresh and high quality product directly sourced from farmers.'}</p><h3>Nutritional Information</h3><p>${selectedProduct.nutritionalInfo || 'Rich in essential vitamins and minerals'}</p><h3>Shelf Life</h3><p>${selectedProduct.shelfLife || '7-10 days when stored properly'}</p><h3>Origin</h3><p>${selectedProduct.origin || 'Locally sourced from Indian farms'}</p><h3>Maximum Quantity</h3><p>${selectedProduct.maxQuantity || 20} kg/items per order</p></div></div>
            </div>
        `;
    }
}

function updateProductQuantity(change) {
    const qtySpan = document.getElementById('productQuantity');
    let qty = parseInt(qtySpan.innerText);
    qty = Math.max(1, Math.min(20, qty + change));
    qtySpan.innerText = qty;
}

// Display orders
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    if (ordersList && orders.length > 0) {
        ordersList.innerHTML = orders.map(order => `
            <div class="order-card"><div class="order-header"><span>Order #${order.id}</span><span class="order-status">${order.status}</span></div><div class="order-items">${order.items.map(item => `<p>${item.name} x${item.quantity} - ₹${item.price * item.quantity}</p>`).join('')}</div><div class="order-total"><strong>Total: ₹${order.total}</strong></div><button onclick="trackOrder('${order.id}')">Track Order</button></div>
        `).join('');
    } else if (ordersList) ordersList.innerHTML = '<p style="text-align:center;">No orders yet. Start shopping!</p>';
}

// Display full categories
function displayFullCategories() {
    const categories = ['fruits', 'vegetables', 'meals', 'spicy', 'juices', 'beverages', 'cakes', 'icecream', 'snacks', 'dairy'];
    const icons = { fruits: '🍎', vegetables: '🥬', meals: '🍛', spicy: '🌶️', juices: '🧃', beverages: '☕', cakes: '🎂', icecream: '🍦', snacks: '🍿', dairy: '🥛' };
    const grid = document.getElementById('fullCategoryGrid');
    if (grid) grid.innerHTML = categories.map(cat => `<div class="category-card" onclick="filterByCategory('${cat}')"><div class="cat-icon">${icons[cat]}</div><div class="cat-name">${cat.toUpperCase()}</div><div class="cat-count">${products.filter(p => p.category === cat).length} items</div></div>`).join('');
}

function filterByCategory(category) {
    const filtered = products.filter(p => p.category === category);
    const grid = document.getElementById('categoryProductsGrid');
    if (grid) {
        document.getElementById('selectedCategoryName').innerText = `${category.toUpperCase()} (${filtered.length} items)`;
        grid.innerHTML = filtered.map(p => `<div class="product-card" onclick="viewProduct(${p.id})"><div class="product-image"><img src="${p.image}"></div><div class="product-info"><div class="product-name">${p.name}</div><div class="current-price">₹${p.price}</div><button onclick="event.stopPropagation(); addToCart(${p.id})">Add</button></div></div>`).join('');
    }
}

function displayCategoryProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    if (category) filterByCategory(category);
    else filterByCategory('all');
}

// Dark mode
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) toggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

function toggleDarkMode() {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) toggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', function() { document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); currentProductPage = 1; displayOfferings(); }));
    document.getElementById('loadMoreBtn')?.addEventListener('click', () => { currentProductPage++; displayOfferings(); });
    document.getElementById('cartBtn')?.addEventListener('click', () => document.getElementById('cartSidebar').classList.add('open'));
    document.getElementById('bottomCartBtn')?.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('cartSidebar').classList.add('open'); });
    document.querySelectorAll('.close-cart').forEach(btn => btn.addEventListener('click', () => document.getElementById('cartSidebar').classList.remove('open')));
    document.getElementById('overlay')?.addEventListener('click', () => document.getElementById('cartSidebar').classList.remove('open'));
    document.querySelectorAll('.checkout-btn').forEach(btn => btn.addEventListener('click', () => { if (cart.length > 0) { const order = { id: Date.now(), items: [...cart], total: cart.reduce((s, i) => s + (i.price * i.quantity), 0), status: 'Pending', date: new Date() }; orders.unshift(order); localStorage.setItem('orders', JSON.stringify(orders)); cart = []; localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); showNotification('Order placed!'); document.getElementById('cartSidebar').classList.remove('open'); if (window.location.pathname.includes('orders.html')) displayOrders(); } else showNotification('Cart is empty!'); }));
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
    document.getElementById('expandSubscriptionBtn')?.addEventListener('click', () => { const min = document.getElementById('subscriptionMinimized'); const exp = document.getElementById('subscriptionExpanded'); if (min.style.display !== 'none') { min.style.display = 'none'; exp.style.display = 'block'; document.getElementById('expandSubscriptionBtn').innerHTML = '<i class="fas fa-chevron-up"></i>'; } else { min.style.display = 'block'; exp.style.display = 'none'; document.getElementById('expandSubscriptionBtn').innerHTML = '<i class="fas fa-chevron-down"></i>'; } });
    document.getElementById('loginBtnMain')?.addEventListener('click', () => { document.getElementById('accountDetails').style.display = 'block'; alert('Demo: Account details loaded!'); });
    document.querySelectorAll('.order-tab').forEach(tab => tab.addEventListener('click', function() { document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active')); this.classList.add('active'); const status = this.dataset.status; if (status === 'all') displayOrders(); else { const filtered = orders.filter(o => o.status.toLowerCase() === status); document.getElementById('ordersList').innerHTML = filtered.map(order => `<div class="order-card">...</div>`).join(''); } }));
}

function loadPageSpecificContent() {
    if (window.location.pathname.includes('product.html')) displayRelatedProducts();
    if (window.location.pathname.includes('orders.html')) displayOrders();
    if (window.location.pathname.includes('categories.html')) displayCategoryProducts();
    if (window.location.pathname.includes('account.html')) loadAccountData();
}

function loadAccountData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || { name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210' };
    document.getElementById('userName').innerText = userData.name;
    document.getElementById('userEmail').innerText = userData.email;
    document.getElementById('userPhone').innerText = userData.phone;
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = 'position:fixed;bottom:100px;right:20px;background:#4caf50;color:white;padding:12px 20px;border-radius:8px;z-index:10000;animation:slideIn 0.3s';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

window.viewProduct = viewProduct;
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.filterByCategory = filterByCategory;
window.updateProductQuantity = updateProductQuantity;
window.trackOrder = (id) => alert(`Tracking order #${id}`);