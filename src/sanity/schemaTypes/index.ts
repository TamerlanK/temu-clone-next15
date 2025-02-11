import { type SchemaTypeDefinition } from "sanity"
import { product } from "./schemas/product"
import { productCategory } from "./schemas/product-category"
import { promotionCode } from "./schemas/promotion-code"
import { promotionCampaign } from "./schemas/promotion-campagin"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, productCategory, promotionCode, promotionCampaign],
}
