import Head from 'next/head'
import { Container } from 'semantic-ui-react'

import Header from './Header'

class MyApp extends App {

  static async getInitialProps({ ctx, Component: PageComponent }) {
    return ctx.initManager.initPage({ PageComponent });
  }

  componentDidMount() {
    const token = localStorage.getItem('customerToken')

    const cartId = localStorage.getItem('mcart')

    if (!cartId) {
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
      localStorage.setItem('mcart', cartId)
    }

    this.setState({
      token,
      cartId
    })
  }

  render() {
    return (
      <>
        <Head>
          <title>{PageComponent.title}</title>
        </Head>
        <Container text style={{ paddingTop: '7em' }}>
          <PageComponent/>
        </Container>
      </>
    )
  }

}

export default MyApp;

