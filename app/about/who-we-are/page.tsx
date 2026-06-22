"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, CheckCircle2 } from "lucide-react"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { Reveal } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection } from "@/components/design-mode/editable"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export default function WhoWeArePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const isMobile = useIsMobile()
    const shouldReduceMotion = useReducedMotion()

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    const mProps = (props: any) => shouldReduceMotion === true ? {
        initial: false,
        animate: typeof props.animate === 'object' && !Array.isArray(props.animate) ? props.animate : props.animate,
        whileInView: typeof props.whileInView === 'object' ? props.whileInView : props.whileInView,
    } : props

    const stats = [
        { number: "1990", label: "The Calling" },
        { number: "1996", label: "Fellowship Began" },
        { number: "2013", label: "Church Founded" },
        { number: "4+", label: "Ministries" },
    ]

    const philosophyText = "Christians must excel in all their endeavours and reflect the light and love of God."

    return (
        <>
            <section className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-[#BADCF7] pt-28 lg:pt-32 xl:pt-36 pb-0 text-center lg:text-left">
                {/* Watermark/Hero Image */}
                <motion.div
                    {...mProps({
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { duration: 0.6, delay: 0.1 }
                    })}
                    className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:justify-end lg:pr-[10%] xl:pr-[15%]"
                    aria-hidden="true"
                >
                    <div className="relative h-[55%] lg:h-[65%] max-h-[600px] w-[60%] lg:w-[45%] max-w-[700px] opacity-20 lg:opacity-25 lg:translate-y-12">
                        <Image
                            src="/images/media/outlene.webp"
                            alt=""
                            fill
                            className="object-contain object-center lg:object-right"
                            unoptimized={true}
                            sizes="(max-width: 1024px) 60vw, 45vw"
                        />
                    </div>
                </motion.div>

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
                        WHO WE ARE
                    </motion.p>
                    <motion.h2
                        {...mProps({
                            initial: { opacity: 0, y: isMobile ? 8 : 16 },
                            animate: { opacity: 1, y: 0 },
                            transition: { duration: 0.7, delay: 0.35, ease: "easeOut" }
                        })}
                        className="h-display mt-4 text-slate-900"
                    >
                        Global Peace Christian Centre
                    </motion.h2>
                    <motion.p
                        {...mProps({
                            initial: { opacity: 0, y: isMobile ? 6 : 12 },
                            animate: { opacity: 1, y: 0 },
                            transition: { duration: 0.5, delay: 0.55, ease: "easeOut" }
                        })}
                        className="h-sub mt-4 text-slate-800/80"
                    >
                        Our story, our faith, our purpose
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

            <ParallaxContent>
                {/* Section 1 — Our Origin */}
                <EditableSection
                    id="who-we-are.origin"
                    label="Our Origin"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: isMobile ? { opacity: 0, y: 16 } : { opacity: 0, x: -24 },
                            whileInView: { opacity: 1, x: 0, y: 0 },
                            transition: { duration: isMobile ? 0.5 : 0.65, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="mx-auto w-full overflow-hidden rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
                    >
                        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col lg:flex-row gap-10 lg:gap-[clamp(2rem,5vw,8rem)]">
                            <div className="lg:w-[35%]">
                                <p className="label-cap text-red-600 lg:text-lg lg:font-bold lg:underline lg:underline-offset-4">Our Story</p>
                                <h2 className="mt-3 h-section text-ink">
                                    The Coming Into Being of <br className="hidden lg:block" />
                                    Global Peace <br className="hidden lg:block" />
                                    Christian Centre
                                </h2>
                            </div>
                            <div className="flex-1 space-y-8">
                                <p className="body-lg text-ink-muted" style={isMobile ? { lineHeight: 1.5 } : {}}>
                                    In September 1990, The Lord called Pastor Henry Ampoomah-Boateng —
                                    OUR FOUNDER AND CHAIRMAN. It was during his final year (level 400)
                                    and final day as a student of KNUST, formerly University of Science
                                    and Technology, Kumasi, Ghana. He yielded to the calling in June 1994
                                    and commenced his fellowship in June 1996 — leading to the formation
                                    and establishment of Global Peace Christian Centre, a church
                                    organization, in September 2013.
                                </p>

                                <div className="relative overflow-hidden rounded-2xl border-l-4 border-red-600 bg-white/50 p-6 shadow-sm sm:p-8 lg:p-10">
                                    <p className="body-lg italic text-ink" style={isMobile ? { lineHeight: 1.5 } : {}}>
                                        &quot;You may read the call of Pastor Henry Ampomah-Boateng in his maiden
                                        book titled &apos;JESUS WALKS INTO MY ROOM&apos;&quot;
                                    </p>
                                </div>

                                {/* Book Showcase */}
                                <div className="mt-12 flex flex-col items-center gap-8 rounded-3xl glass-panel-subtle p-8 sm:flex-row sm:items-start lg:p-12">
                                    <motion.div
                                        {...mProps({
                                            initial: { scale: 0.92, opacity: 0 },
                                            whileInView: { scale: 1, opacity: 1 },
                                            transition: { duration: 0.6, ease: "easeOut" },
                                            viewport: { once: true, margin: "-10%" }
                                        })}
                                        className="relative h-[clamp(200px,15vw,300px)] w-[clamp(130px,10vw,200px)] shrink-0 overflow-hidden rounded-lg shadow-lg"
                                    >
                                        <motion.div
                                            {...mProps({
                                                animate: { y: [0, -8, 0] },
                                                transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                                            })}
                                            className="relative h-full w-full"
                                        >
                                            <Image
                                                src="/images/media/jwimr.jpg"
                                                alt="Jesus Walks Into My Room Book Cover"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                                sizes="(max-width: 640px) 130px, 200px"
                                            />
                                        </motion.div>
                                    </motion.div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="h-sub text-ink" style={{ fontSize: "clamp(1.5rem, 2vw, 2.5rem)" }}>Jesus Walks Into My Room</h3>
                                        <p className="mt-2 body-lg text-ink-muted" style={isMobile ? { lineHeight: 1.5 } : {}}>The story of a divine encounter that changed everything.</p>
                                        <p className="mt-4 label-cap text-red-600" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.25rem)" }}>GHS 40.00</p>
                                        <div className="mt-6">
                                            <PillButton onClick={() => setIsModalOpen(true)} variant="primary" size="fluid" className="max-w-xs">
                                                Order Your Copy
                                            </PillButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </EditableSection>

                {/* Section 2 — Our Mission */}
                <EditableSection
                    id="who-we-are.mission"
                    label="Our Mission"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: { opacity: 0, y: isMobile ? 16 : 20 },
                            whileInView: { opacity: 1, y: 0 },
                            transition: { duration: isMobile ? 0.5 : 0.65, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="mx-auto w-full overflow-hidden rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
                    >
                        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col lg:flex-row gap-10 lg:gap-[clamp(2rem,5vw,8rem)]">
                            <div className="lg:w-[35%]">
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0 },
                                        whileInView: { opacity: 1 },
                                        transition: { duration: 0.4 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="label-cap text-red-600 lg:text-lg lg:font-bold lg:underline lg:underline-offset-4"
                                >
                                    Our Mission
                                </motion.p>
                                <motion.h2
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 10 : 20 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: { duration: 0.55, delay: 0.1 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="mt-3 h-section text-ink"
                                >
                                    Carrying the Great Commission Forward
                                </motion.h2>
                            </div>
                            <div className="relative flex-1">
                                <motion.div
                                    {...mProps({
                                        initial: { scaleY: 0 },
                                        whileInView: { scaleY: 1 },
                                        transition: { duration: 0.4, delay: 0.5, ease: "easeOut" },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="absolute left-0 top-0 h-full w-1 origin-top bg-red-600 lg:w-1.5"
                                />
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 8 : 16 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: { duration: 0.55, delay: 0.25 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="pl-6 body-lg text-ink-muted"
                                    style={isMobile ? { lineHeight: 1.5 } : {}}
                                >
                                    The GPCC Ministry exists to carry out the great commission of our
                                    Lord Jesus Christ. To &apos;Go into all the world and preach the good news
                                    to all creation.&apos; — Mark 16:15 [NIV]
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </EditableSection>

                {/* Section — Community Showcase */}
                <EditableSection
                    id="who-we-are.showcase"
                    label="Community Showcase"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: { opacity: 0, y: isMobile ? 16 : 20 },
                            whileInView: { opacity: 1, y: 0 },
                            transition: { duration: isMobile ? 0.5 : 0.65, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="relative mx-auto w-full overflow-hidden rounded-3xl shadow-2xl"
                    >
                        <div className="group relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
                            <Image
                                src="/images/media/happychurch.webp"
                                alt="GPCC Community Fellowship"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 92vw"
                                priority
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                        </div>
                    </motion.div>
                </EditableSection>

                {/* Section 3 — Our Vision */}
                <EditableSection
                    id="who-we-are.vision"
                    label="Our Vision"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: isMobile ? { opacity: 0, y: 16 } : { opacity: 0, x: 24 },
                            whileInView: { opacity: 1, x: 0, y: 0 },
                            transition: { duration: isMobile ? 0.5 : 0.65, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="mx-auto w-full overflow-hidden rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
                    >
                        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col lg:flex-row gap-10 lg:gap-[clamp(2rem,5vw,8rem)]">
                            <div className="lg:w-[35%]">
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0 },
                                        whileInView: { opacity: 1 },
                                        transition: { duration: 0.4 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="label-cap text-red-600 lg:text-lg lg:font-bold lg:underline lg:underline-offset-4"
                                >
                                    Our Vision
                                </motion.p>
                                <motion.h2
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 10 : 20 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: { duration: 0.55, delay: 0.1 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="mt-3 h-section text-ink"
                                >
                                    A Global Prophetic Healing and Teaching Ministry
                                </motion.h2>
                            </div>
                            <div className="flex-1">
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 8 : 16 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: { duration: 0.55, delay: 0.25 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="body-lg text-ink-muted"
                                    style={isMobile ? { lineHeight: 1.5 } : {}}
                                >
                                    The vision of the church is to become a Global Prophetic Healing and
                                    Teaching Ministry, helping people to know and accept Jesus Christ as
                                    their Lord and personal Saviour — and to understand the Word of God,
                                    empowering them to excel in all their endeavours.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </EditableSection>

                {/* Section 4 — Our Philosophy */}
                <EditableSection
                    id="who-we-are.philosophy"
                    label="Our Philosophy"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: { opacity: 0, y: 16 },
                            whileInView: { opacity: 1, y: 0 },
                            transition: { duration: 0.5, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="mx-auto w-full overflow-hidden rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
                    >
                        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col lg:flex-row gap-10 lg:gap-[clamp(2rem,5vw,8rem)]">
                            <div className="lg:w-[35%]">
                                <p className="label-cap text-red-600 lg:text-lg lg:font-bold lg:underline lg:underline-offset-4">Our Philosophy</p>
                                <h2 className="mt-3 h-section text-ink">Excellence That Reflects His Light</h2>
                            </div>
                            <div className="flex-1">
                                {isMobile ? (
                                    <p className="body-lg text-ink-muted" style={{ lineHeight: 1.5 }}>
                                        {philosophyText}
                                    </p>
                                ) : (
                                    <motion.div
                                        {...mProps({
                                            initial: "initial",
                                            whileInView: "animate",
                                            viewport: { once: true, margin: "-10%" },
                                            variants: {
                                                animate: {
                                                    transition: {
                                                        staggerChildren: 0.04,
                                                        delayChildren: 0.2
                                                    }
                                                }
                                            }
                                        })}
                                        className="body-lg text-ink-muted"
                                    >
                                        {philosophyText.split(" ").map((word, i) => (
                                            <motion.span
                                                key={i}
                                                {...mProps({
                                                    variants: {
                                                        initial: { opacity: 0, y: 8 },
                                                        animate: { opacity: 1, y: 0 }
                                                    }
                                                })}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="inline-block mr-[0.25em]"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </EditableSection>

                {/* Section 5 — Our Belief */}
                <EditableSection
                    id="who-we-are.belief"
                    label="Our Belief"
                    pageKey="who-we-are"
                    className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-10"
                >
                    <motion.div
                        {...mProps({
                            initial: { opacity: 0, y: 16 },
                            whileInView: { opacity: 1, y: 0 },
                            transition: { duration: 0.6, ease: "easeOut" },
                            viewport: { once: true, margin: "-10%" }
                        })}
                        className="mx-auto w-full overflow-hidden rounded-3xl glass-panel-strong px-6 py-10 lg:p-[clamp(2rem,5vw,5rem)]"
                    >
                        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col lg:flex-row gap-10 lg:gap-[clamp(2rem,5vw,8rem)]">
                            <div className="lg:w-[35%]">
                                <p className="label-cap text-red-600 lg:text-lg lg:font-bold lg:underline lg:underline-offset-4">Our Belief</p>
                                <h2 className="mt-3 h-section text-ink">One God. One Truth. One Way.</h2>
                            </div>
                            <div className="flex-1 space-y-6">
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 8 : 16 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: { duration: 0.55, delay: 0.15 },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="body-lg text-ink-muted"
                                    style={isMobile ? { lineHeight: 1.5 } : {}}
                                >
                                    We believe that there is one True God — indefinable, but revealed as
                                    Triune Godhead: God the Father, God the Son, and God the Holy Spirit.
                                    We believe in the divinity of our Lord Jesus Christ, in His virgin
                                    birth, and in His bodily resurrection.
                                </motion.p>
                                <motion.p
                                    {...mProps({
                                        initial: { opacity: 0, y: isMobile ? 8 : 16 },
                                        whileInView: { opacity: 1, y: 0 },
                                        transition: {
                                            duration: 0.55,
                                            delay: isMobile ? 0.3 : 0.4
                                        },
                                        viewport: { once: true, margin: "-10%" }
                                    })}
                                    className="body-lg text-ink-muted"
                                    style={isMobile ? { lineHeight: 1.5 } : {}}
                                >
                                    We believe the Bible to be the inspired Word of God — infallible in
                                    its declaration, final in its authority, all-sufficient in its
                                    provisions and comprehensive in its sufficiency. We believe in
                                    salvation by Grace through faith in the Lord Jesus Christ. We believe
                                    in the return of the Lord Jesus Christ and the resurrection of the
                                    saved and the lost; the saved unto eternal life in the presence of
                                    God, and the unsaved unto eternal damnation.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </EditableSection>
            </ParallaxContent>

            {/* Book Order Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsModalOpen(false)
                                setFormSubmitted(false)
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-panel-strong p-8 shadow-2xl"
                        >
                            <button
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setFormSubmitted(false)
                                }}
                                className="absolute right-6 top-6 text-ink-muted hover:text-ink transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {!formSubmitted ? (
                                <>
                                    <h2 className="h-sub text-ink">Order: Jesus Walks Into My Room</h2>
                                    <p className="mt-2 text-sm text-ink-muted">Please fill in your details to place an order.</p>

                                    <form onSubmit={handleOrderSubmit} className="mt-8 space-y-4">
                                        <div>
                                            <label className="sr-only">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Full Name"
                                                className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm focus:border-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="sr-only">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm focus:border-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="sr-only">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="Phone Number"
                                                className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm focus:border-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="sr-only">Delivery Address</label>
                                            <textarea
                                                required
                                                rows={3}
                                                placeholder="Delivery Address"
                                                className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm focus:border-red-600/50 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                                            />
                                        </div>
                                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                            <PillButton type="submit" variant="primary" className="flex-1">
                                                Submit Order
                                            </PillButton>
                                            <PillButton
                                                onClick={() => setIsModalOpen(false)}
                                                variant="ghost"
                                                className="flex-1"
                                            >
                                                Cancel
                                            </PillButton>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="py-8 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        <CheckCircle2 className="mx-auto h-16 w-16 text-[var(--accent-emerald)]" />
                                    </motion.div>
                                    <h2 className="mt-6 h-sub text-ink">Thank you!</h2>
                                    <p className="mt-4 body-lg text-ink-muted">
                                        Our team will reach out to you shortly to arrange delivery.
                                    </p>
                                    <div className="mt-10">
                                        <PillButton onClick={() => setIsModalOpen(false)} variant="primary" size="md">
                                            Close
                                        </PillButton>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
