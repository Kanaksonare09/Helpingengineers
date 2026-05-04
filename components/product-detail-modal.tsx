"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Eye, ShoppingCart, Heart, Share2, TrendingUp, Package, Zap, Shield } from "lucide-react"
import Image from "next/image"

interface ProductDetailModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart?: () => void
}

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [views, setViews] = useState(0)
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    if (isOpen && product) {
      // Generate realistic view count based on product name hash
      const hash = product.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
      const baseViews = 150 + (hash % 500)
      
      // Increment views when modal opens
      const savedViews = parseInt(localStorage.getItem(`views_${product.name}`) || baseViews.toString())
      const newViews = savedViews + 1
      localStorage.setItem(`views_${product.name}`, newViews.toString())
      setViews(newViews)
    }
  }, [isOpen, product])

  if (!product) return null

  const specifications = [
    { label: "Category", value: product.category || "Electronics" },
    { label: "Brand", value: "Original" },
    { label: "Availability", value: "In Stock" },
    { label: "SKU", value: `SKU-${Math.floor(Math.random() * 10000)}` }
  ]

  const features = [
    "✓ Genuine Product",
    "✓ Fast Delivery",
    "✓ Quality Assured",
    "✓ Technical Support"
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Product Details</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border-2 border-gray-200 product-image-container">
              {product.folder ? (
                <Image
                  src={`/${product.folder}/${product.image}`}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Live Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Card className="p-3 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#2874F0]" />
                  <div>
                    <p className="text-xs text-gray-600">Live Views</p>
                    <p className="text-xl font-bold text-[#2874F0]">{views}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-3 bg-gradient-to-br from-green-50 to-white border-2 border-green-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Popularity</p>
                    <p className="text-xl font-bold text-green-600">#{Math.floor(views / 10)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            <div>
              <Badge className="bg-[#2874F0] text-white mb-2 border-0 font-semibold">
                {product.category}
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{product.rating || 4.5}</span>
                </div>
                <span className="text-gray-600">({product.reviews || 234} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-gray-800 leading-relaxed mb-4 font-medium">
                {product.description || "High-quality electronics component perfect for your DIY projects, robotics, and IoT applications. Reliable performance and excellent compatibility."}
              </p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-[#2874F0]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-800 font-medium">Inclusive of all taxes</p>
            </div>

            {/* Specifications */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Specifications</h4>
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                {specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700 font-medium">{spec.label}</span>
                    <span className="font-semibold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Key Features</h4>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Shield className="w-4 h-4 text-[#2874F0]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-[#FF9900] hover:bg-[#E68A00] text-white font-semibold h-12"
                onClick={() => {
                  onAddToCart?.()
                  onClose()
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:bg-gray-50"
                onClick={() => setIsInWishlist(!isInWishlist)}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`}>{children}</div>
}
