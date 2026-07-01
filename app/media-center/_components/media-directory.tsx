"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { PageContainer } from "@/components/layout/page-container"
import { PublicationModal } from "./publication-modal"
import { MagazineModal } from "./magazine-modal"

export function MediaDirectory() {
    return (
        <section className="py-20 md:py-28">
            <PageContainer>
                <div className="w-full rounded-3xl glass-panel px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]">
                    <Reveal className="mx-auto max-w-3xl text-center mb-16">
                        <p className="font-display font-semibold text-red-600 uppercase tracking-widest text-sm">
                            GPCC Resources
                        </p>
                        <h2 className="mt-3 h-section text-ink">
                            Explore Our Media Resources
                        </h2>
                    </Reveal>

                    <RevealStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start" staggerChildren={0.1}>
                        {/* Card 1 — Sermons */}
                        <motion.article
                            variants={fadeUp}
                            transition={{ duration: 0.5, ease }}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                            className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[380px]"
                        >
                            <div>
                                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-6 shadow-sm">
                                    <Image
                                        src="/images/media/solemntime.webp"
                                        alt="Sermons"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
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
                            className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[280px]"
                        >
                            <div>
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
                            className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-shadow duration-300 p-8 min-h-[280px]"
                        >
                            <div>
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
            </PageContainer>
        </section>
    )
}
