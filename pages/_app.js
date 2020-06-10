import Head from 'next/head'
import App from 'next/app';
import { Container } from 'semantic-ui-react'
import Header from '../components/Header'

class MyApp extends App {

  static async getInitialProps({ Component, ...otherProps }) {
    const pageProps = Component.getInitialProps ?
      await Component.getInitialProps(otherProps) : {};

    return {
      pageProps
    };
  }

  state = {
    token: null,
    cardId: null,
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
    const {Component, pageProps} = this.props;
    const {token} = this.state;
    return (
      <>
        <Head>
          <title>{Component.title}</title>
        </Head>
        <Header token={token} />
        <Container text style={{ paddingTop: '7em' }}>
          <Component {...pageProps}/>
        </Container>
      </>
    )
  }

}

export default MyApp;

