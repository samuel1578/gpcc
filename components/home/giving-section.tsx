"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"
import { SITE } from "@/lib/site"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

export function GivingSection() {
  return (
    <EditableSection
      id="home.giving"
      label="Giving"
      pageKey="home"
      className="mx-auto w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="gold-glow relative w-full overflow-hidden rounded-3xl glass-panel-dark text-center"
        style={{ padding: "clamp(3rem,5vw,6rem) clamp(1.5rem,4vw,5rem)" }}
      >
        <div className="relative mx-auto -mt-4 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          <Image
            src="/images/hero/logo.png"
            alt={SITE.name}
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="mt-4 label-cap text-[var(--accent-gold)]">Partner with us</p>
        <EditableText
          id="home.giving.title"
          label="Giving Heading"
          pageKey="home"
          as="h2"
          className="mt-3 font-display font-semibold text-ink-on-dark text-balance"
        >
          <span style={{ fontSize: "clamp(2rem, 3vw + 0.6rem, 3rem)", lineHeight: 1.15 }}>
            Every gift carries a story. Yours is welcome here.
          </span>
        </EditableText>
        <EditableText
          id="home.giving.body"
          label="Giving Body"
          pageKey="home"
          as="p"
          className="mx-auto mt-6 max-w-xl text-base text-ink-on-dark-muted"
        >
          Your partnership advances the Word, sustains our community, and reaches
          lives across Ghana and beyond.
        </EditableText>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <PillButton href="#" variant="rose" size="lg">
            Give Now
          </PillButton>
          <button
            type="button"
            className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent-gold-light)] hover:text-white"
          >
            Why give?
          </button>
        </div>
      </motion.div>
    </EditableSection>
  )
}
