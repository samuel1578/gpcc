"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"
import { fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { EditableSection } from "@/components/design-mode/editable"

const events = [
  { name: "Annual Convention 2026", date: "August 14 – 17, 2026", time: "Daily · 9:00 AM", location: "Peace Temple, Accra-North", description: "Three days of worship, teaching, and prophetic ministry with guest speakers from across the body of Christ." },
  { name: "Youth Encounter Weekend", date: "May 9 – 10, 2026", time: "Sat 4 PM · Sun 9 AM", location: "Peace Temple", description: "A weekend designed for the next generation — alive, passionate, Spirit-led." },
  { name: "Community Outreach", date: "June 28, 2026", time: "8:00 AM – 2:00 PM", location: "Ablor Adjei", description: "Serving our neighbours with prayer, food, and friendship." },
  { name: "Couples Retreat", date: "September 12 – 13, 2026", time: "All weekend", location: "TBA", description: "A protected space for married couples to reconnect and be refreshed in Christ." },
]

export function EventsList() {
  return (
    <EditableSection
      id="events.list"
      label="Events List"
      pageKey="events"
      className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 py-20"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="label-cap text-[var(--accent-deep)]">What's coming</p>
        <h2 className="mt-3 h-section text-ink">Mark your calendar.</h2>
      </Reveal>
      <RevealStagger className="mt-12 space-y-6 lg:space-y-8" staggerChildren={0.08}>
        {events.map((e) => (
          <motion.article
            key={e.name}
            variants={fadeUp}
            className="overflow-hidden rounded-3xl glass-panel-strong md:grid md:grid-cols-[minmax(0,320px)_1fr]"
          >
            <ImagePlaceholder label={e.name} aspect="aspect-[4/3]" rounded="rounded-none" className="border-0 md:border-r border-white/35" />
            <div className="p-7 sm:p-9">
              <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{e.name}</h3>
              <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
                <li className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[var(--accent-deep)]" />{e.date}</li>
                <li className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--accent-deep)]" />{e.time}</li>
                <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--accent-deep)]" />{e.location}</li>
              </ul>
              <p className="mt-5 body-lg text-ink-muted">{e.description}</p>
            </div>
          </motion.article>
        ))}
      </RevealStagger>
    </EditableSection>
  )
}
