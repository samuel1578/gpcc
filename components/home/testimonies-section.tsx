"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import type { Testimony } from "@/lib/types/database"

interface TestimoniesSectionProps {
  testimonies: Testimony[]
}

export function TestimoniesSection({ testimonies }: TestimoniesSectionProps) {
  if (!testimonies?.length) return null

  return (
    <EditableSection
      id="home.testimonies"
      label="Testimonies"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <div className="w-full rounded-3xl glass-panel px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]">
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
          {testimonies.map((t) => (
            <motion.article
              key={t.id}
              variants={fadeUp}
              transition={{ duration: 0.5, ease }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 22 } }}
              className="group overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {t.cover_image_url ? (
                  <Image
                    src={t.cover_image_url}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                    <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Testimony</p>
                  </div>
                )}
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 line-clamp-2 body-lg text-ink-muted">
                  {t.excerpt}
                </p>
                <Link
                  href={`/about/testimonies?slug=${t.slug}`}
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
