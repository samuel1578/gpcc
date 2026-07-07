"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { MINISTRIES } from "@/lib/site"
import { PillButton } from "@/components/ui/pill-button"
import { cn } from "@/lib/utils"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

export function MinistriesScroll() {
    const swiperRef = useRef<SwiperType>(null)
    const mobileSwiperRef = useRef<SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const count = MINISTRIES.length + 1

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    return (
        <div className="relative w-full">
            {/* Viewport Container */}
            <div className="relative xl:h-[100dvh] w-full overflow-hidden flex flex-col xl:flex-row items-center z-10">

                {/* 1. DESKTOP LAYOUT (xl+) */}
                <div className="hidden xl:flex h-full w-full flex-col items-center justify-center px-8 xl:px-12 gap-8">
                    {/* Heading Card */}
                    <div className="w-full max-w-[1600px] rounded-2xl glass-panel px-6 py-4 text-center shrink-0">
                        <p className="font-display font-semibold text-red-600 text-lg">
                            Our Ministries
                        </p>
                        <h2 className="mt-1 font-display font-semibold text-ink leading-tight"
                            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}>
                            Find your people. Find your purpose.
                        </h2>
                    </div>

                    <div className="w-full max-w-[1600px] overflow-hidden rounded-3xl glass-panel-strong border-white/10 shadow-2xl">
                        <Swiper
                            modules={[EffectFade]}
                            effect="fade"
                            speed={800}
                            allowTouchMove={false}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            className="w-full"
                        >
                            {MINISTRIES.map((m, index) => (
                                <SwiperSlide key={m.name}>
                                    <div className="grid min-h-[75vh] xl:min-h-[85vh] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[1.2fr_1fr]">
                                        <div className="relative h-full overflow-hidden">
                                            <div className="absolute inset-0 w-full h-full">
                                                <Image
                                                    src={m.image || "/images/media/men-ministry.webp"}
                                                    alt={m.name}
                                                    fill
                                                    className="object-cover object-[center_20%]"
                                                    unoptimized
                                                    sizes="50vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="relative flex h-full items-center justify-center" style={{ padding: "clamp(1.5rem,4vw,6rem)" }}>
                                            <AnimatePresence mode="wait">
                                                {activeIndex === index && (
                                                    <motion.div
                                                        key={`desktop-text-${index}`}
                                                        variants={textVariants}
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        className="w-full max-w-[640px] text-center mx-auto"
                                                    >
                                                        <p className="label-cap text-red-600">{m.name}</p>
                                                        <h3 className="mt-4 h-section text-ink text-balance">{m.name}</h3>
                                                        <p className="mt-6 body-lg text-ink-muted">{m.description}</p>
                                                        <Link
                                                            href="/ministries"
                                                            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-deep)] hover:underline mx-auto"
                                                            aria-label={`Explore the ${m.name}`}
                                                        >
                                                            Explore <ArrowUpRight className="h-4 w-4" />
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* CTA Slide */}
                            <SwiperSlide key="cta">
                                <div className="grid min-h-[75vh] xl:min-h-[85vh] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[1.2fr_1fr]">
                                    <div className="relative h-full overflow-hidden">
                                        <div className="absolute inset-0 w-full h-full">
                                            <Image
                                                src="/images/media/MINCTA.jpg"
                                                alt="Find Your Place"
                                                fill
                                                className="object-cover object-[center_20%]"
                                                unoptimized
                                                sizes="50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="relative flex h-full items-center justify-center" style={{ padding: "clamp(1.5rem,4vw,6rem)" }}>
                                        <AnimatePresence mode="wait">
                                            {activeIndex === MINISTRIES.length && (
                                                <motion.div
                                                    key="desktop-cta"
                                                    variants={textVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                                    className="w-full max-w-[800px] text-center mx-auto"
                                                >
                                                    <p className="label-cap text-red-600">Find Your Place</p>
                                                    <h3 className="mt-4 h-section text-ink text-pretty">Every ministry has a seat with your name on it.</h3>
                                                    <div className="mt-6 space-y-4">
                                                        <p className="body-lg text-ink-muted">
                                                            Whether you&apos;re stepping in for the first time or looking to go
                                                            deeper in your faith journey, our ministries are open, welcoming,
                                                            and waiting for you. You won&apos;t regret walking through those doors.
                                                        </p>
                                                        <p className="text-sm text-ink-muted/70 italic">
                                                            Come as you are. Leave changed.
                                                        </p>
                                                    </div>
                                                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                                        <PillButton href="#service-times" variant="primary" size="md">
                                                            Visit Us This Sunday
                                                        </PillButton>
                                                        <PillButton href="/ministries" variant="ghost" size="md" className="!px-0 underline-offset-4 hover:underline">
                                                            Explore All Ministries
                                                        </PillButton>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Desktop Control Bar */}
                    <div className="flex items-center gap-8 z-20">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="p-2 rounded-full border border-ink/10 hover:bg-ink/5 transition-colors group"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-ink-muted group-hover:text-ink" />
                        </button>

                        <div className="flex gap-3">
                            {Array.from({ length: count }).map((_, index) => {
                                const isActive = activeIndex === index
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            swiperRef.current?.slideTo(index)
                                            setActiveIndex(index)
                                        }}
                                        className="group focus:outline-none"
                                        aria-label={`Go to slide ${index + 1}`}
                                    >
                                        <div className={`rounded-full transition-all duration-500 ${isActive
                                            ? "w-8 h-2 bg-red-600"
                                            : "w-1.5 h-1.5 bg-ink-muted/20 group-hover:bg-ink-muted/40"
                                            }`} />
                                    </button>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="p-2 rounded-full border border-ink/10 hover:bg-ink/5 transition-colors group"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-ink-muted group-hover:text-ink" />
                        </button>
                    </div>
                </div>

                {/* 2. MOBILE/TABLET LAYOUT (<xl) */}
                <div className="flex xl:hidden w-full flex-col gap-3 pt-[72px] pb-12 px-6 z-10">
                    {/* Heading Card */}
                    <div className="w-full rounded-2xl glass-panel px-6 py-5 text-center shrink-0">
                        <p className="font-display font-semibold text-red-600 text-xl uppercase tracking-wide">
                            Our Ministries
                        </p>
                        <h2 className="mt-1 font-display font-semibold text-ink leading-tight"
                            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}>
                            Find your people. Find your purpose.
                        </h2>
                    </div>

                    <div className="w-full">
                        <Swiper
                            slidesPerView={1.15}
                            spaceBetween={12}
                            onSwiper={(swiper) => {
                                mobileSwiperRef.current = swiper
                            }}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            className="w-full !overflow-visible"
                        >
                            {MINISTRIES.map((m, index) => (
                                <SwiperSlide key={m.name}>
                                    <div className="flex flex-col gap-3">
                                        {/* Media Panel */}
                                        <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden glass-panel shadow-xl">
                                            <Image
                                                src={m.image || "/images/media/men-ministry.webp"}
                                                alt={m.name}
                                                fill
                                                className="object-cover"
                                                sizes="90vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                                        </div>

                                        {/* Narrative Text Panel */}
                                        <div className="relative w-full rounded-2xl glass-panel shadow-lg flex flex-col overflow-hidden h-auto min-h-[220px] px-5 pt-5 pb-10 text-center items-center">
                                            <AnimatePresence mode="wait">
                                                {activeIndex === index && (
                                                    <motion.div
                                                        key={`mobile-text-${index}`}
                                                        variants={textVariants}
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        className="space-y-3"
                                                    >
                                                        <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">{m.name}</p>
                                                        <h3 className="font-display font-bold leading-tight text-ink text-xl">{m.name}</h3>
                                                        <p className="text-sm text-ink-muted leading-relaxed line-clamp-4">{m.description}</p>
                                                        <Link
                                                            href="/ministries"
                                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-deep)] hover:underline mx-auto"
                                                        >
                                                            Explore <ArrowUpRight className="h-4 w-4" />
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Pinned Mobile Dots */}
                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                                                {Array.from({ length: count }).map((_, dotIndex) => {
                                                    const isActive = activeIndex === dotIndex
                                                    return (
                                                        <div
                                                            key={dotIndex}
                                                            className={`rounded-full transition-all duration-500 ${isActive
                                                                ? "w-8 h-1.5 bg-red-600"
                                                                : "w-1.5 h-1.5 bg-ink-muted/20"
                                                                }`}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* CTA Slide */}
                            <SwiperSlide key="cta">
                                <div className="flex flex-col gap-3">
                                    <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden glass-panel shadow-xl">
                                        <Image
                                            src="/images/media/MINCTA.jpg"
                                            alt="Find Your Place"
                                            fill
                                            className="object-cover"
                                            sizes="90vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    <div className="relative w-full rounded-2xl glass-panel shadow-lg flex flex-col overflow-hidden h-auto min-h-[300px] px-5 pt-5 pb-10 text-center items-center">
                                        <AnimatePresence mode="wait">
                                            {activeIndex === MINISTRIES.length && (
                                                <motion.div
                                                    key="mobile-cta"
                                                    variants={textVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="space-y-4"
                                                >
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">Find Your Place</p>
                                                    <h3 className="font-display font-bold leading-tight text-ink text-xl">Every ministry has a seat with your name on it.</h3>
                                                    <p className="text-sm text-ink-muted leading-relaxed">
                                                        Whether you're stepping in for the first time or looking to go deeper in your faith journey, our ministries are open, welcoming, and waiting for you.
                                                    </p>
                                                    <p className="text-xs italic text-ink-muted/70">
                                                        Come as you are. Leave changed.
                                                    </p>
                                                    <div className="flex flex-col gap-2 pt-1 w-full">
                                                        <PillButton href="#service-times" variant="primary" size="sm" className="w-full">
                                                            Visit Us This Sunday
                                                        </PillButton>
                                                        <PillButton href="/ministries" variant="ghost" size="sm" className="w-full">
                                                            Explore All Ministries
                                                        </PillButton>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Pinned Mobile Dots */}
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                                            {Array.from({ length: count }).map((_, dotIndex) => {
                                                const isActive = activeIndex === dotIndex
                                                return (
                                                    <div
                                                        key={dotIndex}
                                                        className={`rounded-full transition-all duration-500 ${isActive
                                                            ? "w-8 h-1.5 bg-red-600"
                                                            : "w-1.5 h-1.5 bg-ink-muted/20"
                                                            }`}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
