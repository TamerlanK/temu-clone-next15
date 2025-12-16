import { Product } from "@/sanity.types"
import ProductItem from "./ProductItem"

type ProductGridProps = {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <ul
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      role="list"
    >
      {products.map((product) => (
        <li key={product._id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductGrid
