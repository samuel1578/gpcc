"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface Stat {
    number: string
    label: string
}

interface PageHeroProps {
    eyebrow: string
    heading: string
    subtitle: string
    stats: Stat[]
}

export function PageHero({ eyebrow, heading, subtitle, stats }: PageHeroProps) {
    const isMobile = useIsMobile()
    const shouldReduceMotion = useReducedMotion()

    const mProps = (props: any) => shouldReduceMotion === true ? {
        initial: false,
        animate: typeof props.animate === 'object' && !Array.isArray(props.animate) ? props.animate : props.animate,
        whileInView: typeof props.whileInView === 'object' ? props.whileInView : props.whileInView,
    } : props

    return (
        <section className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-[#BADCF7] pt-28 lg:pt-32 xl:pt-36 pb-0 text-center lg:text-left">
            {/* Content */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col items-center lg:items-start px-6 pb-20">
                <motion.p
                    {...mProps({
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
                    })}
                    className="label-cap text-slate-800"
                >
                    {eyebrow}
                </motion.p>
                <motion.h2
                    {...mProps({
                        initial: { opacity: 0, y: isMobile ? 8 : 16 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.7, delay: 0.35, ease: "easeOut" }
                    })}
                    className="h-display mt-4 text-slate-900"
                >
                    {heading}
                </motion.h2>
                <motion.p
                    {...mProps({
                        initial: { opacity: 0, y: isMobile ? 6 : 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.55, ease: "easeOut" }
                    })}
                    className="h-sub mt-4 text-slate-800/80"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* Stats Strip */}
            <div className="relative z-10 w-full border-t border-black/[0.15]">
                <div className="mx-auto grid w-full max-w-[2800px] grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            {...mProps({
                                initial: { opacity: 0, y: isMobile ? 6 : 10 },
                                animate: { opacity: 1, y: 0 },
                                transition: {
                                    duration: 0.7,
                                    ease: "easeOut",
                                    delay: isMobile ? 0.65 + index * 0.08 : 0.7 + index * 0.1
                                }
                            })}
                            className="relative flex flex-col items-center justify-center py-8 lg:py-[clamp(2rem,4vh,4rem)] px-4"
                        >
                            <span className="h-sub text-[#1a1a2e]" style={{ fontSize: "clamp(1.25rem, 2vw, 2.5rem)" }}>{stat.number}</span>
                            <span className="label-cap mt-1 text-slate-600/80">{stat.label}</span>

                            {/* Vertical Divider */}
                            {index < stats.length - 1 && (
                                <div
                                    className={cn(
                                        "absolute right-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-black/[0.18]",
                                        index === 1 ? "hidden lg:block" : "block"
                                    )}
                                />
                            )}
                            {/* Mobile/Tablet specific dividers for 2x2 grid - border-t for bottom row */}
                            {index >= 2 && (
                                <div className="absolute left-0 top-0 h-px w-full bg-black/[0.15] lg:hidden" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
