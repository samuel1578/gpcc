"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PASTOR } from "@/lib/site"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

export function PastorWelcome() {
  const [open, setOpen] = useState(false)

  return (
    <EditableSection
      id="home.pastor-welcome"
      label="Pastor Welcome"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <div
        className="grid w-full items-center rounded-3xl glass-panel-strong md:grid-cols-[minmax(0,clamp(240px,22vw,480px))_1fr] px-6 py-10 lg:p-[clamp(1.5rem,3vw,4.5rem)]"
        style={{ gap: "clamp(2rem,4vw,5rem)" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="/images/media/founders.jpeg"
              alt={PASTOR.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-3 text-center font-display italic text-ink-muted">
            {PASTOR.name}
          </p>
          <p className="text-center font-display italic text-ink-muted">
            Lady Rev Perpetual Ampomah-Boateng
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
        >
          <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>A warm welcome</p>
          <EditableText
            id="home.pastor.title"
            label="Pastor Welcome Heading"
            pageKey="home"
            as="h2"
            className="mt-3 h-section text-ink"
          >
            Step in, be still, be welcomed.
          </EditableText>
          <EditableText
            id="home.pastor.body"
            label="Pastor Welcome Message"
            pageKey="home"
            as="p"
            className="mt-4 lg:mt-5 body-lg text-ink-muted text-pretty leading-[1.5] lg:leading-relaxed"
          >
            {PASTOR.shortMessage}
          </EditableText>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillButton onClick={() => setOpen(true)} variant="primary">
              Read full message
              <ArrowRight className="h-4 w-4" />
            </PillButton>
            <Link
              href="/about/profile-president"
              className="text-sm font-medium text-[var(--accent-deep)] hover:underline"
            >
              View profile →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Fellowship Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className="mt-6 rounded-3xl glass-panel-strong p-6 sm:p-8 lg:p-10 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            <EditableText
              id="home.fellowship.title"
              label="Fellowship Card Title"
              pageKey="home"
              as="h3"
              className="h-section text-ink"
            >
              Fellowship with us at <span className="text-red-600">"PEACE TEMPLE"</span>
            </EditableText>
            <EditableText
              id="home.fellowship.description"
              label="Fellowship Card Description"
              pageKey="home"
              as="p"
              className="body-lg text-ink-muted max-w-2xl mx-auto lg:mx-0"
            >
              Experience worship in our state-of-the-art auditorium, featuring acoustics, lighting, and seating for 2,000+, designed to create an atmosphere where hearts meet the presence of God.
            </EditableText>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <PillButton
                href="https://www.google.com/maps/place/Global+Peace+Christian+Centre+(GPCC)/@5.7173525,-0.2082636,18.49z/data=!4m6!3m5!1s0xfdf9dedc886fb2f:0x4a651067c9806910!8m2!3d5.7171532!4d-0.2076962!16s%2Fg%2F11b6_9jv20?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                View Schedule
              </PillButton>
              <PillButton variant="secondary" className="border border-[var(--border-glass)]">
                View in Maps
              </PillButton>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full lg:w-[40%] shrink-0 rounded-2xl overflow-hidden h-48 sm:h-64 lg:h-72">
            <Image
              src="/images/media/locbanner.png"
              alt="Peace Temple"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 800px"
            />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <PastorMessageModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </EditableSection>
  )
}

function PastorMessageModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-md"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease }}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl glass-panel-strong shadow-[var(--shadow-dramatic)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="max-h-[85vh] overflow-y-auto px-6 py-10 sm:px-10 sm:py-12">
          <p className="label-cap text-[var(--accent-deep)]">Pastoral message</p>
          <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {PASTOR.name}
          </h3>
          <p className="mt-1 font-display italic text-ink-muted">{PASTOR.role}</p>
          <div className="mt-6 space-y-4 body-lg text-ink-muted text-pretty">
            {PASTOR.fullMessage.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.12 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
          <div className="mt-8">
            <PillButton href="/about/profile-president" variant="primary">
              View full profile
              <ArrowRight className="h-4 w-4" />
            </PillButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
