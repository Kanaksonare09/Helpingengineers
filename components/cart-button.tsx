"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import { Trash2, Minus, Plus, Loader2, Check } from "lucide-react"
import { sendOrderNotification } from "@/lib/email"
import { getCurrentUser } from "@/lib/auth"
import { saveOrder } from "@/lib/orders"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CartButton() {
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true)
      const user = await getCurrentUser()
      
      if (!user) {
        toast.error("Please login to place an order")
        router.push("/login")
        return
      }

      const result = await sendOrderNotification({
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone,
        items: cart,
        total: cartTotal,
      })

      if (result.success) {
        // Save order locally for user history
        saveOrder({
          userId: user.id,
          customerName: user.name,
          customerEmail: user.email,
          customerPhone: user.phone,
          items: cart,
          total: cartTotal,
        })

        toast.success("Order placed successfully! Notification sent to admin.")
        setShowSuccess(true)
        clearCart()
      } else {
        toast.error("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("An error occurred during checkout")
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-all hover:scale-110 text-black">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#2874F0] text-white text-[10px] font-bold border-0">
              {cartCount}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-black">
            <ShoppingCart className="h-6 w-6 text-[#2874F0]" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="text-gray-700">
            {cartCount === 0 ? "Your cart is empty" : `${cartCount} item${cartCount === 1 ? '' : 's'} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {showSuccess ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
              <p className="text-gray-600 mb-8">Your order has been received and is being processed. A notification has been sent to the admin.</p>
              <div className="flex flex-col gap-3">
                <Button 
                  className="bg-[#2874F0] hover:bg-[#1e5bb8]"
                  onClick={() => {
                    setShowSuccess(false)
                    router.push("/profile")
                  }}
                >
                  View Order History
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowSuccess(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 opacity-50 mb-4" />
              <p className="text-gray-600">No items in cart yet</p>
              <p className="text-sm text-gray-500 mt-2">Add some products to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex gap-4 border-b border-gray-200 pb-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={`/${item.folder}/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-2 text-black">{item.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#2874F0]">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-gray-300 text-black hover:bg-gray-100"
                      onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold text-black">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-gray-300 text-black hover:bg-gray-100"
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFromCart(item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && !showSuccess && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-black">Total:</span>
                <span className="text-2xl text-[#2874F0]">₹{cartTotal.toFixed(2)}</span>
              </div>
              <Button 
                className="w-full h-12 text-base font-semibold bg-[#2874F0] hover:bg-[#2366d1] text-white"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
