import { Product } from './product.js';
import { Cart } from './cart.js';

const PRODUCTS = [
  new Product(1, 'Vintage Camera', 149.99, 'Classic vintage camera for capturing every moment.', 'img/pexels-pixabay-37397.jpg'),
  new Product(2, 'Leather Journal', 29.99, 'Handcrafted leather journal for thoughts & sketches.', 'img/pexels-pixabay-237436.jpg'),
  new Product(3, 'Fountain Pen', 19.99, 'Elegant fountain pen with smooth ink flow.', 'img/pexels-pixabay-261450.jpg'),
  new Product(4, 'Bluetooth Speaker', 59.95, 'Compact speaker with crystal-clear sound.', 'img/pexels-caio-1279365.jpg'),
  new Product(5, 'Ceramic Mug', 14.50, 'Minimalist ceramic mug for your favorite drink.', 'img/pexels-cottonbro-4065905.jpg'),
  new Product(6, 'Desk Lamp', 39.99, 'Adjustable LED desk lamp with dimmable light.', 'img/pexels-steve-920312.jpg'),
  new Product(7, 'Wool Blanket', 89.00, 'Warm, cozy wool blanket for chilly evenings.', 'img/pexels-leah-newhouse-50725-1561321.jpg'),
  new Product(8, 'Backpack', 74.99, 'Durable canvas backpack for daily use.', 'img/pexels-ozgomz-868097.jpg'),
  new Product(9, 'Scented Candle', 22.99, 'Relaxing lavender-scented candle.', 'img/pexels-castorlystock-3654619.jpg'),
  new Product(10, 'Wireless Earbuds', 129.95, 'Noise-canceling earbuds with long battery life.', 'img/pexels-zeleboba-33022724.jpg'),
  new Product(11, 'Portable Charger', 39.99, 'Fast-charging power bank for your devices.', 'img/pexels-wutthichai-charoenburi-553075115-19810744.jpg'),
  new Product(12, 'Smart Watch', 179.99, 'Track your fitness and notifications with ease.', 'img/pexels-vedant-sharma-146194-440320.jpg'),
  new Product(13, 'Yoga Mat', 34.99, 'Non-slip mat for your daily practice.', 'img/pexels-mikhail-nilov-6740756.jpg'),
  new Product(14, 'Instant Camera', 99.99, 'Snap and print photos in seconds.', 'img/pexels-fotios-photos-2508735.jpg'),
  new Product(15, 'Puzzle Set', 17.99, '1000-piece scenic puzzle for relaxing evenings.', 'img/pexels-karolina-grabowska-6633415.jpg'),
  new Product(16, 'Cookbook', 27.95, 'Explore global recipes in this beautifully illustrated book.', 'img/pexels-anthonyshkraba-production-8902114.jpg'),
  new Product(17, 'Travel Tumbler', 21.99, 'Insulated tumbler that keeps drinks hot or cold.', 'img/pexels-fotios-photos-1509563.jpg'),
  new Product(18, 'Gaming Mouse', 49.99, 'Ergonomic mouse with customizable buttons.', 'img/pexels-johnpet-2115256.jpg'),
];

const cart = new Cart(PRODUCTS);

function updateCartCount() {
  const c = document.getElementById('cart-count');
  if (c) c.textContent = cart.count;
}

function renderProducts() {
  const list = document.getElementById('product-list');
  if (!list) return;
  list.innerHTML = '';

  PRODUCTS.forEach(p => {
    const article = document.createElement('article');
    article.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" width="300" height="200">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>${p.formattedPrice()}</p>
      <button aria-label="Add ${p.name} to cart" data-id="${p.id}">Add to Cart</button>
    `;
    list.appendChild(article);

    article.querySelector('button').addEventListener('click', () => {
      cart.add(p);
      updateCartCount();
  
      if (document.getElementById('cart-items')) {
        renderCartItems();
      }
    });
  });
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const summary   = document.getElementById('cart-summary');
  if (!container || !summary) return;

  container.innerHTML = '';
  summary.innerHTML   = '';

  if (cart.count === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}"
           alt="${item.name}">
      <div class="details">
        <h3>${item.name}</h3>
        <p class="price">${item.formattedPrice()}</p>
        <button data-id="${item.id}">Remove from Cart</button>
      </div>
      <p class="description">${item.description}</p>
    `;
    container.appendChild(div);
  });

  summary.innerHTML = `
    <h3>Total: $${cart.total.toFixed(2)}</h3>
    <p>Items: ${cart.items.map(i => i.name).join(', ')}</p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();   

  if (document.getElementById('cart-items')) {
    renderCartItems();


    document.getElementById('cart-items').addEventListener('click', e => {
      if (e.target.matches('button[data-id]')) {
        const id = Number(e.target.dataset.id);
        cart.remove(id);
        renderCartItems();
        updateCartCount();
      }
    });
  }
});
