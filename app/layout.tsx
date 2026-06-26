import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter, Quantico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageTransition } from "@/components/motion/page-transition"
import { DesignModeProvider } from "@/components/design-mode/design-mode-provider"
import { DesignModeShell } from "@/components/design-mode/design-mode-shell"
import { Toaster } from "@/components/ui/sonner"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "optional",
  preload: true,
})

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quantico",
  display: "optional",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Global Peace Christian Centre",
    template: "%s · Global Peace Christian Centre",
  },
  description:
    "Global Peace Christian Centre (GPCC) — a Bible-Believing, Life-Giving, Charismatic, Pentecostal church. Join our family in worship, community, and growth.",
  keywords: [
    "GPCC",
    "Global Peace Christian Centre",
    "church Accra",
    "Apostle Henry Ampomah-Boateng",
    "Pentecostal church Ghana",
  ],
  generator: "v0.app",
  icons: {
    icon: "/images/hero/logo.png",
    apple: "/images/hero/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1419" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${quantico.variable}`}>
      <body className="font-sans antialiased text-ink">
        <div className="fixed-bg" aria-hidden="true" />
        <DesignModeProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Suspense fallback={null}>
                <PageTransition>{children}</PageTransition>
              </Suspense>
            </main>
            <SiteFooter />
          </div>
          <DesignModeShell />
          <Toaster position="top-right" />
        </DesignModeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
