import ProductList from '../src/home/ProductList'

import { getProducts } from '../src/shared/services/apiService'

const Home = ({ products }) => (
  <ProductList products={products} />
)

Home.title = "Home"

Home.getInitialProps = async () => {
  const { data, included } = await getProducts()

  const products = data.map(product => {
    const imageId = product.relationships.main_image
      ? product.relationships.main_image.data.id
      : false

    return {
      ...product,
      image: imageId
        ? included.main_images.find(img => img.id === imageId).link.href
        : '/welldone-software-logo.png'
    }
  })

  return {
    products
  }
}

export default Home
