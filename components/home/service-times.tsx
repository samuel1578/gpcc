"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import { SERVICE_TIMES, SITE } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"

export function ServiceTimes() {
  return (
    <EditableSection
      id="home.service-times"
      label="Service Times"
      pageKey="home"
      as="section"
      className="w-full"
    >
      <PageContainer className="py-5">
        <div id="service-times" className="w-full rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]">
          <Reveal className="text-center">
            <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Join Us This Week</p>
            <EditableText
              id="home.service.title"
              label="Service Times Heading"
              pageKey="home"
              as="h2"
              className="mt-3 h-section text-ink"
            >
              Doors open. So do hearts.
            </EditableText>
          </Reveal>

          <RevealStagger
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            staggerChildren={0.07}
          >
            {SERVICE_TIMES.map((s) => (
              <motion.div
                key={s.day}
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                className="rounded-2xl glass-panel-subtle !border-blue-500 p-6 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
                  {s.day}
                </p>
                <p className="mt-3 font-display text-xl text-ink">{s.service}</p>
                <p className="mt-1.5 text-sm text-ink-muted">{s.time}</p>
              </motion.div>
            ))}
          </RevealStagger>

          <Reveal delay={0.2} className="mt-10 flex justify-center">
            <a
              href={SITE.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-deep)]/30 bg-white/60 px-5 py-2.5 text-sm font-medium text-[var(--accent-deep)] backdrop-blur transition-colors hover:bg-white/80"
            >
              <MapPin className="h-4 w-4" />
              Get directions
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </PageContainer>
    </EditableSection>
  )
}
