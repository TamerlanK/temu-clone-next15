"use client"

import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import { ShoppingCart, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo } from "react"
import { useShallow } from "zustand/shallow"

const Cart = () => {
  const {
    syncWithUser,
    setLoaded,
    isOpen,
    close,
    getTotalItems,
    items,
    updateQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore(
    useShallow((state) => ({
      syncWithUser: state.syncWithUser,
      setLoaded: state.setLoaded,
      isOpen: state.isOpen,
      close: state.close,
      getTotalItems: state.getTotalItems,
      getTotalPrice: state.getTotalPrice,
      items: state.items,
      updateQuantity: state.updateQuantity,
      removeItem: state.removeItem,
    }))
  )

  useEffect(() => {
    const initializeCart = async () => {
      await useCartStore.persist.rehydrate()
      await syncWithUser()
      setLoaded(true)
    }

    initializeCart()
  }, [])

  const totalPrice = getTotalPrice()

  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)
  }, [totalPrice])

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity backdrop-blur-sm"
          onClick={close}
        />
      )}
      {/* DRAWER */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* CART HEADER */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="size-4" />
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                {getTotalItems()}
              </span>
            </div>
            <button className="p-1 rounded-full text-gray-500 transition-colors hover:bg-gray-200">
              <X className="size-4" onClick={close} />
            </button>
          </div>
          {/* CART ITEMS */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="size-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 text-sm mb-6 text-balance">
                  Looks like you haven&apos;t added any items to your cart yet.
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                  <div
                    key={`cart-item-${item.id}`}
                    className="flex gap-4 p-4 hover:bg-gray-50"
                  >
                    <div className="relative size-20 rounded-lg overflow-hidden flex-shrink-0 border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {formatPrice(item.price)}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Number(e.target.value))
                          }
                          className="border rounded-md px-2 py-1 text-sm bg-white"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option
                              key={`cart-quantity-select-${num}-${item.id}`}
                              value={num}
                            >
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          className="bg-red-500 text-sm hover:bg-red-600 text-white px-2 py-1 rounded-md"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* CART FOOTER */}
          {items.length > 0 && (
            <div className="border-t">
              {/* SHIPPING PROGRESS */}
              {remainingForFreeShipping > 0 ? (
                <div className="p-4 bg-blue-50 border-b">
                  <div className="flex items-center gap-2 text-blue-600 mb-3">
                    <span>🚚</span>
                    <span className="font-medium">
                      Add {formatPrice(remainingForFreeShipping)} for FREE
                      shipping
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border-b">
                  <div className="flex items-center gap-2 text-green-800">
                    <span>✨</span>
                    <span className="font-medium text-balance">
                      FREE Shipping
                    </span>
                  </div>
                </div>
              )}
              {/* ORDER SUMMARY & CHECKOUT */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      {remainingForFreeShipping > 0
                        ? formatPrice(remainingForFreeShipping)
                        : formatPrice(0)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-lg">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <button
                    className="w-full bg-black text-white py-2 rounded-full font-bold text-lg hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[1.02] shadow-xl"
                    onClick={close}
                  >
                    Proceed to Checkout
                  </button>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">🔒</span>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">🔁</span>
                      <span>30-day returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">💳</span>
                      <span>All major payment methods accepted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
