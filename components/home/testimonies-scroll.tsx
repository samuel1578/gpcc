"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion"
import { ArrowRight, Quote } from "lucide-react"
import type { Testimony } from "@/lib/types/database"

interface TestimoniesScrollProps {
    testimonies: Testimony[]
}

export function TestimoniesScroll({ testimonies }: TestimoniesScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const count = testimonies.length

    // 1. Scroll Tracking & Inertial Smoothing
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 26,
        restDelta: 0.001
    })

    // Low-frequency state update for accessibility and active slide indicators
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const index = Math.min(Math.floor(latest * count), count - 1)
        if (index !== activeIndex && index >= 0) {
            setActiveIndex(index)
        }
    })

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${count * 100}vh` }}
        >
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

            {/* Sticky Viewport Container */}
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center z-10">

                {/* 1. DESKTOP EXPERIENTIAL SPLIT LAYOUT */}
                <div className="hidden md:flex h-full w-full flex-row items-center justify-between px-8 lg:px-16 max-w-[2800px] mx-auto">

                    {/* Sticky Media Panel (Left 55%) */}
                    <div className="relative w-[55%] h-[70vh] rounded-3xl overflow-hidden glass-panel-strong shadow-2xl">
                        {testimonies.map((t, index) => (
                            <DesktopMedia
                                key={t.id}
                                testimony={t}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                            />
                        ))}
                    </div>

                    {/* Narrative Text Panel (Right 40%) */}
                    <div className="relative w-[40%] h-[70vh] rounded-3xl glass-panel p-8 lg:p-12 shadow-xl flex flex-col justify-center">
                        {testimonies.map((t, index) => (
                            <DesktopText
                                key={t.id}
                                testimony={t}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                                isActive={activeIndex === index}
                            />
                        ))}
                    </div>
                </div>

                {/* 2. MOBILE INTIMATE VERTICAL LAYOUT */}
                <div className="flex md:hidden h-full w-full flex-col justify-between p-6 z-10">

                    {/* Sticky Media Panel (Top 40%) */}
                    <div className="relative w-full h-[35vh] rounded-2xl overflow-hidden glass-panel shadow-xl">
                        {testimonies.map((t, index) => (
                            <MobileMedia
                                key={t.id}
                                testimony={t}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                            />
                        ))}
                    </div>

                    {/* Narrative Text Panel (Bottom 55%) */}
                    <div className="relative w-full h-[50vh] rounded-2xl glass-panel p-6 shadow-lg flex flex-col justify-center">
                        {testimonies.map((t, index) => (
                            <MobileText
                                key={t.id}
                                testimony={t}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                                isActive={activeIndex === index}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress Indicators (Left side layout bar) */}
                <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {testimonies.map((_, index) => {
                        const isActive = activeIndex === index
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (containerRef.current) {
                                        const scrollTarget = (index / count) * containerRef.current.scrollHeight
                                        window.scrollTo({
                                            top: containerRef.current.offsetTop + scrollTarget,
                                            behavior: "smooth"
                                        })
                                    }
                                }}
                                className="group focus:outline-none"
                                aria-label={`Go to testimony ${index + 1}`}
                            >
                                <div className={`h-2 rounded-full transition-all duration-500 ${isActive
                                    ? "w-8 bg-red-600"
                                    : "w-2 bg-ink-muted/20 group-hover:bg-ink-muted/40"
                                    }`} />
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/**
 * Child components to satisfy React Rules of Hooks
 */

interface DesktopMediaProps {
    testimony: Testimony
    index: number
    count: number
    progress: MotionValue<number>
}

function DesktopMedia({ testimony, index, count, progress }: DesktopMediaProps) {
    const { opacity, scale } = getSlideTransforms(progress, index, count, "desktop")
    return (
        <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 w-full h-full"
        >
            {testimony.cover_image_url ? (
                <Image
                    src={testimony.cover_image_url}
                    alt={testimony.title}
                    fill
                    className="object-cover"
                    sizes="55vw"
                />
            ) : (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Testimony</p>
                </div>
            )}
            {/* Subtle Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
    )
}

interface DesktopTextProps {
    testimony: Testimony
    index: number
    count: number
    progress: MotionValue<number>
    isActive: boolean
}

function DesktopText({ testimony, index, count, progress, isActive }: DesktopTextProps) {
    const { opacity, y } = getSlideTransforms(progress, index, count, "desktop")
    return (
        <motion.div
            style={{ opacity, y }}
            aria-hidden={!isActive}
            className="absolute inset-x-8 lg:inset-x-12 flex flex-col justify-center"
        >
            {/* Quote Icon Background */}
            <div className="absolute -top-10 -left-6 text-red-500/5 pointer-events-none">
                <Quote className="h-24 w-24 fill-current" />
            </div>

            <div className="relative z-10 space-y-6">
                <p className="text-xs uppercase tracking-[0.2em] text-red-600 font-semibold">
                    {testimony.is_confidential ? "Confidential Story" : (testimony.person_name || "Anonymous")}
                </p>

                {/* Oversized Quote / Title */}
                <h3 className="font-display font-bold leading-[1.1] text-ink text-3xl lg:text-4xl xl:text-5xl tracking-tight">
                    "{testimony.quote || testimony.title}"
                </h3>

                {testimony.scripture_reference && (
                    <p className="text-sm font-display italic text-ink-muted/80">
                        — {testimony.scripture_reference}
                    </p>
                )}

                <p className="body-lg text-ink-muted leading-relaxed line-clamp-3">
                    {testimony.excerpt}
                </p>

                <div className="pt-4">
                    <Link
                        href={`/about/testimonies?slug=${testimony.slug}`}
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex flex-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-medium shadow-lg shadow-red-600/10 hover:bg-red-700 hover:shadow-red-600/20 transition-all duration-300 group w-fit"
                    >
                        Read full story
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

interface MobileMediaProps {
    testimony: Testimony
    index: number
    count: number
    progress: MotionValue<number>
}

function MobileMedia({ testimony, index, count, progress }: MobileMediaProps) {
    const { opacity } = getSlideTransforms(progress, index, count, "mobile")
    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0 w-full h-full"
        >
            {testimony.cover_image_url ? (
                <Image
                    src={testimony.cover_image_url}
                    alt={testimony.title}
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
        </motion.div>
    )
}

interface MobileTextProps {
    testimony: Testimony
    index: number
    count: number
    progress: MotionValue<number>
    isActive: boolean
}

function MobileText({ testimony, index, count, progress, isActive }: MobileTextProps) {
    const { opacity, y } = getSlideTransforms(progress, index, count, "mobile")
    return (
        <motion.div
            style={{ opacity, y }}
            aria-hidden={!isActive}
            className="absolute inset-x-6 flex flex-col justify-center space-y-4"
        >
            <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">
                {testimony.is_confidential ? "Confidential" : (testimony.person_name || "Anonymous")}
            </p>

            <h3 className="font-display font-bold leading-tight text-ink text-xl sm:text-2xl">
                "{testimony.quote || testimony.title}"
            </h3>

            {testimony.scripture_reference && (
                <p className="text-xs font-display italic text-ink-muted/80">
                    — {testimony.scripture_reference}
                </p>
            )}

            <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                {testimony.excerpt}
            </p>

            <div className="pt-2">
                <Link
                    href={`/about/testimonies?slug=${testimony.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline"
                >
                    Read story
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    )
}

/**
 * Dynamic Segment Range Mapping for any N slides
 * Returns GPU-safe Framer Motion values for opacity, scale, and translation
 */
function getSlideTransforms(
    progress: MotionValue<number>,
    index: number,
    count: number,
    device: "desktop" | "mobile"
) {
    const W = 1 / count
    const mid = (index + 0.5) * W

    // Calculate segment range boundaries
    const start = Math.max(0, mid - 0.6 * W)
    const peakStart = Math.max(0, mid - 0.2 * W)
    const peakEnd = Math.min(1, mid + 0.2 * W)
    const end = Math.min(1, mid + 0.6 * W)

    // Build responsive input/output mapping
    let inputRange: number[]
    let opacityOutput: number[]
    let scaleOutput: number[]
    let yOutput: number[]

    if (index === 0) {
        inputRange = [0, peakEnd, end]
        opacityOutput = [1, 1, 0]
        scaleOutput = [1, 1, device === "desktop" ? 1.05 : 1.02]
        yOutput = [0, 0, device === "desktop" ? -30 : -15]
    } else if (index === count - 1) {
        inputRange = [start, peakStart, 1]
        opacityOutput = [0, 1, 1]
        scaleOutput = [device === "desktop" ? 0.95 : 0.98, 1, 1]
        yOutput = [device === "desktop" ? 30 : 15, 0, 0]
    } else {
        inputRange = [start, peakStart, peakEnd, end]
        opacityOutput = [0, 1, 1, 0]
        scaleOutput = [device === "desktop" ? 0.95 : 0.98, 1, 1, device === "desktop" ? 1.05 : 1.02]
        yOutput = [device === "desktop" ? 30 : 15, 0, 0, device === "desktop" ? -30 : -15]
    }

    const opacity = useTransform(progress, inputRange, opacityOutput)
    const scale = useTransform(progress, inputRange, scaleOutput)
    const y = useTransform(progress, inputRange, yOutput)

    return { opacity, scale, y }
}
