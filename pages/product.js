import Head from 'next/head'

import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'

import { getProductById } from '../lib/moltin'

const ProductPage = ({ product }) => (
  <>
    <Head>
      <title>{product.name}</title>
    </Head>
    <ProductSummary {...product} />
    <ProductAttributes {...product} />
  </>
)

ProductPage.title = "My account"

ProductPage.getInitialProps = async ({ query: { id } }) => {
  const {
    data,
    included: { main_images }
  } = await getProductById(id)

  const imageId = data.relationships.main_image
    ? data.relationships.main_image.data.id
    : false

  return {
    product: {
      ...data,
      image: imageId
        ? main_images.find(img => img.id === imageId).link.href
        : '/static/moltin-light-hex.svg'
    }
  }
}

export default ProductPage
