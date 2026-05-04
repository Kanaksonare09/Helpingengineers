"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Product {
  name: string
  image: string
  price: number
  rating: number
  description: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productName: string) => void
  updateQuantity: (productName: string, quantity: number) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productName: string) => boolean
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedWishlist = localStorage.getItem("wishlist")
    
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name)
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productName: string) => {
    setCart((prev) => prev.filter((item) => item.name !== productName))
  }

  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productName)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName ? { ...item, quantity } : item
      )
    )
  }

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const existing = prev.find((item) => item.name === product.name)
      if (existing) {
        return prev.filter((item) => item.name !== product.name)
      }
      return [...prev, product]
    })
  }

  const isInWishlist = (productName: string) => {
    return wishlist.some((item) => item.name === productName)
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
