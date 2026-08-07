
const products = [
  {
    id: "nitro",
    name: "Discord Nitro",
    description: "Discord Nitro-alternativ. Exakt period och leveransinformation läggs in innan lansering.",
    price: 99,
    badge: "POPULÄR"
  },
  {
    id: "boost",
    name: "Server Boost",
    description: "Boost-paket för Discord-server. Antal och period väljs i den färdiga butiken.",
    price: 49,
    badge: "SERVER"
  },
  {
    id: "vpn",
    name: "VPN",
    description: "VPN-abonnemang från godkända leverantörer. Fler alternativ kommer senare.",
    price: 59,
    badge: "SÄKERHET"
  }
];

let cart = [];

const grid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

function money(value) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts() {
  grid.innerHTML = products.map(product => `
    <article class="product-card">
      <span class="product-badge">${product.badge}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-meta">
        <strong class="product-price">${money(product.price)}</strong>
        <button class="add-button" data-id="${product.id}">Lägg i varukorgen</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".add-button").forEach(button => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  updateCart();
  showToast(`${product.name} lades i varukorgen`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = money(total);

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Varukorgen är tom.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.quantity} × ${money(item.price)}</small>
      </div>
      <button class="remove-item" data-id="${item.id}">Ta bort</button>
    </div>
  `).join("");

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => removeFromCart(button.dataset.id));
  });
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
  cartPanel.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("discordLogin").addEventListener("click", () => {
  window.location.href = "https://discord.com/oauth2/authorize?client_id=1535222329225904258&response_type=code&redirect_uri=https%3A%2F%2Fcappe2448t45nj.github.io%2FRMT-MARKET-demo%2F&scope=identify";
})

document.getElementById("joinDiscord").addEventListener("click", () => {
  window.open("https://discord.gg/eA5tjx9V8", "_blank");
});

document.getElementById("paypalCheckout").addEventListener("click", () => {
  if (!cart.length) return showToast("Lägg först en produkt i varukorgen.");
  showToast("PayPal Checkout är i demoläge.");
});

renderProducts();
updateCart();
 