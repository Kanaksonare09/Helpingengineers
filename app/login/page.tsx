"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { LogIn, Mail, Lock, Eye, EyeOff, ShoppingBag, Loader2 } from "lucide-react"
import { login } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password, formData.remember)

      if (result.success) {
        toast({
          title: "Login Successful",
          description: result.message || `Welcome back, ${result.user?.name}!`,
        })

        // Redirect to home page after successful login
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 500)
      } else {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-20 pb-8 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Left Side - Form */}
        <Card className="shadow-xl order-2 lg:order-1 bg-white">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center">
                <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Welcome Back!</h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Sign in to continue shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base text-gray-900 font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 sm:pl-11 h-10 sm:h-11 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password" className="text-sm sm:text-base text-gray-900 font-semibold">Password</Label>
                  <Link href="/register" className="text-xs sm:text-sm text-[#2874F0] hover:underline font-medium whitespace-nowrap">
                    Sign up?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 sm:pl-11 pr-10 sm:pr-11 h-10 sm:h-11 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#2874F0] focus:ring-[#2874F0]"
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-700 font-normal cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-10 sm:h-12 text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#2874F0] hover:underline font-semibold">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Right Side - Info */}
        <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
          <div className="space-y-3 md:space-y-4">
            <Badge className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-[#2874F0] border-0 font-semibold text-xs sm:text-sm">
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Electronics Marketplace
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-gray-900">Continue Your</span>
              <br />
              <span className="text-[#2874F0]">
                Shopping Journey
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
              Access your wishlist, track orders, and enjoy exclusive student benefits.
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-blue-50 border-2 border-blue-100">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#2874F0] mb-1">50K+</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Active Students</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#2874F0] mb-1">10K+</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Products</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#2874F0] mb-1">100+</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Campus Partners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#2874F0] mb-1">4.8/5</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">User Rating</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block p-6 rounded-2xl bg-gray-50 border-2 border-gray-200">
            <p className="text-sm font-semibold mb-2 text-gray-900">Customer Review</p>
            <p className="text-gray-700 text-sm mb-3 italic font-medium">
              "Helping Engineers made it so easy to get everything I needed for my projects. Great discounts and super fast
              delivery!"
            </p>
            <p className="text-sm font-semibold text-gray-900">- Sarah J., Computer Science</p>
          </div>
        </div>
      </div>
    </div>
  )
}
