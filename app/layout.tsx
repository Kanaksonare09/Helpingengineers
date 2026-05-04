import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LiveChat } from "@/components/live-chat"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartContext"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Helping Engineers - Your Campus Shopping Destination",
  description:
    "Exclusive student discounts, EMI options, and lightning-fast delivery on all your favorite products. Built by students, for students.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <LiveChat />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
