"use client"

import { Hammer, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { Reveal } from "@/components/motion/reveal"

export function UnderConstruction({
  title = "We're crafting this page",
  description = "This section is being thoughtfully built. In the meantime, explore the rest of the site or get in touch — we'd love to welcome you.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
      <Reveal className="mx-auto max-w-2xl rounded-3xl glass-panel-strong px-6 py-16 text-center sm:px-12 sm:py-20">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
          <Hammer className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 h-section text-ink">{title}</h2>
        <p className="mt-4 body-lg text-ink-muted text-pretty">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-deep)] px-5 py-2.5 font-medium uppercase tracking-[0.14em] text-white hover:brightness-110"
          >
            Back home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-deep)]/30 px-5 py-2.5 font-medium uppercase tracking-[0.14em] text-[var(--accent-deep)] hover:bg-[var(--accent-deep)]/5"
          >
            Contact us
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/motion"
import { useIsMobile } from "@/hooks/use-mobile"

export function ProfileComingSoonModal({
  name,
  onClose,
}: {
  name?: string
  onClose: () => void
}) {
  const isMobile = useIsMobile()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.body.classList.add("modal-active")
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove("modal-active")
    }
  }, [])

  if (!isMounted) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[100] flex bg-black/50 px-4",
        isMobile ? "items-end" : "items-start justify-center pt-2 sm:pt-4 backdrop-blur-md"
      )}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.96, opacity: 0, y: 16 }}
        animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.97, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease }}
        className={cn(
          "relative w-full max-w-md overflow-hidden shadow-[var(--shadow-dramatic)] flex flex-col items-center text-center px-6 py-10 sm:px-10 sm:py-12",
          isMobile ? "rounded-t-3xl bg-white" : "rounded-3xl glass-panel-strong"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur-sm hover:bg-white shadow-sm transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {isMobile && (
          <div className="relative mb-6 h-12 w-12">
            <Image
              src="/images/hero/logo.png"
              alt="GPCC logo"
              fill
              className="object-contain"
            />
          </div>
        )}

        <p className="label-cap text-[var(--accent-deep)]">Profile in progress</p>
        <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl text-ink">
          {name ? `${name}'s profile is on its way` : "This profile is on its way"}
        </h3>
        <p className="mt-4 body-lg text-ink-muted text-pretty">
          Our pastors are gathering all the required information to set up this profile. Please check back soon.
        </p>
      </motion.div>
    </motion.div>,
    document.body
  )
}
