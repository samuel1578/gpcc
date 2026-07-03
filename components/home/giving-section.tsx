"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { SITE } from "@/lib/site"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { PledgeModal } from "@/components/home/pledge-modal"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export function GivingSection() {
  const [whyGiveOpen, setWhyGiveOpen] = useState(false)
  const [pledgeOpen, setPledgeOpen] = useState(false)

  return (
    <EditableSection
      id="home.giving"
      label="Giving"
      pageKey="home"
      className="w-full"
    >
      <PageContainer className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="gold-glow relative w-full overflow-hidden rounded-3xl glass-panel-dark text-center px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,4vw,5rem)]"
        >
          <div className="relative mx-auto -mt-4 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <Image
              src="/images/hero/logo.png"
              alt={SITE.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
            />
          </div>
          <p className="mt-4 label-cap text-[var(--accent-gold)]">Partner with us</p>
          <EditableText
            id="home.giving.title"
            label="Giving Heading"
            pageKey="home"
            as="h2"
            className="mt-3 font-display font-semibold text-ink-on-dark text-balance"
          >
            <span style={{ fontSize: "clamp(2rem, 3vw + 0.6rem, 3rem)", lineHeight: 1.15 }}>
              Every gift carries a story. Yours is welcome here.
            </span>
          </EditableText>
          <EditableText
            id="home.giving.body"
            label="Giving Body"
            pageKey="home"
            as="p"
            className="mx-auto mt-6 max-w-xl text-base text-ink-on-dark-muted"
          >
            Your partnership advances the Word, sustains our community, and reaches
            lives across Ghana and beyond.
          </EditableText>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PillButton onClick={() => setPledgeOpen(true)} variant="rose" size="lg">
              Give Now
            </PillButton>
            <button
              type="button"
              onClick={() => setWhyGiveOpen(true)}
              className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent-gold-light)] hover:text-white"
            >
              Why give?
            </button>
          </div>
        </motion.div>
      </PageContainer>
      {whyGiveOpen && (
        <WhyGiveModal
          onClose={() => setWhyGiveOpen(false)}
          onGiveNow={() => {
            setWhyGiveOpen(false)
            setPledgeOpen(true)
          }}
        />
      )}
      {pledgeOpen && <PledgeModal onClose={() => setPledgeOpen(false)} />}
    </EditableSection>
  )
}

function WhyGiveModal({
  onClose,
  onGiveNow,
}: {
  onClose: () => void
  onGiveNow: () => void
}) {
  const isMobile = useIsMobile()
  const [activeSlide, setActiveSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.body.classList.add("modal-active")
    return () => {
      setMounted(false)
      document.body.style.overflow = prev
      document.body.classList.remove("modal-active")
    }
  }, [])

  if (!mounted) return null

  const slides = [
    {
      image: "/images/backgrounds/donation1.webp",
      objectPosition: "center center",
      label: "Sovereign Praise",
      heading: "A Night of Praise & Worship",
      body: "Every year, GPCC hosts Sovereign Praise.\nAn electrifying gospel concert that brings together anointed artists for a jam-packed night of Spirit-filled music, worship, and celebration. Your giving makes nights like these possible."
    },
    {
      image: "/images/backgrounds/donation2.webp",
      objectPosition: "right center",
      label: "Community Impact",
      heading: "Giving Beyond These Walls",
      body: "Through your generosity, GPCC has donated to hospitals, schools, and orphanages across Ghana.\nBringing the love of Christ to those who need it most. Every gift carries a story. Yours is welcome here."
    }
  ]

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[200] flex bg-black/60 px-4",
          isMobile ? "items-end" : "items-center justify-center pt-4 backdrop-blur-md"
        )}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={isMobile ? { y: "100%" } : { opacity: 0, y: 32, scale: 0.97 }}
          animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
          exit={isMobile ? { y: "100%" } : { opacity: 0, y: 20, scale: 0.97 }}
          transition={
            isMobile
              ? { duration: 0.45, ease: [0.32, 0.72, 0, 1] }
              : { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }
          }
          style={{ backgroundColor: "#ffffff", isolation: "isolate" }}
          className={cn(
            "relative w-full overflow-hidden shadow-[var(--shadow-dramatic)] flex",
            isMobile
              ? "rounded-t-3xl max-h-[85vh] bg-white flex-col"
              : "rounded-3xl max-h-[94vh] min-h-[80vh] glass-panel-strong flex-row max-w-5xl"
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

          {isMobile ? (
            <>
              {/* Mobile Layout */}
              <div className="group relative w-full overflow-hidden bg-black/5 aspect-[4/3]">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{ prevEl: ".whygive-prev", nextEl: ".whygive-next" }}
                  pagination={{ clickable: true }}
                  onSlideChange={(swiper) => {
                    setActiveSlide(swiper.activeIndex)
                    const prevBtn = document.querySelector(".whygive-prev")
                    const nextBtn = document.querySelector(".whygive-next")
                    if (prevBtn && nextBtn) {
                      ; (prevBtn as HTMLElement).style.display = swiper.isBeginning ? "none" : "flex"
                        ; (nextBtn as HTMLElement).style.display = swiper.isEnd ? "none" : "flex"
                    }
                  }}
                  onSwiper={(swiper) => {
                    const prevBtn = document.querySelector(".whygive-prev")
                    if (prevBtn) {
                      ; (prevBtn as HTMLElement).style.display = "none"
                    }
                  }}
                  className="h-full w-full"
                  spaceBetween={0}
                  slidesPerView={1}
                >
                  {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative h-full w-full">
                        <Image
                          src={slide.image}
                          alt={slide.label}
                          fill
                          className="object-cover"
                          sizes="100vw"
                          quality={90}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="whygive-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="whygive-next absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/40">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {slides.map((slide, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: activeSlide === i ? 1 : 0, y: activeSlide === i ? 0 : 8 }}
                    transition={{ duration: 0.35 }}
                    className={activeSlide === i ? "block" : "hidden"}
                  >
                    <p className="label-cap text-red-600">{slide.label}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                      {slide.heading}
                    </h3>
                    <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                      {slide.body}
                    </p>
                  </motion.div>
                ))}
                <div className="mt-6">
                  <PillButton onClick={onGiveNow} variant="rose" size="md" className="w-full">
                    Give Now
                  </PillButton>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Layout */}
              <div className={`relative shrink-0 overflow-hidden transition-all duration-700 ease-[0.25,0.46,0.45,0.94] ${activeSlide === 1 ? "w-[60%]" : "w-[40%]"}`}>
                {slides.map((slide, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeSlide === i ? 1 : 0,
                      scale: activeSlide === i ? 1 : 1.04
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      style={{ objectPosition: slide.objectPosition }}
                      sizes="60vw"
                      quality={90}
                    />
                  </motion.div>
                ))}
              </div>

              <div className={`flex flex-col overflow-y-auto px-8 py-10 transition-all duration-700 ease-[0.25,0.46,0.45,0.94] ${activeSlide === 1 ? "w-[40%]" : "flex-1"}`}>
                <div className="flex-1 flex flex-col justify-center gap-6 py-4">
                  {slides.map((slide, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{
                        opacity: activeSlide === i ? 1 : 0,
                        y: activeSlide === i ? 0 : 16
                      }}
                      transition={{
                        duration: 0.5,
                        delay: activeSlide === i ? 0.15 : 0,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className={activeSlide === i ? "block" : "hidden"}
                    >
                      <p className="label-cap text-red-600">{slide.label}</p>
                      <h3 className="mt-4 font-display text-4xl font-semibold text-ink leading-tight">
                        {slide.heading}
                      </h3>
                      <p className="mt-6 body-lg text-ink-muted leading-relaxed whitespace-pre-line">
                        {slide.body}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <PillButton onClick={onGiveNow} variant="rose" size="md">
                    Give Now
                  </PillButton>
                  <button
                    onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-600/30 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    {activeSlide === 0 ? (
                      <>Next <ChevronRight className="h-4 w-4" /></>
                    ) : (
                      <><ChevronLeft className="h-4 w-4" /> Previous</>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
