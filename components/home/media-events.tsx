"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Radio, Tv, Calendar, ArrowRight } from "lucide-react"
import { MEDIA_STATIONS } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

const upcoming = [
  { name: "Annual Convention 2026", date: "August 14 – 17 · Accra", slug: "annual-convention-2026" },
  { name: "Youth Encounter Weekend", date: "May 9 – 10 · Peace Temple", slug: "youth-encounter" },
  { name: "Community Outreach", date: "June 28 · Ablor Adjei", slug: "community-outreach" },
]

export function MediaEvents() {
  return (
    <EditableSection
      id="home.media-events"
      label="Media & Events"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <div className="w-full rounded-3xl glass-panel px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]">
        <Reveal className="text-center">
          <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Tune In &amp; Join Us</p>
          <EditableText
            id="home.media.title"
            label="Media Heading"
            pageKey="home"
            as="h2"
            className="mt-3 h-section text-ink"
          >
            Where we broadcast. Where we gather.
          </EditableText>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Stations */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">Broadcast schedule</h3>
            <RevealStagger className="mt-5 space-y-3" staggerChildren={0.06}>
              {MEDIA_STATIONS.map((s) => {
                const isTV = s.name.toLowerCase().includes("tv")
                const Icon = isTV ? Tv : Radio
                return (
                  <motion.div
                    key={s.name}
                    variants={fadeUp}
                    transition={{ duration: 0.45, ease }}
                    whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                    className="flex items-center justify-between gap-4 rounded-xl glass-panel-subtle p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {s.name === "TV3" ? (
                        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                          <img src="/images/media/TV3.webp" alt="TV3" className="h-full w-full object-contain" />
                        </span>
                      ) : s.name === "Spirit FM 96.3" ? (
                        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                          <img src="/images/media/spirit.png" alt="Spirit FM" className="h-full w-full object-contain" />
                        </span>
                      ) : s.name === "Sunny FM 95.1" ? (
                        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                          <img src="/images/media/SUNNY.png" alt="Sunny FM" className="h-full w-full object-contain" />
                        </span>
                      ) : s.name === "ATL FM 100.5" ? (
                        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                          <img src="/images/media/atl.png" alt="ATL FM" className="h-full w-full object-contain" />
                        </span>
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-deep)]/10 text-[var(--accent-deep)]">
                          <Icon className="h-4 w-4" />
                        </span>
                      )}
                      <div>
                        <p className="font-medium text-ink">{s.name}</p>
                        <p className="text-xs text-ink-muted">{s.schedule}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[var(--accent-gold)]/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--accent-deep)]">
                      {s.location}
                    </span>
                  </motion.div>
                )
              })}
            </RevealStagger>
          </div>

          {/* Events */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">Upcoming events</h3>
            <RevealStagger className="mt-5 space-y-3" staggerChildren={0.07}>
              {upcoming.map((e) => (
                <motion.article
                  key={e.slug}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                  className="rounded-xl glass-panel-subtle p-5 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-rose)]/10 text-[var(--accent-rose)]">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="font-display text-lg font-semibold text-ink">
                        {e.name}
                      </p>
                      <p className="text-xs text-ink-muted">{e.date}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </RevealStagger>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-deep)] hover:underline"
            >
              View all events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </EditableSection>
  )
}
