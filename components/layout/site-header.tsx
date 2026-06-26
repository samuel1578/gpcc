"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { NAV, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/motion"

export function SiteHeader() {
  const pathname = usePathname() ?? "/"

  if (pathname.startsWith("/admin")) {
    return null
  }

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setAboutOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileOpen])

  // Close about dropdown on outside click / escape
  useEffect(() => {
    if (!aboutOpen) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-about-dropdown]")) setAboutOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAboutOpen(false)
    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [aboutOpen])

  const isHome = pathname === "/"
  const overHero = isHome && !scrolled
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/about" && pathname.startsWith("/about/testimonies")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-300",
        overHero ? "bg-transparent" : "glass-panel-dark-strong",
      )}
    >
      <div className="flex h-[72px] lg:h-[80px] xl:h-[96px] w-full items-center justify-between px-4 sm:px-6 lg:px-10 2xl:px-16">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${SITE.name} home`}
        >
          <Image
            src="/images/hero/logo.png"
            alt={`${SITE.name} Logo`}
            width={96}
            height={96}
            className="h-[clamp(52px,4.5vw,60px)] object-contain 2xl:h-[clamp(44px,6vw,96px)]"
            style={{ width: "auto" }}
          />
          <span
            className={cn(
              "hidden truncate text-sm lg:text-lg xl:text-2xl 2xl:text-3xl font-display font-semibold sm:inline-block",
              overHero ? "text-slate-900" : "text-white",
            )}
            style={{ letterSpacing: "-0.02em" }}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex 2xl:gap-3" aria-label="Primary">
          {NAV.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="relative" data-about-dropdown>
                  <button
                    type="button"
                    onClick={() => setAboutOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={aboutOpen}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-2 text-[12px] lg:text-[13px] xl:text-[13px] 2xl:text-[clamp(15px,1.4vw,22px)] xl:px-2 2xl:px-[clamp(0.75rem,1.2vw,2rem)] font-medium uppercase tracking-[0.12em] xl:tracking-[0.1em] 2xl:tracking-[0.16em] transition-colors",
                      isActive("/about")
                        ? "text-red-600"
                        : overHero ? "text-slate-800 hover:text-slate-900" : "text-white/85 hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        aboutOpen && "rotate-180",
                      )}
                    />
                    {isActive("/about") && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-red-600"
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl glass-panel-dark p-2 shadow-[var(--shadow-elevated)]"
                      >
                        <ul>
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                                  isActive(c.href)
                                    ? "bg-white/10 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white",
                                )}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-[12px] lg:text-[13px] xl:text-[13px] 2xl:text-[clamp(15px,1.4vw,22px)] xl:px-2 2xl:px-[clamp(0.75rem,1.2vw,2rem)] font-medium uppercase tracking-[0.12em] xl:tracking-[0.1em] 2xl:tracking-[0.16em] transition-colors",
                  isActive(item.href)
                    ? "text-red-600"
                    : overHero ? "text-slate-800 hover:text-slate-900" : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-red-600"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur lg:hidden",
            overHero ? "border-slate-400/30 bg-white/20 text-slate-900" : "border-white/20 bg-white/10 text-white"
          )}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-[min(86vw,380px)] flex-col glass-panel-dark text-white"
            >
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/hero/logo.png"
                    alt={`${SITE.name} Logo`}
                    width={56}
                    height={56}
                    className="h-14 w-auto object-contain"
                  />
                  <span className="font-display text-xl font-semibold text-white">
                    {SITE.shortName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile">
                <ul className="space-y-1">
                  {NAV.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <details className="group rounded-xl">
                          <summary
                            className={cn(
                              "flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.16em]",
                              isActive("/about")
                                ? "text-red-600"
                                : "text-white/85",
                            )}
                          >
                            {item.label}
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                          </summary>
                          <ul className="ml-2 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-sm",
                                    isActive(c.href)
                                      ? "bg-white/10 text-white"
                                      : "text-white/75 hover:bg-white/10 hover:text-white",
                                  )}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.16em]",
                            isActive(item.href)
                              ? "bg-white/10 text-white"
                              : "text-white/85 hover:bg-white/10",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-white/10 px-6 py-4 text-xs text-white/60">
                <p>{SITE.contact.phones[0]}</p>
                <p>{SITE.contact.email}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
