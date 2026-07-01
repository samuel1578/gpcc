"use client"

import { motion } from "framer-motion"
import { Monitor, Users, Music } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection } from "@/components/design-mode/editable"
import { useIsMobile } from "@/hooks/use-mobile"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const items: { name: string; icon: LucideIcon; description: string; image: string }[] = [
    {
        name: "Media Ministry",
        icon: Monitor,
        description: "Capturing and sharing the message of Christ through digital platforms and visual excellence.",
        image: "/images/ministries/mediaministry.jpg"
    },
    {
        name: "Ushering Ministry",
        icon: Users,
        description: "Creating a welcoming environment and ensuring order and comfort for every worshipper.",
        image: "/images/ministries/usheringministry.jpg"
    },
    {
        name: "Angelic Voices/Choir Ministry",
        icon: Music,
        description: "Leading the congregation into the presence of God through spirit-filled music and worship.",
        image: "/images/ministries/choirministry.jpeg"
    },
]

export function ServiceMinistriesGrid() {
    const isMobile = useIsMobile()

    return (
        <EditableSection
            id="ministries.service-grid"
            label="Service Ministries"
            pageKey="ministries"
            className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-0 pb-10 lg:py-20"
        >
            <Reveal className="mx-auto max-w-2xl text-center">
                <div className="inline-block px-6 py-4 lg:px-8 lg:py-6 rounded-3xl glass-panel">
                    <p className="label-cap text-[var(--accent-deep)]">Service Ministries</p>
                    <h2 className="mt-3 h-section text-ink">Serving with excellence.</h2>
                </div>
            </Reveal>

            <div className="mt-5 lg:mt-12">
                {isMobile ? (
                    <div className="service-carousel-wrapper relative">
                        <Swiper
                            modules={[Pagination]}
                            pagination={{
                                el: ".service-ministries-pagination",
                                clickable: true,
                                bulletClass: "swiper-pagination-bullet !bg-red-600/20 !opacity-100 !h-1.5 !w-1.5 !rounded-full transition-all duration-300",
                                bulletActiveClass: "swiper-pagination-bullet-active !bg-red-600 !w-6",
                            }}
                            spaceBetween={20}
                            slidesPerView={1.1}
                            centeredSlides={true}
                            className="!overflow-visible"
                        >
                            {items.map((m) => (
                                <SwiperSlide key={m.name}>
                                    <motion.article
                                        variants={fadeUp}
                                        className="overflow-hidden rounded-3xl glass-panel flex flex-col h-full pb-12"
                                    >
                                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                                            <Image
                                                src={m.image}
                                                alt={m.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 450px"
                                            />
                                        </div>
                                        <div className="p-6 sm:p-7">
                                            <h3 className="font-display text-2xl font-semibold text-ink">{m.name}</h3>
                                            <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{m.description}</p>
                                        </div>
                                    </motion.article>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Pagination Container - Absolutely positioned INSIDE the card's visual area */}
                        <div className="service-ministries-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-none" />
                    </div>
                ) : (
                    <RevealStagger
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                        staggerChildren={0.06}
                    >
                        {items.map((m) => (
                            <motion.article
                                key={m.name}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                className="overflow-hidden rounded-3xl glass-panel flex flex-col"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                                    <Image
                                        src={m.image}
                                        alt={m.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                                    />
                                </div>
                                <div className="p-6 sm:p-7">
                                    <h3 className="font-display text-2xl font-semibold text-ink">{m.name}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{m.description}</p>
                                </div>
                            </motion.article>
                        ))}
                    </RevealStagger>
                )}
            </div>
        </EditableSection>
    )
}
