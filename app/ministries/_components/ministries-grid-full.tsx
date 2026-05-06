"use client"

import { motion } from "framer-motion"
import { Shield, Heart, Zap, Baby, Music, BookOpen } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { EditableSection } from "@/components/design-mode/editable"

const items: { name: string; icon: LucideIcon; description: string }[] = [
  { name: "Men's Ministry", icon: Shield, description: "Building men of faith, strength, and purpose through fellowship and discipleship." },
  { name: "Women's Ministry", icon: Heart, description: "Empowering women through grace, prayer, and a sisterhood that endures." },
  { name: "Youth Ministry", icon: Zap, description: "Raising a fearless generation on fire for God, equipped to lead." },
  { name: "Children's Ministry", icon: Baby, description: "Nurturing young hearts in God's love through worship, story, and play." },
  { name: "Worship & Arts", icon: Music, description: "Leading the congregation into the presence through Spirit-led worship." },
  { name: "Bible Teaching", icon: BookOpen, description: "Mid-week deep dives that help us hear, understand, and bear fruit." },
]

export function MinistriesGridFull() {
  return (
    <EditableSection
      id="ministries.grid"
      label="All Ministries"
      pageKey="ministries"
      className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-20"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="label-cap text-[var(--accent-deep)]">Where we serve</p>
        <h2 className="mt-3 h-section text-ink">Six families. One mission.</h2>
      </Reveal>
      <RevealStagger
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        staggerChildren={0.06}
      >
        {items.map((m) => (
          <motion.article
            key={m.name}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-3xl glass-panel"
          >
            <ImagePlaceholder label={m.name} aspect="aspect-[16/10]" rounded="rounded-none" className="border-0 border-b border-white/35" />
            <div className="p-6 sm:p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-deep)]/10 text-[var(--accent-deep)]">
                <m.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{m.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{m.description}</p>
            </div>
          </motion.article>
        ))}
      </RevealStagger>
    </EditableSection>
  )
}
