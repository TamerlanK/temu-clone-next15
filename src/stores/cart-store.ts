import {
  getOrCreateCart,
  syncCartWithUser,
  updateCartItem,
} from "@/actions/cart-actions"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}

type CartStore = {
  items: CartItem[]
  isLoaded: boolean
  isOpen: boolean
  cartId: string | null
  setStore: (store: Partial<CartStore>) => void
  addItem: (item: CartItem) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  open: () => void
  close: () => void
  setLoaded: (isLoaded: boolean) => void
  syncWithUser: () => Promise<void>
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoaded: false,
      cartId: null,

      setStore: (store) => set(store),
      addItem: async (item) => {
        const { cartId, items } = get()
        if (!cartId) return

        const existingItem = items.find((i) => i.id === item.id)
        const existingQuantity = existingItem ? existingItem.quantity : 0

        const addedItemQuantity = existingQuantity + item.quantity

        const updatedCart = await updateCartItem(cartId, item.id, {
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: addedItemQuantity,
        })

        set((state) => {
          return {
            ...state,
            cartId: updatedCart.id,
            items: [...state.items, { ...item, quantity: addedItemQuantity }],
          }
        })
      },
      removeItem: async (id) => {
        const { cartId } = get()
        if (!cartId) return

        const updatedCart = await updateCartItem(cartId, id, {
          quantity: 0,
        })

        set((state) => {
          return {
            ...state,
            cartId: updatedCart.id,
            items: state.items.filter((item) => item.id !== id),
          }
        })
      },
      updateQuantity: async (id, quantity) => {
        const { cartId } = get()
        if (!cartId) return

        const updatedCart = await updateCartItem(cartId, id, {
          quantity,
        })

        set((state) => {
          return {
            ...state,
            cartId: updatedCart.id,
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }
        })
      },
      syncWithUser: async () => {
        const { cartId } = get()
        if (!cartId) {
          const cart = await getOrCreateCart()
          set((state) => ({ ...state, cartId: cart.id, items: cart.items }))
        }

        const syncedCart = await syncCartWithUser(cartId)

        if (syncedCart) {
          set((state) => ({
            ...state,
            cartId: syncedCart.id,
            items: syncedCart.items,
          }))
        }
      },

      clearCart: async () => {
        set((state) => ({ ...state, items: [] }))
      },
      open: () => {
        set((state) => ({ ...state, isOpen: true }))
      },
      close: () => {
        set((state) => ({ ...state, isOpen: false }))
      },
      setLoaded: (isLoaded) => {
        set((state) => ({ ...state, isLoaded }))
      },
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "cart-store",
      skipHydration: true,
    }
  )
)
