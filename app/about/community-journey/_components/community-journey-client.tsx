"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { PageTransition } from "@/components/motion/page-transition"
import { ParallaxContent } from "@/components/layout/parallax-content"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { journeyEntries, JourneyPhoto } from "@/lib/community-journey-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { JourneyLightbox } from "./journey-lightbox"

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export function CommunityJourneyClient() {
    const [lightbox, setLightbox] = React.useState<{
        isOpen: boolean
        photos: JourneyPhoto[]
        currentIndex: number
    }>({
        isOpen: false,
        photos: [],
        currentIndex: 0,
    })

    const [activeYear, setActiveYear] = React.useState<string>(journeyEntries[0].id)
    const timelineRef = React.useRef<HTMLDivElement>(null)

    // Scroll progress for vertical rail
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 20%", "end 80%"]
    })

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Intersection Observer for Scroll-Spy (Year Chips)
    React.useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveYear(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        journeyEntries.forEach((entry) => {
            const el = document.getElementById(entry.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const handlePhotoClick = (photos: JourneyPhoto[], index: number) => {
        setLightbox({
            isOpen: true,
            photos,
            currentIndex: index,
        })
    }

    return (
        <PageTransition>
            {/* Spacer matching header height */}
            <div className="h-[72px] lg:h-[80px] xl:h-[96px]" />

            <section className="relative w-full bg-[#badcf7] min-h-screen">
                <div className="mx-auto w-full max-w-[1400px] px-6 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Left Column: Intro & Navigation */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <div className="space-y-8">
                                <div>
                                    <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                                        Our Journey Through Faith and Community
                                    </h1>
                                    <p className="mt-6 text-lg text-slate-700 leading-relaxed">
                                        Global Peace Christian Centre has a rich history of service and community engagement. Scroll to relive our milestones and achievements.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="/media-center"
                                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                                    >
                                        View all Photos in the Media Center
                                    </Link>
                                </div>

                                {/* Year Chip Nav */}
                                <div className="pt-8">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Jump to Year</p>
                                    <div className="flex flex-wrap gap-2">
                                        {journeyEntries.map((entry) => {
                                            const isActive = activeYear === entry.id
                                            return (
                                                <Link
                                                    key={entry.id}
                                                    href={`#${entry.id}`}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                                        isActive
                                                            ? "bg-slate-900 border-slate-900 text-white shadow-md"
                                                            : "border-slate-300 bg-white/50 text-slate-700 hover:bg-white hover:border-slate-400"
                                                    )}
                                                >
                                                    {entry.year.includes(" ") ? entry.year.split(" ").pop() : entry.year}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Timeline */}
                        <div ref={timelineRef} className="lg:col-span-8 relative">
                            {/* Vertical Rail (Base) */}
                            <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-slate-300/60" />

                            {/* Vertical Rail (Progress Fill) */}
                            <motion.div
                                className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-slate-900 origin-top z-20"
                                style={{ scaleY }}
                            />

                            <div className="space-y-16 lg:space-y-24">
                                {journeyEntries.map((entry) => {
                                    // Combine heroImage and galleryPhotos into a single sequence
                                    const combinedPhotos: JourneyPhoto[] = [
                                        ...(entry.heroImage ? [{
                                            src: entry.heroImage,
                                            alt: entry.pill ? `${entry.year} — ${entry.pill}` : `${entry.year} highlight`
                                        }] : []),
                                        ...entry.galleryPhotos
                                    ].filter(p => p.src !== undefined);

                                    const hasPhotos = combinedPhotos.length > 0;
                                    const hasAccordion = entry.readMoreText !== "" || hasPhotos;

                                    return (
                                        <div key={entry.id} id={entry.id} className="relative pl-12 lg:pl-24">
                                            {/* Dot Marker */}
                                            <div className={cn(
                                                "absolute left-4 lg:left-8 top-2 -translate-x-1/2 size-4 rounded-full border-4 border-[#badcf7] transition-colors duration-300 z-30",
                                                activeYear === entry.id ? "bg-slate-900" : "bg-slate-400"
                                            )} />

                                            <div className="space-y-4">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
                                                        {entry.year}
                                                    </h2>
                                                    {entry.pill && (
                                                        <Badge variant="secondary" className="bg-white/80 text-slate-700 border-slate-200">
                                                            {entry.pill}
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="overflow-hidden rounded-3xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm">
                                                    {/* Hero Image */}
                                                    {entry.heroImage && (
                                                        <div className="relative aspect-video w-full overflow-hidden">
                                                            <Image
                                                                src={entry.heroImage}
                                                                alt={entry.year}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 1024px) 100vw, 800px"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="p-6 lg:p-8 space-y-6">
                                                        <p className="text-lg text-slate-800 leading-relaxed">
                                                            {entry.summary}
                                                        </p>

                                                        {hasAccordion && (
                                                            <Accordion type="single" collapsible className="w-full">
                                                                <AccordionItem value="details" className="border-none">
                                                                    <AccordionTrigger className="py-2 text-slate-900 hover:no-underline font-semibold text-base justify-start gap-2 outline-none">
                                                                        {entry.readMoreLabel}
                                                                    </AccordionTrigger>
                                                                    <AccordionContent className="pt-4 space-y-8">
                                                                        {entry.readMoreText && (
                                                                            <p className="text-slate-700 leading-relaxed">
                                                                                {entry.readMoreText}
                                                                            </p>
                                                                        )}

                                                                        {/* Photo Gallery Section */}
                                                                        {hasPhotos && (
                                                                            <div className="space-y-4">
                                                                                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                                                                                    Photo Highlights
                                                                                </h4>

                                                                                {/* Mobile Carousel (< sm) */}
                                                                                <div className="sm:hidden -mx-6 px-6">
                                                                                    <Swiper
                                                                                        modules={[Pagination, Autoplay]}
                                                                                        spaceBetween={12}
                                                                                        slidesPerView={1.15}
                                                                                        autoplay={{ delay: 2200, disableOnInteraction: false }}
                                                                                        pagination={{ clickable: true }}
                                                                                        className="pb-10 !overflow-visible"
                                                                                    >
                                                                                        {combinedPhotos.map((photo, idx) => (
                                                                                            <SwiperSlide key={idx}>
                                                                                                <button
                                                                                                    onClick={() => handlePhotoClick(combinedPhotos, idx)}
                                                                                                    className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-200 outline-none"
                                                                                                >
                                                                                                    <Image
                                                                                                        src={photo.src!}
                                                                                                        alt={photo.alt}
                                                                                                        fill
                                                                                                        className="object-cover"
                                                                                                        loading="lazy"
                                                                                                        sizes="85vw"
                                                                                                    />
                                                                                                </button>
                                                                                            </SwiperSlide>
                                                                                        ))}
                                                                                    </Swiper>
                                                                                </div>

                                                                                {/* Desktop Grid (sm:) */}
                                                                                <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                                                    {combinedPhotos.map((photo, idx) => (
                                                                                        <button
                                                                                            key={idx}
                                                                                            onClick={() => handlePhotoClick(combinedPhotos, idx)}
                                                                                            className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 group outline-none"
                                                                                        >
                                                                                            <Image
                                                                                                src={photo.src!}
                                                                                                alt={photo.alt}
                                                                                                fill
                                                                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                                                                loading="lazy"
                                                                                                sizes="(max-width: 768px) 33vw, 200px"
                                                                                            />
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <ParallaxContent>
                {/* Optional additional sections */}
            </ParallaxContent>

            <JourneyLightbox
                isOpen={lightbox.isOpen}
                onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
                photos={lightbox.photos}
                currentIndex={lightbox.currentIndex}
                onIndexChange={(index) => setLightbox(prev => ({ ...prev, currentIndex: index }))}
            />
        </PageTransition>
    )
}
