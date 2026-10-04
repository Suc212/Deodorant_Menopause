import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Deos",
  description: "Order Deos natural internal freshness support from Korretdeals."
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



