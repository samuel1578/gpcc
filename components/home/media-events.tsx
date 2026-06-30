"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PageContainer } from "@/components/layout/page-container"
import { motion } from "framer-motion"
import { Radio, Tv, Calendar, ArrowRight, MapPin, Sparkles, X } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { MEDIA_STATIONS } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { Dialog, DialogContent, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types/database"
import { format } from "date-fns"

import "swiper/css"
import "swiper/css/pagination"

interface MediaEventsProps {
  events: Event[]
}

export function MediaEvents({ events }: MediaEventsProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string, alt: string } | null>(null)

  // Sort events by start date ascending (upcoming first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  })

  const StationsBlock = (
    <div className="h-full">
      <h3 className="font-display text-2xl font-semibold text-ink border-b border-white/10 pb-3">Broadcast schedule</h3>
      <RevealStagger className="mt-5 space-y-3" staggerChildren={0.06}>
        {MEDIA_STATIONS.map((s) => {
          const isTV = s.name.toLowerCase().includes("tv")
          const Icon = isTV ? Tv : Radio
          return (
            <motion.div
              key={s.name}
              variants={fadeUp}
              transition={{ duration: 0.45, ease }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 22 } }}
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
                  <span className="relative flex h-10 w-16 shrink-0 items-center justify-center rounded-lg overflow-hidden">
                    <Image src="/images/media/atl.png" alt="ATL FM" fill className="object-contain" sizes="64px" quality={85} />
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
  )

  const EventsBlock = (
    <div className="flex flex-col h-full">
      <h3 className="font-display text-2xl font-semibold text-ink border-b border-white/10 pb-3">Featured gatherings</h3>

      {sortedEvents.length === 0 ? (
        <div className="mt-5 flex flex-col items-center justify-center flex-1 py-12 px-6 text-center rounded-2xl border border-dashed border-black/10 bg-black/5">
          <Calendar className="h-8 w-8 text-ink-muted/50 mb-3" />
          <p className="text-sm font-medium text-ink">No upcoming featured events</p>
          <p className="text-xs text-ink-muted mt-1 max-w-xs">
            We are preparing our next special seasons and conventions. Check back soon!
          </p>
        </div>
      ) : (
        <RevealStagger className="mt-5 space-y-4 flex-1" staggerChildren={0.07}>
          {sortedEvents.map((event) => {
            const startDate = event.start_date ? new Date(event.start_date) : null
            const isValidStart = startDate && !isNaN(startDate.getTime())
            const dateString = isValidStart ? format(startDate, "MMMM d, yyyy") : "Date TBD"

            return (
              <Link key={event.id} href={`/events/${event.slug}`}>
                <motion.article
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                  className="group flex flex-col sm:flex-row gap-4 rounded-xl glass-panel-subtle p-4 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/10"
                >
                  {/* Poster Image */}
                  <div
                    onClick={(e) => {
                      if (event.cover_image) {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedImage({ src: event.cover_image, alt: event.title })
                      }
                    }}
                    className={cn(
                      "relative shrink-0 overflow-hidden rounded-lg bg-black/5 border border-black/5 shadow-sm transition-all duration-300",
                      "w-full aspect-video sm:w-20 sm:h-24 sm:aspect-auto",
                      event.cover_image ? "cursor-zoom-in" : "cursor-default"
                    )}
                  >
                    {event.cover_image ? (
                      <img
                        src={event.cover_image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-red-500/10 text-red-600">
                        <Calendar className="h-6 w-6" />
                      </div>
                    )}
                    {event.featured && (
                      <span className="absolute top-1.5 left-1.5 p-1 rounded-full bg-red-600/90 text-white shadow-md">
                        <Sparkles className="h-3 w-3" />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-red-600 px-2 py-0.5 rounded-full bg-red-500/10">
                          {event.event_type === "week_event" ? "Week Event" : "Season Event"}
                        </span>
                        {event.venue && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-ink-muted">
                            <MapPin className="h-3 w-3" /> {event.venue}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-lg font-bold text-ink group-hover:text-red-600 transition-colors line-clamp-1">
                        {event.title}
                      </h4>
                      {event.theme && (
                        <p className="text-xs text-ink-muted italic line-clamp-1 mt-0.5">
                          Theme: "{event.theme}"
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-ink-muted font-medium mt-2 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-red-600/70" />
                      {dateString}
                    </p>
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </RevealStagger>
      )}

      <Link
        href="/events"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-deep)] hover:underline"
      >
        View all events <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )

  return (
    <EditableSection
      id="home.media-events"
      pageKey="home"
      label="Media & Events"
      className="w-full"
    >
      <PageContainer className="py-5">
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

          {/* Desktop Grid (lg+) */}
          <div className="mt-14 hidden lg:grid gap-10 lg:grid-cols-2 lg:gap-16">
            {StationsBlock}
            {EventsBlock}
          </div>

          {/* Mobile Swiper (<lg) */}
          <div className="mt-10 block lg:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoHeight={true}
              pagination={{
                el: ".media-events-pagination",
                clickable: false,
                bulletClass: "swiper-pagination-bullet !bg-red-600/20 !opacity-100 !h-1.5 !w-1.5 !rounded-full transition-all duration-300",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-red-600 !w-4",
              }}
              className="pb-10"
            >
              <SwiperSlide>
                {StationsBlock}
              </SwiperSlide>
              <SwiperSlide>
                {EventsBlock}
              </SwiperSlide>
            </Swiper>
            {/* Custom Pagination Container — scoped to avoid global .swiper-pagination { bottom: -1cm !important } */}
            <div className="media-events-pagination mt-4 flex justify-center gap-1.5" />
          </div>
        </div>
      </PageContainer>

      {/* Fullscreen Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-black/90 backdrop-blur-sm z-[100]" />
          <DialogContent
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none overflow-visible outline-none sm:max-w-5xl"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">
              {selectedImage?.alt || "Event Poster"}
            </DialogTitle>
            {selectedImage && (
              <div className="relative flex flex-col items-center justify-center gap-4 px-4">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-4 top-[-48px] text-white/70 hover:text-white transition-colors outline-none"
                  aria-label="Close lightbox"
                >
                  <X className="h-8 w-8" />
                </button>

                {/* Image Container */}
                <div className="relative w-full max-h-[85vh] flex items-center justify-center">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  />
                </div>

                {/* Caption */}
                <div className="text-center">
                  <p className="text-white text-lg font-medium">{selectedImage.alt}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </EditableSection>
  )
}
