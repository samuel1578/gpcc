"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, ChevronDown } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { SERVICE_TIMES, SITE } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"
import { cn } from "@/lib/utils"

import "swiper/css"
import "swiper/css/pagination"

export function ServiceTimes() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <EditableSection
      id="home.service-times"
      label="Service Times"
      pageKey="home"
      as="section"
      className="w-full isolate"
    >
      <PageContainer className="py-5">
        <div id="service-times" className="relative z-10 w-full rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]">
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

          {/* Desktop Grid (sm+) */}
          <RevealStagger
            className="mt-12 hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            staggerChildren={0.07}
          >
            {SERVICE_TIMES.map((s, index) => (
              <ServiceCard
                key={s.day}
                service={s}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </RevealStagger>

          {/* Mobile Swiper (<sm) */}
          <div className="mt-8 block sm:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{
                el: ".service-times-pagination",
                clickable: false,
                bulletClass: "swiper-pagination-bullet !bg-red-600/20 !opacity-100 !h-1.5 !w-1.5 !rounded-full transition-all duration-300",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-red-600 !w-4",
              }}
            >
              {[0, 2].map((startIndex) => (
                <SwiperSlide key={startIndex}>
                  <div className="flex flex-col gap-3">
                    {SERVICE_TIMES.slice(startIndex, startIndex + 2).map((s) => {
                      const index = SERVICE_TIMES.indexOf(s)
                      return (
                        <ServiceCard
                          key={s.day}
                          service={s}
                          index={index}
                          isExpanded={expandedIndex === index}
                          onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        />
                      )
                    })}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Pagination Container — scoped to avoid global .swiper-pagination { bottom: -1cm !important } */}
            <div className="service-times-pagination mt-6 flex justify-center gap-1.5" />
          </div>

          <Reveal delay={0.2} className="relative z-10 mt-10 flex justify-center">
            <a
              href={SITE.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[var(--accent-deep)]/30 bg-white/60 px-5 py-2.5 text-sm font-medium text-[var(--accent-deep)] backdrop-blur transition-colors hover:bg-white/80"
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

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle
}: {
  service: typeof SERVICE_TIMES[number]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, ease }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 22 } }}
      onClick={onToggle}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass-panel-subtle !border-blue-500 p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 h-full",
        isExpanded ? "ring-2 ring-[var(--accent-deep)]/20" : ""
      )}
    >
      {/* Base Content */}
      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-deep)]">
          {service.day}
        </p>
        <p className="mt-3 font-display text-lg sm:text-xl text-ink leading-tight">{service.service}</p>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-muted">{service.time}</p>

        {/* Mobile Indicator */}
        <div className="mt-4 flex justify-center sm:hidden">
          <ChevronDown
            className={cn(
              "h-4 w-4 text-ink-muted transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Desktop Overlay (Hover Reveal) */}
      <div className="absolute inset-0 z-20 hidden items-center justify-center bg-white/95 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
        <p className="text-sm leading-relaxed text-ink">
          {service.description}
        </p>
      </div>

      {/* Mobile Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="sm:hidden"
          >
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              {service.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
