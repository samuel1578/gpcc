"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { MINISTRIES } from "@/lib/site"
import { PillButton } from "@/components/ui/pill-button"
import { cn } from "@/lib/utils"

export function MinistriesScroll() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const count = MINISTRIES.length + 1

    // 1. Scroll Tracking & Inertial Smoothing
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end end"]
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
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
            style={{ height: `${count * 60}vh` }}
        >
            {/* Sticky Viewport Container */}
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center z-10">

                {/* 1. DESKTOP LAYOUT (lg+) */}
                <div className="hidden lg:flex h-full w-full items-center justify-center px-8 lg:px-12">
                    <div className="w-full max-w-[1600px] overflow-hidden rounded-3xl glass-panel-strong border-white/10 shadow-2xl">
                        <div className="grid min-h-[75vh] xl:min-h-[85vh] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[1.2fr_1fr]">
                            <div className="relative h-full overflow-hidden">
                                {MINISTRIES.map((m, index) => (
                                    <DesktopMedia
                                        key={m.name}
                                        image={m.image || "/images/media/men-ministry.webp"}
                                        alt={m.name}
                                        index={index}
                                        count={count}
                                        progress={smoothProgress}
                                    />
                                ))}
                                <DesktopMedia
                                    key="cta-media"
                                    image="/images/media/MINCTA.jpg"
                                    alt="Find Your Place"
                                    index={MINISTRIES.length}
                                    count={count}
                                    progress={smoothProgress}
                                />
                            </div>
                            <div className="relative flex h-full items-center justify-center" style={{ padding: "clamp(1.5rem,4vw,6rem)" }}>
                                {MINISTRIES.map((m, index) => (
                                    <DesktopText
                                        key={m.name}
                                        index={index}
                                        count={count}
                                        progress={smoothProgress}
                                        isActive={activeIndex === index}
                                    >
                                        <div className="w-full max-w-[640px] text-center mx-auto">
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
                                        </div>
                                    </DesktopText>
                                ))}
                                <DesktopText
                                    key="cta-text"
                                    index={MINISTRIES.length}
                                    count={count}
                                    progress={smoothProgress}
                                    isActive={activeIndex === MINISTRIES.length}
                                >
                                    <div className="w-full max-w-[800px] text-center mx-auto">
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
                                    </div>
                                </DesktopText>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. MOBILE/TABLET LAYOUT (<lg) */}
                <div className="flex lg:hidden h-full w-full flex-col justify-center gap-3 pt-[72px] pb-6 px-6 z-10">

                    {/* Heading Card */}
                    <div className="w-full rounded-2xl glass-panel px-6 py-4 text-center shrink-0">
                        <p className="font-display font-semibold text-red-600 text-lg">
                            Our Ministries
                        </p>
                        <h2 className="mt-1 font-display font-semibold text-ink leading-tight"
                            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}>
                            Find your people. Find your purpose.
                        </h2>
                    </div>

                    {/* Sticky Media Panel (Top 40%) */}
                    <div className="relative w-full h-[30vh] rounded-2xl overflow-hidden glass-panel shadow-xl">
                        {MINISTRIES.map((m, index) => (
                            <MobileMedia
                                key={m.name}
                                image={m.image || "/images/media/men-ministry.webp"}
                                alt={m.name}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                            />
                        ))}
                        <MobileMedia
                            key="cta-media"
                            image="/images/media/MINCTA.jpg"
                            alt="Find Your Place"
                            index={MINISTRIES.length}
                            count={count}
                            progress={smoothProgress}
                        />
                    </div>

                    {/* Narrative Text Panel (Bottom 55%) */}
                    <div className={`relative w-full rounded-2xl glass-panel shadow-lg flex flex-col justify-center overflow-hidden ${activeIndex === MINISTRIES.length ? "h-[58vh]" : "h-[36vh]"}`}>
                        {MINISTRIES.map((m, index) => (
                            <MobileText
                                key={m.name}
                                index={index}
                                count={count}
                                progress={smoothProgress}
                                isActive={activeIndex === index}
                                className="inset-y-4 space-y-3 overflow-hidden items-center text-center"
                            >
                                <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">{m.name}</p>
                                <h3 className="font-display font-bold leading-tight text-ink text-xl">{m.name}</h3>
                                <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">{m.description}</p>
                                <Link
                                    href="/ministries"
                                    tabIndex={activeIndex === index ? 0 : -1}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-deep)] hover:underline mx-auto"
                                >
                                    Explore <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </MobileText>
                        ))}
                        <MobileText
                            key="cta-text"
                            index={MINISTRIES.length}
                            count={count}
                            progress={smoothProgress}
                            isActive={activeIndex === MINISTRIES.length}
                            className="pb-2 items-center text-center"
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
                        </MobileText>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute right-3 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {Array.from({ length: count }).map((_, index) => {
                        const isActive = activeIndex === index
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (containerRef.current) {
                                        const viewportHeight = window.innerHeight
                                        const offsetTop = containerRef.current.offsetTop
                                        const scrollHeight = containerRef.current.scrollHeight
                                        const p = index / count

                                        // Calculate the scroll position based on the same offset logic as useScroll
                                        // offset: ["start 10%", "end end"]
                                        // p = 0 => window.scrollY = offsetTop - 0.1 * viewportHeight
                                        // p = 1 => window.scrollY = offsetTop + scrollHeight - viewportHeight
                                        const scrollTarget = (offsetTop - 0.1 * viewportHeight) + p * (scrollHeight - 0.9 * viewportHeight)

                                        window.scrollTo({
                                            top: scrollTarget,
                                            behavior: "smooth"
                                        })
                                    }
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
            </div>
        </div>
    )
}

/**
 * Child components for clean organization and Hook compliance
 */

interface SlideProps {
    index: number
    count: number
    progress: MotionValue<number>
}

interface MediaProps extends SlideProps {
    image: string
    alt: string
}

function DesktopMedia({ image, alt, index, count, progress }: MediaProps) {
    const { opacity, x, scale } = getSlideTransforms(progress, index, count, "desktop")
    return (
        <motion.div
            style={{ opacity, x, scale }}
            className="absolute inset-0 w-full h-full"
        >
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover object-[center_20%]"
                unoptimized
                sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
    )
}

interface TextProps extends SlideProps {
    isActive: boolean
    children: React.ReactNode
    className?: string
}

function DesktopText({ index, count, progress, isActive, children, className }: TextProps) {
    const { opacity, x } = getSlideTransforms(progress, index, count, "desktop")
    return (
        <motion.div
            style={{ opacity, x }}
            aria-hidden={!isActive}
            className={cn("absolute inset-0 flex items-center justify-center", className)}
        >
            {children}
        </motion.div>
    )
}

function MobileMedia({ image, alt, index, count, progress }: MediaProps) {
    const { opacity, x } = getSlideTransforms(progress, index, count, "mobile")
    return (
        <motion.div
            style={{ opacity, x }}
            className="absolute inset-0 w-full h-full"
        >
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
                sizes="90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
    )
}

function MobileText({ index, count, progress, isActive, children, className }: TextProps) {
    const { opacity, x } = getSlideTransforms(progress, index, count, "mobile")
    return (
        <motion.div
            style={{ opacity, x }}
            aria-hidden={!isActive}
            className={cn("absolute inset-x-5 flex flex-col justify-center space-y-4", className)}
        >
            {children}
        </motion.div>
    )
}

/**
 * Shared motion logic for horizontal transitions
 */
function getSlideTransforms(
    progress: MotionValue<number>,
    index: number,
    count: number,
    device: "desktop" | "mobile"
) {
    const W = 1 / count
    const mid = (index + 0.5) * W

    const start = Math.max(0, mid - 0.6 * W)
    const peakStart = Math.max(0, mid - 0.2 * W)
    const peakEnd = Math.min(1, mid + 0.2 * W)
    const end = Math.min(1, mid + 0.6 * W)

    let inputRange: number[]
    let opacityOutput: number[]
    let scaleOutput: number[]
    let xOutput: number[]

    // Horizontal sweep distance
    const sweep = device === "desktop" ? 60 : 40

    if (index === 0) {
        inputRange = [0, peakEnd, end]
        opacityOutput = [1, 1, 0]
        scaleOutput = [1, 1, 1.05]
        xOutput = [0, 0, -sweep] // Exit to left
    } else if (index === count - 1) {
        inputRange = [start, peakStart, 1]
        opacityOutput = [0, 1, 1]
        scaleOutput = [0.95, 1, 1]
        xOutput = [sweep, 0, 0] // Enter from right
    } else {
        inputRange = [start, peakStart, peakEnd, end]
        opacityOutput = [0, 1, 1, 0]
        scaleOutput = [0.95, 1, 1, 1.05]
        xOutput = [sweep, 0, 0, -sweep] // Enter from right, exit to left
    }

    const opacity = useTransform(progress, inputRange, opacityOutput)
    const scale = useTransform(progress, inputRange, scaleOutput)
    const x = useTransform(progress, inputRange, xOutput)

    return { opacity, scale, x }
}
