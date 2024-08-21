import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import "leaflet/dist/leaflet.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 bg-cover min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
