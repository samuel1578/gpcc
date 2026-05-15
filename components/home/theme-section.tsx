"use client"

import { motion } from "framer-motion"
import { THEME_2026 } from "@/lib/site"
import { ease } from "@/lib/motion"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

export function ThemeSection() {
  return (
    <EditableSection
      id="home.theme"
      label="Theme of the Year"
      pageKey="home"
      className="relative w-full overflow-hidden pt-2 pb-5"
    >
      <div className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="gold-glow relative w-full overflow-hidden rounded-3xl glass-panel-dark text-center px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
        >
          <p className="label-cap font-bold text-[var(--accent-gold)]" style={{ fontSize: "clamp(0.875rem,1.3vw,1.35rem)" }}>{THEME_2026.label}</p>

          <EditableText
            id="home.theme.scripture"
            label="Theme Scripture"
            pageKey="home"
            as="h2"
            className="mx-auto mt-3 max-w-3xl font-display font-semibold text-ink-on-dark text-balance"
          >
            <span
              className="block leading-[1.15] lg:leading-[1.15]"
              style={{ fontSize: "clamp(2rem, 3.6vw + 0.6rem, 3.5rem)" }}
            >
              “{THEME_2026.scripture}”
            </span>
          </EditableText>

          <p className="mt-3 font-display italic text-[var(--accent-gold-light)]" style={{ fontSize: "clamp(1rem,1.5vw,1.5rem)" }}>
            — {THEME_2026.reference}
          </p>

          {/* Decorative accent line */}
          <div
            aria-hidden
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-70"
          />
        </motion.div>
      </div>
    </EditableSection>
  )
}
