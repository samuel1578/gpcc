"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import type { Testimony } from "@/lib/types/database"
import { cn } from "@/lib/utils"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

interface TestimoniesScrollProps {
    testimonies: Testimony[]
}

export function TestimoniesScroll({ testimonies }: TestimoniesScrollProps) {
    const swiperRef = useRef<SwiperType>(null)
    const mobileSwiperRef = useRef<SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const count = testimonies.length

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    }

    return (
        <div className="relative w-full">
            {/* Ambient Background System (GPU Accelerated Breathing Glows) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-[20%] left-[10%] w-[clamp(300px,40vw,600px)] aspect-square rounded-full bg-red-500/5 blur-[120px]"
                    style={{
                        animation: "breathe-slow 15s infinite ease-in-out"
                    }}
                />
                <div
                    className="absolute bottom-[20%] right-[10%] w-[clamp(300px,40vw,600px)] aspect-square rounded-full bg-amber-500/5 blur-[120px]"
                    style={{
                        animation: "breathe-slow 18s infinite ease-in-out 2s"
                    }}
                />
            </div>

            <style jsx global>{`
                @keyframes breathe-slow {
                    0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.6; }
                    50% { transform: scale(1.15) translate(20px, -20px); opacity: 1; }
                }
            `}</style>

            {/* Viewport Container */}
            <div className="relative xl:h-[100dvh] w-full overflow-hidden flex flex-col xl:flex-row items-center z-10">

                {/* 1. DESKTOP EXPERIENTIAL SPLIT LAYOUT */}
                <div className="hidden xl:flex h-full w-full flex-col items-center justify-center px-8 xl:px-16 max-w-[2800px] mx-auto gap-8">
                    {/* Heading Card */}
                    <div className="w-full max-w-[1600px] rounded-2xl glass-panel px-6 py-4 text-center shrink-0">
                        <p className="font-display font-semibold text-red-600 text-lg">
                            Our Testimonies
                        </p>
                        <h2 className="mt-1 font-display font-semibold text-ink leading-tight"
                            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}>
                            Real stories, real impact
                        </h2>
                    </div>

                    <div className="w-full rounded-3xl overflow-hidden glass-panel-strong border-white/10 shadow-2xl">
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
                            {testimonies.map((t, index) => (
                                <SwiperSlide key={t.id}>
                                    <div className="flex flex-row items-center justify-between min-h-[70vh]">
                                        {/* Media Panel (Left 55%) */}
                                        <div className="relative w-[55%] h-[70vh] overflow-hidden">
                                            {t.cover_image_url ? (
                                                <Image
                                                    src={t.cover_image_url}
                                                    alt={t.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="55vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                    <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Testimony</p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                        </div>

                                        {/* Narrative Text Panel (Right 45%) */}
                                        <div className="relative w-[45%] h-[70vh] p-8 lg:p-12 flex flex-col justify-center">
                                            <AnimatePresence mode="wait">
                                                {activeIndex === index && (
                                                    <motion.div
                                                        key={`desktop-text-${index}`}
                                                        variants={textVariants}
                                                        initial="initial"
                                                        animate="animate"
                                                        exit="exit"
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        className="relative"
                                                    >
                                                        {/* Quote Icon Background */}
                                                        <div className="absolute -top-10 -left-6 text-red-500/5 pointer-events-none">
                                                            <Quote className="h-24 w-24 fill-current" />
                                                        </div>

                                                        <div className="relative z-10 space-y-6">
                                                            <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold">
                                                                {t.is_confidential ? "Confidential Story" : (t.person_name || "Anonymous")}
                                                            </p>

                                                            <h3 className="font-display font-bold leading-[1.1] text-ink text-3xl lg:text-4xl xl:text-5xl tracking-tight">
                                                                "{t.quote || t.title}"
                                                            </h3>

                                                            {t.scripture_reference && (
                                                                <p className="text-sm font-display italic text-ink-muted/80">
                                                                    — {t.scripture_reference}
                                                                </p>
                                                            )}

                                                            <p className="body-lg text-ink-muted leading-relaxed line-clamp-3">
                                                                {t.excerpt}
                                                            </p>

                                                            <div className="pt-4">
                                                                <Link
                                                                    href={`/about/testimonies?slug=${t.slug}`}
                                                                    className="inline-flex flex-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium shadow-lg shadow-red-600/10 hover:bg-red-700 hover:shadow-red-600/20 transition-all duration-300 group w-fit"
                                                                >
                                                                    Read full story
                                                                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Desktop Control Bar */}
                    <div className="flex items-center gap-8 z-20">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="p-2 rounded-full border border-ink/10 hover:bg-ink/5 transition-colors group"
                            aria-label="Previous testimony"
                        >
                            <ChevronLeft className="w-6 h-6 text-ink-muted group-hover:text-ink" />
                        </button>

                        <div className="flex gap-3">
                            {testimonies.map((_, index) => {
                                const isActive = activeIndex === index
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            swiperRef.current?.slideTo(index)
                                            setActiveIndex(index)
                                        }}
                                        className="group focus:outline-none"
                                        aria-label={`Go to testimony ${index + 1}`}
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
                            aria-label="Next testimony"
                        >
                            <ChevronRight className="w-6 h-6 text-ink-muted group-hover:text-ink" />
                        </button>
                    </div>
                </div>

                {/* 2. MOBILE INTIMATE VERTICAL LAYOUT */}
                <div className="flex xl:hidden h-full w-full flex-col justify-center gap-3 pt-[72px] pb-12 px-6 z-10">
                    {/* Heading Card */}
                    <div className="w-full rounded-2xl glass-panel px-6 py-5 text-center shrink-0">
                        <p className="font-display font-semibold text-red-600 text-xl uppercase tracking-wide">
                            Our Testimonies
                        </p>
                        <h2 className="mt-1 font-display font-semibold text-ink leading-tight"
                            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}>
                            Real stories, real impact
                        </h2>
                    </div>

                    <Swiper
                        slidesPerView={1.15}
                        spaceBetween={12}
                        onSwiper={(swiper) => {
                            mobileSwiperRef.current = swiper
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full !overflow-visible"
                    >
                        {testimonies.map((t, index) => (
                            <SwiperSlide key={t.id}>
                                <div className="flex flex-col gap-4">
                                    {/* Media Panel */}
                                    <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden glass-panel shadow-xl">
                                        {t.cover_image_url ? (
                                            <Image
                                                src={t.cover_image_url}
                                                alt={t.title}
                                                fill
                                                className="object-cover"
                                                sizes="90vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                                <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Testimony</p>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* Narrative Text Panel */}
                                    <div className="relative w-full rounded-2xl glass-panel shadow-lg flex flex-col overflow-hidden h-auto min-h-[280px] px-6 pt-6 pb-12 text-center items-center">
                                        <AnimatePresence mode="wait">
                                            {activeIndex === index && (
                                                <motion.div
                                                    key={`mobile-text-${index}`}
                                                    variants={textVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                    className="space-y-4"
                                                >
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">
                                                        {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                                                    </p>

                                                    <h3 className="font-display font-bold leading-tight text-ink text-xl sm:text-2xl">
                                                        "{t.quote || t.title}"
                                                    </h3>

                                                    {t.scripture_reference && (
                                                        <p className="text-xs font-display italic text-ink-muted/80">
                                                            — {t.scripture_reference}
                                                        </p>
                                                    )}

                                                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                                                        {t.excerpt}
                                                    </p>

                                                    <div className="pt-2">
                                                        <Link
                                                            href={`/about/testimonies?slug=${t.slug}`}
                                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline"
                                                        >
                                                            Read story
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Pinned Mobile Dots */}
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                                            {testimonies.map((_, dotIndex) => {
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
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
