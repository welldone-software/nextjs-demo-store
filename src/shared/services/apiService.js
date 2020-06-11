import products from '../../../mocks/products.json';

const respond = response => {
  return new Promise(resolve => {
    setTimeout( () => resolve(response), 100);
  })
}

export function getProducts() {
  return respond(products);
}

export function getProductById({ productId }) {
  const productResponse = {
    ...products,
    data: products.data.find(product => product.id === productId)
  }

  return respond(productResponse)
}

export function addToCart ({ cartId, productId, quantity }) {
  return respond();
}

export function getCartItems ({ cartId }) {
  return respond();
}

export function removeFromCart ({ productId, cartId }) {
  return respond();
}

export function checkoutCart ({ cartId, customer, address }) {
  return respond();
}

export function payForOrder ({ orderId, token, email }) {
  return respond();
}

export function register ({ email, password, ...rest }) {
  return respond();
}

export function login ({ email, password }) {
  return respond();
}

export function getOrders ({ token }) {
  return respond();
}
