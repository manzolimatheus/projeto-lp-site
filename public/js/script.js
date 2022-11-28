const addToCart = () => {
  const cart = [];

  const product = {
    name: 'Bank Agent',
    price: 1200,
  };

  // Add product to cart
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.replace('cart.html');
};

const removeItem = () => {
  localStorage.removeItem('cart');
  location.reload();
};

const renderCart = () => {
  const cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
  const cartItemsEl = document.querySelector('.cart-items');

  if (cart.length < 1) {
    cartItemsEl.innerHTML = `
    <p>Nenhum item no carrinho</p>
    <div class="mt-2">
        <h1>Sugerido</h1>
        <div class="grid mt-2">
            <img src="./public/img/logo.gif" alt="logo" width="200">
            <div>
                <h3>Bank Agent</h3>
                <p>R$1200</p>
                <button class="container" onclick="addToCart()">Adicionar ao carrinho</button>
            </div>
        </div>
    </div>
    `;
    return;
  }

  // Render cart
  cartItemsEl.innerHTML = cart
    .map((item) => {
      return `
        <br>
        <div class="container grid mt-2">
            <img src="./public/img/logo.gif" alt="logo" width="200">
            <div>
                <h3>${item.name}</h3>
                <p>R$ ${item.price}</p>
                <button class="container" style="width: fit-content" onclick="removeItem()">Remover</button>
            </div>
        </div>
        <br>
        <h3>Cupom de desconto</h3>
        <input type="text" placeholder="Digite o cupom" class="disccount-box">
        <button class="container" style="width: fit-content; margin-left: 2%;" onclick="applyDisccount()">Aplicar cupom</button>
        <br><br>
        <button class="container" onclick="finishPurchase()">Finalizar compra</button>
        `;
    })
    .join('');
};

const applyDisccount = () => {
  const coupon = document.querySelector('.disccount-box').value;
  const cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

  if (cart.length < 1) {
    alert('Não há itens no carrinho');
    return;
  }

  if (coupon == 'AGENT500') {
    cart[0].price = cart[0].price = 500;
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Cupom aplicado com sucesso!');
    renderCart();
    return;
  }

  alert('Cupom inválido!');
};

const finishPurchase = () => {
  alert('Compra finalizada com sucesso!');
  localStorage.removeItem('cart');
  location.replace('index.html');
};
