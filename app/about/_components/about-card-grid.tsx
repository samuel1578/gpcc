"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { fadeUp } from "@/lib/motion"
import { RevealStagger } from "@/components/motion/reveal"

const sections = [
  { title: "Who We Are", href: "/about/who-we-are", desc: "Our identity, beliefs, and the heart behind everything we do." },
  { title: "The Leadership", href: "/about/leadership", desc: "Meet the pastoral board guiding the GPCC family." },
  { title: "Eldership & Deacons", href: "/about/eldership-deacons", desc: "The servant-leaders who care for our community." },
  { title: "Community Journey", href: "/about/community-journey", desc: "How we walk with our neighbours, year after year." },
  { title: "Testimonies", href: "/about/testimonies", desc: "Stories of faith, restoration, and divine encounter." },
  { title: "Apostle's Profile", href: "/about/profile-president", desc: "The full profile of Apostle Henry Ampomah-Boateng." },
]

export function AboutCardGrid() {
  return (
    <RevealStagger
      className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      staggerChildren={0.07}
    >
      {sections.map((s) => (
        <motion.div key={s.href} variants={fadeUp}>
          <Link
            href={s.href}
            className="group flex h-full flex-col justify-between rounded-2xl glass-panel p-7 transition-shadow hover:shadow-[var(--shadow-elevated)]"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-deep)]">
              Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      ))}
    </RevealStagger>
  )
}
