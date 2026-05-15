"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

const tiles = [
  { label: "Sunday Worship", aspect: "aspect-[4/5]" },
  { label: "Bible Teaching", aspect: "aspect-[4/3]" },
  { label: "Youth Encounter", aspect: "aspect-[4/3]" },
  { label: "Praise & Worship", aspect: "aspect-[4/5]" },
  { label: "Community Outreach", aspect: "aspect-[4/3]" },
  { label: "Fellowship Hour", aspect: "aspect-[4/4]" },
] as const

export function GallerySection() {
  return (
    <EditableSection
      id="home.gallery"
      label="Gallery"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Our Community</p>
        <EditableText
          id="home.gallery.title"
          label="Gallery Heading"
          pageKey="home"
          as="h2"
          className="mt-3 h-section text-ink"
        >
          A life shared, a faith lived.
        </EditableText>
      </Reveal>

      {/* Desktop / tablet — masonry-ish grid */}
      <RevealStagger
        className="mt-12 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        staggerChildren={0.06}
      >
        {tiles.map((t, i) => (
          <motion.div
            key={t.label + i}
            variants={fadeUp}
            transition={{ duration: 0.5, ease }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
          >
            {t.label === "Sunday Worship" ? (
              <div className={`relative ${t.aspect}`}>
                <Image
                  src="/images/gallery/sunday-6.jpg"
                  alt="Sunday Worship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : t.label === "Bible Teaching" ? (
              <div className={`relative ${t.aspect}`}>
                <Image
                  src="/images/gallery/gallery3.jpg"
                  alt="Bible Teaching"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <ImagePlaceholder label={t.label} aspect={t.aspect} rounded="rounded-2xl" />
            )}
          </motion.div>
        ))}
      </RevealStagger>

      {/* Mobile — horizontal snap scroll */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 scrollbar-hide sm:hidden">
        {tiles.map((t, i) => (
          <div key={i} className="w-72 flex-shrink-0 snap-start">
            <ImagePlaceholder label={t.label} aspect="aspect-[3/4]" />
          </div>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-deep)] hover:underline"
        >
          View full gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </EditableSection>
  )
}
