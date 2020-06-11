import CartItemList from '../src/cart/CartItemList'
import CartSummary from '../src/cart/CartSummary'

import {
  getCartItems,
  removeFromCart,
  checkoutCart,
  payForOrder
} from '../src/shared/services/apiService'

export default class Cart extends React.Component {
  state = {
    items: [],
    loading: true,
    completed: false
  }

  async componentDidMount() {
    const cartId = await localStorage.getItem('mcart')
    const { data, meta } = await getCartItems({ cartId })

    this.setState({
      items: data,
      meta,
      cartId,
      loading: false
    })
  }

  _handleCheckout = async data => {
    const cartId = await localStorage.getItem('mcart')
    const customerId = localStorage.getItem('mcustomer')

    const {
      id: token,
      email,
      card: {
        name,
        address_line1: line_1,
        address_city: city,
        address_country: country,
        address_state: county,
        address_zip: postcode
      }
    } = data

    const customer = customerId ? customerId : { name, email }

    const address = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1],
      line_1,
      city,
      county,
      country,
      postcode
    }

    try {
      const {
        data: { id }
      } = await checkoutCart({ cartId, customer, address })
      await payForOrder({ orderId: id, token, email })

      this.setState({
        completed: true
      })
    } catch (e) {
      console.log(e)
    }
  }

  _handleRemoveFromCart = async productId => {
    const { items, cartId } = this.state
    const { data, meta } = await removeFromCart({ productId, cartId })

    this.setState({
      items: data,
      meta
    })
  }

  static title = "Cart"

  render() {
    const { meta, ...rest } = this.state
    const { loading } = rest

    return (
      <>
        <CartItemList {...rest} removeFromCart={this._handleRemoveFromCart} />
        {!loading && !rest.completed && (
          <CartSummary {...meta} handleCheckout={this._handleCheckout} />
        )}
      </>
    )
  }
}
