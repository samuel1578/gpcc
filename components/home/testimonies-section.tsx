"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { TESTIMONIES } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

export function TestimoniesSection() {
  return (
    <EditableSection
      id="home.testimonies"
      label="Testimonies"
      pageKey="home"
      className="mx-auto w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <div className="w-full rounded-3xl glass-panel" style={{ padding: "clamp(3rem,5vw,6rem) clamp(1.5rem,3vw,4rem)" }}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Stories of Faith</p>
          <EditableText
            id="home.testimonies.title"
            label="Testimonies Heading"
            pageKey="home"
            as="h2"
            className="mt-3 h-section text-ink"
          >
            He still moves in our midst.
          </EditableText>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8" staggerChildren={0.1}>
          {TESTIMONIES.map((t) => (
            <motion.article
              key={t.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              className="group overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  {t.person}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 line-clamp-2 body-lg text-ink-muted">
                  {t.excerpt}
                </p>
                <Link
                  href="/about/testimonies"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-deep)] hover:underline"
                >
                  Read story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </RevealStagger>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/about/testimonies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-deep)] hover:underline"
          >
            View all testimonies <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </EditableSection>
  )
}
