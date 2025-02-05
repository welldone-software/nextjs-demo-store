import Router from 'next/router'

import OrderItemList from '../src/myaccount/OrderItemList'
import { getOrders } from '../src/shared/services/apiService'

export default class MyAccount extends React.Component {
  state = {
    loading: true,
    orders: []
  }

  async componentDidMount() {
    const token = localStorage.getItem('customerToken')

    if (!token) {
      Router.push('/login')
    }

    const { data, included, meta } = await getOrders({ token })

    const orders = data.map(order => {
      // const orderItems = order.relationships.items.data
      // const includedItems = included.items.map(i => i.id === )

      return {
        ...order
      }
    })
    console.log(orders)

    this.setState({
      loading: false,
      orders,
      included,
      meta
    })

    console.log(data)
    console.log(included)
  }

  static title = "My account"

  render() {
    return (
      <OrderItemList {...this.state} />
    )
  }
}
