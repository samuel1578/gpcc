"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Quote } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Testimony } from "@/lib/types/database"

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface TestimoniesListProps {
    testimonies: Testimony[]
}

export function TestimoniesList({ testimonies }: TestimoniesListProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null)

    const slug = searchParams.get("slug")

    useEffect(() => {
        if (slug) {
            const testimony = testimonies.find((t) => t.slug === slug)
            if (testimony) {
                setSelectedTestimony(testimony)
            }
        } else {
            setSelectedTestimony(null)
        }
    }, [slug, testimonies])

    useEffect(() => {
        if (selectedTestimony) {
            const prev = document.body.style.overflow
            document.body.style.overflow = "hidden"
            document.body.classList.add("modal-active")
            return () => {
                document.body.style.overflow = prev
                document.body.classList.remove("modal-active")
            }
        }
    }, [selectedTestimony])

    const handleOpen = (t: Testimony) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("slug", t.slug)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const handleClose = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("slug")
        const query = params.toString()
        router.push(query ? `?${query}` : "/about/testimonies", { scroll: false })
    }

    const isMobile = useIsMobile()

    if (testimonies.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-24 text-center">
                <p className="text-ink-muted">No stories shared yet. Check back soon.</p>
            </div>
        )
    }

    // Group testimonies by category
    const groupedBy = testimonies.reduce((acc, t) => {
        const cat = t.category || "other"
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(t)
        return acc
    }, {} as Record<string, Testimony[]>)

    const categoryTitleMap: Record<string, string> = {
        book: "Book Testimonies",
        ministry: "More Testimonies From Our Ministry",
        healing: "Healing Testimonies",
        other: "Other Testimonies"
    }

    return (
        <div className="space-y-24 py-20">
            {Object.entries(groupedBy).map(([category, items]) => (
                <section
                    key={category}
                    id={category === "book" ? "book-testimonies" : undefined}
                    className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10"
                >
                    <Reveal className="mb-10">
                        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
                            {categoryTitleMap[category] || category}
                        </h2>
                        <div className="mt-2 h-1 w-20 bg-red-600 rounded-full" />
                    </Reveal>

                    {/* Mobile Swiper */}
                    <div className="md:hidden">
                        <Swiper
                            modules={[Pagination]}
                            slidesPerView={1.15}
                            centeredSlides={true}
                            spaceBetween={16}
                            pagination={{ clickable: true }}
                            className="testimony-swiper-mobile"
                        >
                            {items.map((t) => (
                                <SwiperSlide key={t.id}>
                                    <motion.article
                                        key={t.id}
                                        variants={fadeUp}
                                        transition={{ duration: 0.5, ease }}
                                        whileHover={{ y: -8 }}
                                        onClick={() => handleOpen(t)}
                                        className="group cursor-pointer overflow-hidden rounded-3xl glass-panel hover:shadow-[var(--shadow-elevated)] transition-all duration-300 h-full"
                                    >
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            {t.cover_image_url ? (
                                                <Image
                                                    src={t.cover_image_url}
                                                    alt={t.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                                    <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Story</p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="p-7">
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-bold">
                                                    {t.is_confidential ? "Testimony" : (t.person_role || t.category || "Testimony")}
                                                </p>
                                                <span className="h-px flex-1 bg-black/5" />
                                            </div>
                                            <h3 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:text-red-600 transition-colors">
                                                {t.title}
                                            </h3>
                                            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                                                {t.excerpt}
                                            </p>
                                            <p className="mt-6 text-xs font-semibold text-ink uppercase tracking-wider">
                                                — {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                                            </p>
                                        </div>
                                    </motion.article>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Desktop Grid */}
                    <RevealStagger className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" staggerChildren={0.08}>
                        {items.map((t) => (
                            <motion.article
                                key={t.id}
                                variants={fadeUp}
                                transition={{ duration: 0.5, ease }}
                                whileHover={{ y: -8 }}
                                onClick={() => handleOpen(t)}
                                className="group cursor-pointer overflow-hidden rounded-3xl glass-panel hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    {t.cover_image_url ? (
                                        <Image
                                            src={t.cover_image_url}
                                            alt={t.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                                            <p className="text-ink-muted text-xs uppercase tracking-widest font-semibold opacity-30">GPCC Story</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-bold">
                                            {t.is_confidential ? "Testimony" : (t.person_role || t.category || "Testimony")}
                                        </p>
                                        <span className="h-px flex-1 bg-black/5" />
                                    </div>
                                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink group-hover:text-red-600 transition-colors">
                                        {t.title}
                                    </h3>
                                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                                        {t.excerpt}
                                    </p>
                                    <p className="mt-6 text-xs font-semibold text-ink uppercase tracking-wider">
                                        — {t.is_confidential ? "Confidential" : (t.person_name || "Anonymous")}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </RevealStagger>
                </section>
            ))}

            {/* Testimony Modal */}
            <AnimatePresence>
                {selectedTestimony && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-[#f5f3ee] shadow-2xl flex flex-col"
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-6 right-6 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-ink hover:bg-white/40 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className={isMobile ? "flex flex-col flex-1 min-h-0 overflow-hidden" : "overflow-y-auto custom-scrollbar"}>
                                <div className={`relative aspect-[21/9] w-full ${isMobile ? "shrink-0" : ""}`}>
                                    {selectedTestimony.cover_image_url ? (
                                        <Image
                                            src={selectedTestimony.cover_image_url}
                                            alt={selectedTestimony.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1200px) 100vw, 1200px"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-red-600/10" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ee] via-transparent to-transparent" />
                                </div>

                                <div className={`px-8 pb-16 pt-4 lg:px-16 lg:pb-24 ${isMobile ? "flex-1 overflow-y-auto custom-scrollbar" : ""}`}>
                                    <div className="max-w-3xl mx-auto">
                                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">
                                            {selectedTestimony.is_confidential ? "Story of Faith" : (selectedTestimony.person_role || selectedTestimony.category || "Story of Faith")}
                                        </p>
                                        <h2 className="mt-4 font-display text-3xl lg:text-5xl font-bold text-ink leading-tight">
                                            {selectedTestimony.title}
                                        </h2>

                                        <div className="mt-8 flex items-center gap-4 border-y border-black/5 py-6">
                                            <div className="h-12 w-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                                                <Quote className="h-6 w-6 fill-current" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-ink">
                                                    {selectedTestimony.is_confidential ? "Confidential" : (selectedTestimony.person_name || "Anonymous")}
                                                </p>
                                                {selectedTestimony.scripture_reference && (
                                                    <p className="text-xs text-ink-muted italic">{selectedTestimony.scripture_reference}</p>
                                                )}
                                            </div>
                                        </div>

                                        {selectedTestimony.quote && (
                                            <blockquote className="mt-10 text-xl lg:text-2xl font-display italic text-ink border-l-4 border-red-600 pl-6 leading-relaxed">
                                                "{selectedTestimony.quote}"
                                            </blockquote>
                                        )}

                                        <div className="mt-10 prose prose-slate max-w-none">
                                            {selectedTestimony.content ? (
                                                <div className="whitespace-pre-wrap text-ink-muted body-lg leading-relaxed">
                                                    {selectedTestimony.content}
                                                </div>
                                            ) : (
                                                <p className="text-ink-muted body-lg leading-relaxed">{selectedTestimony.excerpt}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .testimony-swiper-mobile {
                    padding-bottom: 48px !important;
                    overflow: visible !important;
                }
                .testimony-swiper-mobile .swiper-pagination {
                    bottom: 0px !important;
                }
                .testimony-swiper-mobile .swiper-pagination-bullet {
                    background: #000 !important;
                    opacity: 0.15 !important;
                    width: 6px;
                    height: 6px;
                    transition: all 0.3s ease;
                }
                .testimony-swiper-mobile .swiper-pagination-bullet-active {
                    background: #dc2626 !important;
                    opacity: 1 !important;
                    width: 20px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
}
