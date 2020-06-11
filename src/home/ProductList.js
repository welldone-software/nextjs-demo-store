import Link from 'next/link'
import { Card, Image } from 'semantic-ui-react'

const mapProductsToItems = products =>
  products.map(({ id, name, image, description, meta }) => {
    const price = meta.display_price.with_tax.formatted || null

    return {
      childKey: id,
      image,
      header: name,
      meta: price,
      fluid: true,
      href: `/product?id=${id}`
    }
  })

export default ({ products }) => (
  <Card.Group itemsPerRow="3" stackable>
    {mapProductsToItems(products).map(({href, childKey, ...otherProps}) => (
      <Link href={href} key={childKey}>
        <Card {...otherProps}/>
      </Link>
    ))}
  </Card.Group>
)
