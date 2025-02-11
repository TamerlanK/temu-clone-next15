import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner"
import ProductGrid from "@/components/product/ProductGrid"
import { getAllProducts } from "@/sanity/lib/client"

const Home = async () => {
  const products = await getAllProducts()

  return (
    <div>
      <SalesCampaignBanner />
      <section>
        <ProductGrid products={products} />
      </section>
    </div>
  )
}

export default Home
