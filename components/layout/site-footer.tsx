"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Youtube, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { NAV, SITE } from "@/lib/site"
import { ease } from "@/lib/motion"

const quickLinks = NAV.filter((n) => !n.children).slice(0, 6)

export function SiteFooter() {
  return (
    <footer className="relative mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className="glass-panel-dark"
      >
        <div className="mx-auto grid w-full max-w-[1400px] 2xl:max-w-[min(92vw,2200px)] gap-12 px-6 py-16 sm:px-8 md:grid-cols-3 lg:gap-16 lg:px-12 2xl:px-16 lg:py-20">
          {/* Identity + contact */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white/10">
                <Image
                  src="/images/hero/logo.png"
                  alt={`${SITE.name} Logo`}
                  fill
                  className="object-contain p-1.5"
                />
              </div>
              <span className="font-display text-2xl font-semibold text-white">
                {SITE.shortName}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--accent-gold-light)]" />
                <span>{SITE.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-[var(--accent-gold-light)]" />
                <span>{SITE.contact.phones.join(" · ")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-[var(--accent-gold-light)]" />
                <a href={`mailto:${SITE.contact.email}`} className="hover:text-white">
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm text-white/65">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about/who-we-are" className="hover:text-white">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="hover:text-white">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Stay in touch</h3>
            <p className="mt-5 text-sm text-white/65">
              Follow us — devotionals, sermons, and event reminders.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon href={SITE.social.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.whatsapp} label="WhatsApp Channel">
                <MessageCircle className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube">
                <Youtube className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-[1400px] 2xl:max-w-[min(92vw,2200px)] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/45 sm:flex-row sm:px-8 lg:px-12 2xl:px-16">
            <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <p className="font-display italic text-white/55">
              Hear the Word, Understand It, Bear Fruit a Hundredfold.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-[var(--accent-gold-light)] hover:text-[var(--accent-gold-light)]"
    >
      {children}
    </a>
  )
}
