"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Reveal } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { GlassPanel } from "@/components/ui/glass-panel"
import { SITE, SERVICE_TIMES } from "@/lib/site"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"

export function ContactBlock() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <GlassPanel className="p-8 md:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-12 text-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 className="size-8" aria-hidden />
                </span>
                <h2 className="text-2xl font-semibold">Message received</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Thank you for reaching out. A member of our pastoral team will be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Send us a message</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill in the form and our team will respond as soon as possible.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Subject" name="subject" />
                <Field label="Message" name="message" textarea required />
                <div className="pt-2">
                  <PillButton type="submit" icon={<Send className="size-4" />}>
                    Send message
                  </PillButton>
                </div>
              </form>
            )}
          </GlassPanel>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.05}>
            <InfoRow icon={MapPin} title="Visit us" lines={[SITE.contact.address]} />
          </Reveal>
          <Reveal delay={0.1}>
            <InfoRow icon={Phone} title="Call us" lines={[...SITE.contact.phones]} />
          </Reveal>
          <Reveal delay={0.15}>
            <InfoRow icon={Mail} title="Email" lines={[SITE.contact.email]} />
          </Reveal>
          <Reveal delay={0.2}>
            <InfoRow
              icon={Clock}
              title="Service times"
              lines={SERVICE_TIMES.map((s) => `${s.service} — ${s.day}, ${s.time}`)}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
}) {
  const baseCls =
    "w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={baseCls} />
      ) : (
        <input name={name} type={type} required={required} className={baseCls} />
      )}
    </label>
  )
}

function InfoRow({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  lines: string[]
}) {
  return (
    <div className="flex gap-4 rounded-3xl border border-border/60 bg-card p-6">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex-1">
        <h3 className="text-base font-semibold">{title}</h3>
        <ul className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
