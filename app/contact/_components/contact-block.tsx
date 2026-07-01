"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { GlassPanel } from "@/components/ui/glass-panel"
import { SITE, SERVICE_TIMES } from "@/lib/site"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowUpRight, Loader2, AlertCircle } from "lucide-react"
import { submitFeedback } from "@/lib/actions/feedback"

export function ContactBlock() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedbackType, setFeedbackType] = useState("")

  const placeholderMap: Record<string, string> = {
    "General Feedback": "Share your overall impressions, suggestions, or experiences with the church...",
    "Prayer Request": "Please share your prayer request or what spiritual support you need...",
    "Testimony / Thanksgiving": "Write your testimony or thanksgiving here...",
    "Service Experience": "Describe your experience with our services, including any comments about ushers, music, or sermons...",
    "Technical / Media Feedback": "Share any issues or ideas about livestreams, website, sound, or projection...",
    "Volunteer / Join a Department": "Tell us about your interest in serving and which ministry you'd like to join...",
    "Pastoral Counseling Request": "Describe what spiritual or emotional guidance you're seeking...",
    "Event Inquiry / Registration Help": "Ask your questions about church programs or conferences...",
    "Partnership / Donations": "Share your thoughts on sponsorship, donations, or financial partnership...",
    "Facilities & Logistics": "Comment on seating, parking, or the church environment...",
  }

  const currentPlaceholder = placeholderMap[feedbackType] || "Share your thoughts, suggestions, or experiences..."

  return (
    <section className="relative py-24 md:py-32">
      {/* subtle ambient background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Form panel */}
        <Reveal>
          <GlassPanel className="relative overflow-hidden p-8 md:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-5 py-16 text-center"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Message received</h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. A member of our pastoral team will be in touch within 48 hours.
                  </p>
                  <PillButton variant="ghost" size="sm" onClick={() => setSubmitted(false)}>
                    Send another message
                  </PillButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setError(null)
                    setSubmitting(true)

                    const formData = new FormData(e.currentTarget)
                    const data = {
                      name: formData.get("name") as string,
                      email: formData.get("email") as string,
                      feedback_type: formData.get("feedback_type") as string,
                      message: formData.get("message") as string,
                    }

                    const result = await submitFeedback(data)

                    if (result.success) {
                      setSubmitted(true)
                    } else {
                      setError(result.message)
                    }
                    setSubmitting(false)
                  }}
                  className="relative flex flex-col gap-6"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      Get in touch
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                      Send us a message
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Fill in the form below and our team will respond as soon as possible.
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-600 ring-1 ring-red-500/20"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      <p>{error}</p>
                    </motion.div>
                  )}

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Your Name" name="name" required />
                    <Field label="Email Address" name="email" type="email" required />
                  </div>
                  <Field
                    label="Feedback Type"
                    name="feedback_type"
                    required
                    select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    options={[
                      { value: "", label: "Select a feedback type" },
                      { value: "General Feedback", label: "General Feedback – For overall impressions, suggestions, or experiences with the church." },
                      { value: "Prayer Request", label: "Prayer Request – For members need prayer or spiritual support." },
                      { value: "Testimony / Thanksgiving", label: "Testimony / Thanksgiving – To share what God has done or give praise reports." },
                      { value: "Service Experience", label: "Service Experience – Comments about Sunday or midweek services, ushers, music, or sermons." },
                      { value: "Technical / Media Feedback", label: "Technical / Media Feedback – Issues or ideas about livestreams, website, sound, or projection." },
                      { value: "Volunteer / Join a Department", label: "Volunteer / Join a Department – Want to serve in a ministry (choir, ushering, media, etc.)" },
                      { value: "Pastoral Counseling Request", label: "Pastoral Counseling Request – For members seeking spiritual or emotional guidance." },
                      { value: "Event Inquiry / Registration Help", label: "Event Inquiry / Registration Help – For questions about church programs or conferences." },
                      { value: "Partnership / Donations", label: "Partnership / Donations – For sponsors, donors, or financial partnership feedback." },
                      { value: "Facilities & Logistics", label: "Facilities & Logistics – Comments about seating, parking, or the church environment." },
                    ]}
                  />
                  <Field
                    label="Your Feedback"
                    name="message"
                    textarea
                    required
                    rows={6}
                    placeholder={currentPlaceholder}
                  />

                  <div className="pt-2">
                    <PillButton
                      type="submit"
                      disabled={submitting}
                      icon={submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                      className="w-full justify-center md:w-auto"
                    >
                      {submitting ? "Sending..." : "Send message"}
                    </PillButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassPanel>
        </Reveal>

        {/* Info column */}
        <div className="flex flex-col gap-5">
          <Reveal delay={0.05}>
            <GlassPanel className="divide-y divide-border/60 p-2">
              <InfoRow icon={MapPin} title="Visit us" lines={[SITE.contact.address]} />
              <InfoRow icon={Phone} title="Call us" lines={[...SITE.contact.phones]} />
              <InfoRow icon={Mail} title="Email" lines={[SITE.contact.email]} />
              <InfoRow
                icon={Clock}
                title="Service times"
                lines={SERVICE_TIMES.map((s) => `${s.service} — ${s.day}, ${s.time}`)}
              />
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="group flex items-center justify-between rounded-3xl border border-border/60 bg-card px-6 py-5 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/5"
            >
              <span>Prefer email? Reach us directly</span>
              <ArrowUpRight className="size-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
  select,
  options,
  value,
  onChange,
  rows = 5,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
  required?: boolean
  select?: boolean
  options?: { value: string; label: string }[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  rows?: number
  placeholder?: string
}) {
  const baseCls =
    "w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
      <span>
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {select ? (
        <select
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={baseCls}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={baseCls}
        />
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
    <div className="flex gap-4 p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <div className="flex-1 pt-0.5">
        <h3 className="text-sm font-semibold">{title}</h3>
        <ul className="mt-1 flex flex-col gap-0.5 text-sm text-muted-foreground">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}