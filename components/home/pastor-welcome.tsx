"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, X, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PASTOR, SERVICE_TIMES } from "@/lib/site"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"
import { useIsMobile } from "@/hooks/use-mobile"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export function PastorWelcome() {
  const [open, setOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)

  return (
    <EditableSection
      id="home.pastor-welcome"
      label="Pastor Welcome"
      pageKey="home"
      className="w-full"
    >
      <PageContainer className="py-5">
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
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
                  onClick={() => setScheduleOpen(true)}
                  variant="primary"
                >
                  View Schedule
                </PillButton>
                <PillButton
                  href="https://www.google.com/maps/place/Global+Peace+Christian+Centre+(GPCC)/@5.7173525,-0.2082636,18.49z/data=!4m6!3m5!1s0xfdf9dedc886fb2f:0x4a651067c9806910!8m2!3d5.7171532!4d-0.2076962!16s%2Fg%2F11b6_9jv20?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="border border-[var(--border-glass)]"
                >
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
          {scheduleOpen && <ScheduleModal onClose={() => setScheduleOpen(false)} />}
        </AnimatePresence>
      </PageContainer>
    </EditableSection>
  )
}

function ScheduleModal({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.body.classList.add("modal-active")
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove("modal-active")
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[100] flex bg-black/50 px-4",
        isMobile ? "items-end" : "items-start justify-center pt-2 sm:pt-4 backdrop-blur-md"
      )}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.96, opacity: 0, y: 16 }}
        animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.97, opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease }}
        className={cn(
          "relative w-full max-w-xl overflow-hidden shadow-[var(--shadow-dramatic)]",
          isMobile ? "rounded-t-3xl max-h-[80vh] bg-white" : "rounded-3xl max-h-[96vh] glass-panel-strong"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="overflow-y-auto px-6 py-10 sm:px-10 sm:py-12">
          <p className="label-cap text-[var(--accent-deep)]">Join us in worship</p>
          <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Service Schedule
          </h3>
          <div className="mt-8 space-y-6">
            {SERVICE_TIMES.map((s, i) => (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-4 rounded-2xl bg-white/40 p-4 border border-black/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-deep)]/10 text-[var(--accent-deep)]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-deep)]">
                    {s.day}
                  </p>
                  <p className="mt-1 font-display text-lg font-medium text-ink">
                    {s.service}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
                    <Clock className="h-3.5 w-3.5" />
                    {s.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <PillButton onClick={onClose} variant="primary" className="w-full">
              Close
            </PillButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PastorMessageModal({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile()
  const pastorImages = [
    {
      src: "/images/pastor/president-2.jpg",
      alt: `${PASTOR.name} - Slide 1`,
      objectPosition: "50% 25%"
    },
    {
      src: "/images/pastor/headpastore.jpg",
      alt: PASTOR.name,
      objectPosition: "50% 20%"
    },
    {
      src: "/images/pastor/president-3.jpg",
      alt: `${PASTOR.name} - Slide 3`,
      objectPosition: "50% 25%"
    },
    {
      src: "/images/pastor/president-4.jpg",
      alt: `${PASTOR.name} - Slide 4`,
      objectPosition: "50% 25%"
    },
  ]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.body.classList.add("modal-active")
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove("modal-active")
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-[100] flex bg-black/50 px-4",
        isMobile ? "items-end" : "items-start justify-center pt-2 sm:pt-4 backdrop-blur-md"
      )}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.96, opacity: 0, y: 16 }}
        animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { y: "100%", opacity: 1, scale: 1 } : { scale: 0.97, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease }}
        className={cn(
          "relative w-full max-w-5xl overflow-hidden shadow-[var(--shadow-dramatic)] flex flex-col",
          isMobile ? "rounded-t-3xl max-h-[85vh] bg-white" : "rounded-3xl max-h-[96vh] glass-panel-strong"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur-sm hover:bg-white shadow-sm transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Fixed Carousel Section - Flush to top/sides */}
        <div className="relative w-full shrink-0">
          <div className={cn(
            "group relative w-full overflow-hidden bg-black/5",
            isMobile ? "aspect-[4/3]" : "h-[280px] sm:h-[340px] lg:h-[360px]"
          )}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".pastor-prev",
                nextEl: ".pastor-next",
              }}
              pagination={{ clickable: true }}
              className="h-full w-full"
              spaceBetween={0}
              slidesPerView={1}
            >
              {pastorImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: img.objectPosition }}
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      quality={90}
                      priority={idx === 0}
                      loading="eager"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="pastor-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 disabled:opacity-0 group-hover:left-6">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="pastor-next absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40 disabled:opacity-0 group-hover:right-6">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Independently Scrolling Text Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
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
