"use client"

import { Heart } from "lucide-react"
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
import { Trash2, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WishlistButton() {
  const { wishlist, toggleWishlist, addToCart } = useCart()
  const { toast } = useToast()
  const wishlistCount = wishlist.length

  const handleAddToCart = (item: any) => {
    addToCart(item)
    toast({
      title: "✓ Moved to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-all hover:scale-110 text-black">
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500 text-white text-[10px] font-bold border-0">
              {wishlistCount}
            </Badge>
          )}
          <span className="sr-only">Wishlist</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2 text-black">
            <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
            Wishlist
          </SheetTitle>
          <SheetDescription className="text-gray-700">
            {wishlistCount === 0 ? "Your wishlist is empty" : `${wishlistCount} item${wishlistCount === 1 ? '' : 's'} in your wishlist`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-400 opacity-50 mb-4" />
              <p className="text-gray-600">No items in wishlist yet</p>
              <p className="text-sm text-gray-500 mt-2">Add products you love to save for later!</p>
            </div>
          ) : (
            wishlist.map((item) => (
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
                      variant="default"
                      size="sm"
                      className="h-8 bg-[#2874F0] hover:bg-[#2366d1] text-white font-semibold"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => toggleWishlist(item)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
