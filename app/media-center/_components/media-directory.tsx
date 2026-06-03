"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mic, BookOpen, Newspaper } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { PublicationModal } from "./publication-modal"
import { MagazineModal } from "./magazine-modal"

export function MediaDirectory() {
    return (
        <section className="py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <Reveal className="mx-auto max-w-3xl text-center mb-16">
                    <p className="font-display font-semibold text-red-600 uppercase tracking-widest text-sm">
                        GPCC Resources
                    </p>
                    <h2 className="mt-3 h-section text-ink">
                        Explore Our Media Resources
                    </h2>
                </Reveal>

                <RevealStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.1}>
                    {/* Card 1 — Sermons */}
                    <motion.article
                        variants={fadeUp}
                        transition={{ duration: 0.5, ease }}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                        className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[380px]"
                    >
                        <div>
                            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-6 group-hover:bg-red-100 transition-colors">
                                <Mic className="size-6" />
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-ink mb-3">
                                Sermons
                            </h3>
                            <p className="body-lg text-ink-muted leading-relaxed">
                                Listen to powerful messages and teachings from our pastors and guest speakers.
                            </p>
                        </div>
                        <div className="mt-8 pt-4">
                            <PillButton href="/media-center/sermons" size="sm" variant="primary">
                                Explore
                            </PillButton>
                        </div>
                    </motion.article>

                    {/* Card 2 — Publications */}
                    <motion.article
                        variants={fadeUp}
                        transition={{ duration: 0.5, ease }}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                        className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[380px]"
                    >
                        <div>
                            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-yellow-50 text-[var(--accent-gold)] mb-6 group-hover:bg-yellow-100 transition-colors">
                                <BookOpen className="size-6" />
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-ink mb-3">
                                Publications
                            </h3>
                            <p className="body-lg text-ink-muted leading-relaxed">
                                Access books, articles, and written resources for spiritual growth and inspiration.
                            </p>
                        </div>
                        <div className="mt-8 pt-4">
                            <PublicationModal />
                        </div>
                    </motion.article>

                    {/* Card 3 — Church Magazines */}
                    <motion.article
                        variants={fadeUp}
                        transition={{ duration: 0.5, ease }}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                        className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[380px]"
                    >
                        <div>
                            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[var(--accent-deep)] mb-6 group-hover:bg-blue-100 transition-colors">
                                <Newspaper className="size-6" />
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-ink mb-3">
                                Church Magazines
                            </h3>
                            <p className="body-lg text-ink-muted leading-relaxed">
                                Read our monthly magazines featuring church news, events, and community stories.
                            </p>
                        </div>
                        <div className="mt-8 pt-4">
                            <MagazineModal />
                        </div>
                    </motion.article>
                </RevealStagger>
            </div>
        </section>
    )
}
