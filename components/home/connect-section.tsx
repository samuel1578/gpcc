"use client"

import { useState, useEffect, useActionState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Youtube, MessageCircle, Mail, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { PageContainer } from "@/components/layout/page-container"
import { SITE } from "@/lib/site"
import { ease } from "@/lib/motion"
import { Reveal } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { subscribeToNewsletter, type NewsletterResponse } from "@/lib/actions/newsletter"

export function ConnectSection() {
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)
  const [feedback, setFeedback] = useState<NewsletterResponse | null>(null)

  useEffect(() => setMounted(true), [])

  const [, formAction, isPending] = useActionState(
    async (_prev: NewsletterResponse | null, formData: FormData) => {
      const result = await subscribeToNewsletter(_prev, formData)
      setFeedback(result)
      if (result.success) {
        setEmail("")
        setTimeout(() => setFeedback(null), 4000)
      }
      return result
    },
    null,
  )

  return (
    <EditableSection
      id="home.connect"
      label="Connect"
      pageKey="home"
      className="w-full"
    >
      <PageContainer className="py-5">
        <div className="overflow-hidden rounded-3xl glass-panel-strong">
          <div className="flex flex-col lg:grid lg:grid-cols-[clamp(600px,75%,1400px)_1fr] lg:min-h-[clamp(440px,48vw,620px)] [@media(min-width:1024px)_and_(max-width:1536px)]:lg:grid-cols-[1.2fr_1fr]">

            {/* Image column */}
            <div className="relative h-[320px] w-full overflow-hidden lg:h-auto lg:min-h-full lg:rounded-l-3xl">
              <Image
                src="/images/media/stay.jpg"
                alt="Community at Global Peace Christian Centre"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={85}
              />
            </div>

            {/* Content column */}
            <div className="flex flex-col justify-center px-6 py-10 lg:p-[clamp(2.75rem,4.5vw,5.5rem)_clamp(1.75rem,3.25vw,4.5rem)]">
              <Reveal className="max-w-2xl">
                <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Stay connected</p>
                <EditableText
                  id="home.connect.title"
                  label="Connect Heading"
                  pageKey="home"
                  as="h2"
                  className="mt-3 h-section text-ink"
                >
                  Don't miss what's next.
                </EditableText>
              </Reveal>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12 [@media(min-width:1024px)_and_(max-width:1536px)]:lg:grid-cols-1 [@media(min-width:1024px)_and_(max-width:1536px)]:lg:gap-8">
                {/* Newsletter */}
                <Reveal>
                  <h3 className="font-display text-2xl font-semibold text-ink">Newsletter</h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    Devotionals, sermons, and event reminders — straight to your inbox.
                  </p>
                  <form action={formAction} className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <label className="relative flex-1">
                      <span className="sr-only">Email</span>
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      {mounted ? (
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            if (feedback) setFeedback(null)
                          }}
                          placeholder="you@example.com"
                          className="w-full rounded-full border border-black/10 bg-white/70 py-3 pl-11 pr-5 text-sm text-ink placeholder:text-ink-muted focus:border-[var(--accent-deep)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--accent-deep)]/20"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="w-full rounded-full border border-black/10 bg-white/70 py-3 pl-11 pr-5 text-sm text-ink placeholder:text-ink-muted"
                        />
                      )}
                    </label>
                    <PillButton type="submit" disabled={isPending} variant="primary">
                      {isPending ? "Subscribing…" : "Sign Up"}
                    </PillButton>
                  </form>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-ink-muted [@media(min-width:1024px)_and_(max-width:1536px)]:normal-case [@media(min-width:1024px)_and_(max-width:1536px)]:tracking-normal">
                    We respect your inbox — unsubscribe anytime.
                  </p>
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3, ease }}
                        className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${feedback.success
                          ? "bg-[var(--accent-emerald)]/15 text-[var(--accent-emerald)]"
                          : "bg-[var(--accent-rose)]/15 text-[var(--accent-rose)]"
                          }`}
                      >
                        {feedback.success ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        {feedback.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>

                {/* WhatsApp + social */}
                <Reveal delay={0.1}>
                  <div className="rounded-2xl glass-panel-subtle p-6 sm:p-8">
                    <h3 className="font-display text-2xl font-semibold text-ink">WhatsApp Channel</h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      Daily encouragement and live updates. Join the family on WhatsApp.
                    </p>
                    <div className="mt-5">
                      <PillButton href={SITE.social.whatsapp} variant="emerald">
                        <MessageCircle className="h-4 w-4" />
                        Join Channel
                      </PillButton>
                    </div>
                    <div className="mt-7 border-t border-black/10 pt-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Follow us</p>
                      <div className="mt-3 flex items-center gap-3">
                        <SocialIcon href={SITE.social.facebook} label="Facebook">
                          <Facebook className="h-4 w-4" />
                        </SocialIcon>
                        <SocialIcon href={SITE.social.youtube} label="YouTube">
                          <Youtube className="h-4 w-4" />
                        </SocialIcon>
                        <SocialIcon href={SITE.social.whatsapp} label="WhatsApp">
                          <MessageCircle className="h-4 w-4" />
                        </SocialIcon>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </EditableSection>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 text-ink-muted transition-colors hover:border-[var(--accent-deep)]/40 hover:text-[var(--accent-deep)]"
    >
      {children}
    </a>
  )
}
