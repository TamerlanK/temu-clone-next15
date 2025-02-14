import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import { getCurrentSession } from "@/actions/auth"
import { SanityLive } from "@/sanity/lib/live"
import HeaderCategorySelector from "@/components/layout/HeaderCategorySelector"
import Cart from "@/components/cart/Cart"

const font = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Temu Clone with Next.js",
    template: "%s | Temu Clone with Next.js",
  },
  description: "A clone of the Temu website built with Next.js",
  keywords: ["temu", "clone", "next.js"],
}

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user } = await getCurrentSession()

  return (
    <html lang="en">
      <body className={`${font.className} antialiased bg-white`}>
        <Header user={user} categorySelector={<HeaderCategorySelector />} />
        {children}
        <Cart />
        <SanityLive />
      </body>
    </html>
  )
}

export default RootLayout
