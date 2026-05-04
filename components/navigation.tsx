"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, User, LogOut, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartButton } from "@/components/cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { NotificationsButton } from "@/components/notifications-button"
import { getCurrentUser, logout } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [pathname]) // Re-check on route change

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/")
  }

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/feedback", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/98 backdrop-blur-lg shadow-md" : "bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-[#2874F0] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-[#2874F0]/30 transition-all">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-[#2874F0]">
              Helping Engineers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all hover:text-[#2874F0] relative group ${
                  pathname === link.href ? "text-[#2874F0]" : "text-gray-700"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2874F0] transition-all group-hover:w-full ${
                    pathname === link.href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {mounted && (
              <>
                <NotificationsButton />
                <WishlistButton />
                <CartButton />
                
                {user ? (
                  // User is logged in - show account menu
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hover:bg-blue-50 text-black font-semibold gap-2">
                        <User className="h-5 w-5" />
                        {user.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                      <DropdownMenuLabel className="text-black">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem asChild className="text-black hover:bg-blue-50 cursor-pointer">
                        <Link href="/profile">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="text-black hover:bg-blue-50 cursor-pointer">
                        <Link href="/admin/queries">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Manage Queries
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  // User not logged in - show login/register buttons
                  <>
                    <Button variant="ghost" asChild className="hover:bg-blue-50 text-black font-semibold">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#2874F0] hover:bg-[#2366d1] text-white transition-all shadow-lg hover:shadow-blue-500/50 font-semibold"
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:text-[#2874F0] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-around px-4 pb-4 border-b border-gray-200">
              <ThemeToggle />
              {mounted && (
                <>
                  <NotificationsButton />
                  <WishlistButton />
                  <CartButton />
                </>
              )}
            </div>
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:bg-blue-50 ${
                    pathname === link.href ? "text-[#2874F0] bg-blue-50" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-2 border-t border-gray-200">
                {user ? (
                  // User is logged in
                  <>
                    <div className="py-2 px-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">Logged in as</p>
                      <p className="text-sm font-semibold text-black">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white text-black border-gray-300 font-semibold"
                      asChild
                    >
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white text-black border-gray-300 font-semibold"
                      asChild
                    >
                      <Link href="/admin/queries" onClick={() => setIsOpen(false)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Manage Queries
                      </Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50 font-semibold"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  // User not logged in
                  <>
                    <Button variant="outline" asChild className="w-full bg-white text-black border-gray-300 font-semibold">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-[#2874F0] hover:bg-[#2366d1] text-white font-semibold">
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
