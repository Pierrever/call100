const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrf = addToCartButtonElement.dataset.csrf;

  const response = await fetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, _csrf: csrf }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    ("Wrong");
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener("click", addToCart);
