"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { QASection } from "@/components/qa-section"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { toast } from "sonner"
import {
  Sparkles,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Star,
  Search,
  ChevronRight,
  Package,
  Smartphone,
  BookOpen,
  Laptop,
  Headphones,
  HomeIcon,
  Award,
  Heart,
  ShoppingCart,
  Flame,
  Eye,
} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const categories = [
  { name: "Microcontrollers", icon: Laptop, color: "from-blue-600 to-blue-700", href: "/products" },
  { name: "Sensors", icon: Smartphone, color: "from-purple-600 to-purple-700", href: "/products" },
  { name: "Motor Drivers", icon: Package, color: "from-orange-600 to-orange-700", href: "/products" },
  { name: "Displays", icon: Eye, color: "from-green-600 to-green-700", href: "/products" },
  { name: "Power Supply", icon: Zap, color: "from-yellow-600 to-yellow-700", href: "/products" },
  { name: "Communication", icon: Smartphone, color: "from-indigo-600 to-indigo-700", href: "/products" },
]

const heroSlides = [
  {
    id: 1,
    title: "Arduino & ESP32 Boards",
    subtitle: "Starting from ₹699",
    description: "Get started with microcontrollers - Perfect for beginners",
    image: "/1. Microcontrollers & Development Boards/Arduino UNO.png",
    bgGradient: "from-blue-600 to-blue-800",
    buttonText: "Shop Now",
    discount: "Up to 30% OFF",
  },
  {
    id: 2,
    title: "Sensors & Modules",
    subtitle: "Starting from ₹49",
    description: "Temperature, Humidity, Motion & More",
    image: "/2. Sensors/DHT22.png",
    bgGradient: "from-purple-600 to-purple-800",
    buttonText: "Explore",
    discount: "Up to 40% OFF",
  },
  {
    id: 3,
    title: "Motor Drivers & Control",
    subtitle: "Starting from ₹249",
    description: "Build robots and automation projects",
    image: "/3. Motor Drivers, wheels & Power Control/L298N Motor Driver.jpg",
    bgGradient: "from-orange-600 to-orange-800",
    buttonText: "Buy Now",
    discount: "Up to 25% OFF",
  },
  {
    id: 4,
    title: "Displays & Screens",
    subtitle: "Starting from ₹199",
    description: "OLED, LCD, TFT - All types available",
    image: "/5. Displays & Indicators/OLED Display.jpg",
    bgGradient: "from-green-600 to-green-800",
    buttonText: "Shop Now",
    discount: "Up to 35% OFF",
  },
]

const trendingProducts = [
  {
    id: 1,
    name: "Arduino UNO R3",
    price: 899,
    originalPrice: 1299,
    image: "/1. Microcontrollers & Development Boards/Arduino UNO.png",
    rating: 4.8,
    reviews: 234,
    discount: 31,
    trending: true,
    likes: 1289,
  },
  {
    id: 2,
    name: "ESP32 DevKit",
    price: 699,
    originalPrice: 999,
    image: "/1. Microcontrollers & Development Boards/ESP32.png",
    rating: 4.9,
    reviews: 567,
    discount: 30,
    trending: true,
    likes: 2341,
  },
  {
    id: 3,
    name: "DHT22 Sensor",
    price: 249,
    originalPrice: 399,
    image: "/2. Sensors/DHT22.png",
    rating: 4.7,
    reviews: 189,
    discount: 38,
    hot: true,
    likes: 987,
  },
  {
    id: 4,
    name: "L298N Motor Driver",
    price: 249,
    originalPrice: 349,
    image: "/3. Motor Drivers, wheels & Power Control/L298N Motor Driver.jpg",
    rating: 4.9,
    reviews: 423,
    discount: 29,
    trending: true,
    likes: 1567,
  },
]

const features = [
  {
    icon: Zap,
    title: "Fast Shipping",
    description: "Quick delivery of electronics components across India",
  },
  {
    icon: Shield,
    title: "Genuine Products",
    description: "100% authentic components with quality assurance",
  },
  {
    icon: Clock,
    title: "Easy Returns",
    description: "7-day return policy for defective products",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Competitive prices on all electronics components",
  },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image.split('/').pop() || '',
      category: product.category || 'Electronics',
      description: product.name,
      rating: product.rating,
      // @ts-ignore
      folder: product.image.split('/')[1]
    })
    toast.success(`${product.name} added to cart!`)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Slideshow - Flipkart Style */}
      <section className="pt-20 bg-white">
        <div className="container mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    <div className="relative h-full flex items-center">
                      <div className="container mx-auto px-8 md:px-12 grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-4 z-10">
                          <Badge className="bg-yellow-400 text-black border-0 px-3 py-1 font-bold">
                            {slide.discount}
                          </Badge>
                          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            {slide.title}
                          </h2>
                          <p className="text-xl md:text-2xl font-semibold text-blue-100">
                            {slide.subtitle}
                          </p>
                          <p className="text-lg text-blue-50">
                            {slide.description}
                          </p>
                          <Button
                            size="lg"
                            asChild
                            className="bg-white text-[#2874F0] hover:bg-gray-100 font-bold text-lg px-8 h-14 mt-4"
                          >
                            <Link href="/products">{slide.buttonText}</Link>
                          </Button>
                        </div>

                        {/* Right Image */}
                        <div className="relative h-64 md:h-80 hidden md:block">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-full h-full transform transition-transform group-hover:scale-105 duration-500 slideshow-image-container">
                              <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
            <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg" />
          </Carousel>
        </div>
      </section>

      {/* Trending Products Section - Professional Layout */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-[#FF9900] to-[#FF6B00] rounded-lg shadow-md">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span className="text-gray-900">Trending</span> <span className="text-[#2874F0]">Now</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg font-medium">Most popular products this week</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/services">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <Card
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={`group relative overflow-hidden border-0 bg-white cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 rounded-xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                  {product.discount && (
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 font-bold">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  {product.trending && (
                    <Badge className="bg-[#2874F0] text-white border-0 font-semibold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {product.hot && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background/90 hover:bg-background backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background/90 hover:bg-background backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image with cropping container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 product-image-container">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 text-gray-900 group-hover:text-[#2874F0] transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                      className="flex-1 bg-[#FF9900] hover:bg-[#E68A00] text-white font-semibold transition-all shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/services">
                View All Products
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Shop by <span className="text-[#2874F0]">Category</span>
            </h2>
            <p className="text-gray-600 text-lg font-medium">Find exactly what you need for your projects</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link key={category.name} href={category.href}>
                  <Card
                    className={`group relative overflow-hidden border-0 bg-white cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-2 rounded-xl ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-800 group-hover:text-[#2874F0] transition-colors">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Shop <span className="text-[#2874F0]">With Us</span>
            </h2>
            <p className="text-gray-600 text-lg font-medium">Quality components, great prices, fast delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className={`group relative overflow-hidden border-0 bg-white cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 rounded-xl ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-[#2874F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-[#2874F0]/30">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#2874F0] transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Loved by <span className="text-[#2874F0]">Makers</span>
            </h2>
            <p className="text-gray-600 text-lg font-medium">See what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Verma",
                role: "Electronics Hobbyist",
                content:
                  "Best place for Arduino and ESP32 boards! Genuine products at great prices. My IoT projects are now easier than ever!",
                rating: 5,
              },
              {
                name: "Priya Patel",
                role: "Engineering Student",
                content: "Fast delivery and authentic components. Got all my sensors for my college project. Highly recommended!",
                rating: 5,
              },
              {
                name: "Amit Singh",
                role: "Robotics Enthusiast",
                content: "Amazing collection of motor drivers and modules. Quality is top-notch and prices are very competitive!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`group bg-white border-0 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl rounded-xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed font-medium">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2874F0] flex items-center justify-center text-white font-semibold shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-[#2874F0] to-[#1e5bb8]">
            <div className="p-12 md:p-16 text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance text-white">Ready to Build Your Project?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of makers and hobbyists who trust us for quality electronics components, 
                competitive prices, and fast delivery across India.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  variant="secondary"
                  className="w-full sm:w-auto hover:shadow-xl transition-all duration-300 h-12 px-8 font-semibold"
                >
                  <Link href="/register">
                    Create Account
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/20 h-12 px-8 font-semibold"
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Q&A Section */}
      <div id="qa">
        <QASection />
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
