"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { MINISTRIES } from "@/lib/site"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"
import { MinistriesScroll } from "@/components/home/ministries-scroll"

export function MinistriesGrid() {
  return (
    <EditableSection
      id="home.ministries"
      label="Ministries"
      pageKey="home"
      className="w-full"
    >
      {/* 1. DESKTOP, TABLET & MOBILE CAROUSEL */}
      <div className="block py-5">
        <MinistriesScroll />
      </div>

      {/* 2. DECOMMISSIONED TABLET STATIC GRID (md to lg) */}
      <PageContainer className="hidden">
        <div className="grid grid-cols-2 gap-6">
          {MINISTRIES.map((ministry) => (
            <motion.article
              key={ministry.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease }}
              className="relative overflow-hidden rounded-2xl glass-panel-strong border border-white/10"
            >
              <Link
                href="/ministries"
                className="absolute inset-0 z-10"
                aria-label={`Learn more about ${ministry.name}`}
              />
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={ministry.image || "/images/media/men-ministry.webp"}
                  alt={ministry.name}
                  fill
                  className="object-cover object-[center_20%]"
                  unoptimized
                  sizes="50vw"
                />
              </div>
              <div className="relative z-10 px-5 py-5">
                <p className="label-cap text-red-600">{ministry.name}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{ministry.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted line-clamp-2">{ministry.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-deep)]">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease }}
            className="relative col-span-2 overflow-hidden rounded-2xl glass-panel-strong border border-white/10"
          >
            <div className="relative aspect-[21/6] w-full overflow-hidden">
              <Image
                src="/images/media/MINCTA.jpg"
                alt="Find Your Place"
                fill
                className="object-cover object-[center_20%]"
                unoptimized
                sizes="100vw"
              />
            </div>
            <div className="relative z-10 px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="label-cap text-red-600">Find Your Place</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink">Every ministry has a seat with your name on it.</h3>
              </div>
              <div className="flex gap-3 shrink-0">
                <PillButton href="#service-times" variant="primary" size="sm">
                  Visit Us
                </PillButton>
                <PillButton href="/ministries" variant="ghost" size="sm">
                  Explore All
                </PillButton>
              </div>
            </div>
          </motion.article>
        </div>
      </PageContainer>
    </EditableSection >
  )
}
