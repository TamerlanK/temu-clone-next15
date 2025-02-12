"use client"

import { formatPrice } from "@/lib/utils"
import { Product } from "@/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { useCartStore } from "@/stores/cart-store"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useShallow } from "zustand/shallow"

type AddToCartButtonProps = {
  product: Product
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem, open } = useCartStore(
    useShallow((state) => ({
      addItem: state.addItem,
      open: state.open,
    }))
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (product.price === undefined || !product.title || !product.image) {
      return
    }
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 600))
    addItem({
      id: product._id,
      title: product.title,
      price: product.price,
      image: urlFor(product.image).url() || "",
      quantity: 1,
    })

    setIsLoading(false)
    open()
  }

  if (!product.price) return null

  return (
    <button
      disabled={isLoading}
      onClick={handleAddToCart}
      className={`w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-full font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[1.02] shadow-xl flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 disabled:hover:from-red-500 disabled:hover:to-red-600`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Adding to Cart...</span>
        </>
      ) : (
        <>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>Add to Cart - {formatPrice(product.price)}</span>
        </>
      )}
    </button>
  )
}

export default AddToCartButton
