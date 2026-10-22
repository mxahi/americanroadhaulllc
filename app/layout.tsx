import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollEffects } from "@/components/ScrollEffects"
import { CarRoad } from "@/components/CarRoad"
import { home, siteUrl } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.title, template: "%s" },
  description: home.lead,
  icons: { icon: "/icon.png" },
  openGraph: { siteName: "American Road Haul LLC", images: [{ url: "/old/2024/09/pexels-209251.jpg" }] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
}

// Runs before paint so the saved (or system) theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t);document.documentElement.classList.add("js")}catch(e){document.documentElement.classList.add("js")}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
        <ScrollEffects />
        <CarRoad />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
