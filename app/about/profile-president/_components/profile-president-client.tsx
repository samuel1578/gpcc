"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ease } from "@/lib/motion"
import { PageContainer } from "@/components/layout/page-container"
import { PillButton } from "@/components/ui/pill-button"

// Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const heroImages = [
    { src: "/images/pastor/headpastore.jpg", alt: "Apostle Henry ministering", position: "50% 20%" },
    { src: "/images/pastor/president-2.jpg", alt: "Ministry moments", position: "50% 25%" },
    { src: "/images/pastor/president-3.jpg", alt: "Worship scene", position: "50% 25%" },
    { src: "/images/pastor/president-4.jpg", alt: "Community outreach", position: "50% 25%" },
]

const overview = [
    { label: "Education", value: "BSc (Hons) Building Technology, UST/KNUST (1986–1990)" },
    { label: "Call to Ministry", value: "Sept 1990 (37 'A' University Hall, Katanga – KNUST)" },
    { label: "Fellowship Start", value: "June 1996" },
    { label: "GPCC Registered", value: "Nov 2003" },
    { label: "Church Commenced", value: "Sept 2013 (first building ready at ABLOR-ADJEI, Ga East, Accra)" },
    { label: "Global Launch (Vision)", value: "Sept 2032" },
]

type TimelineItem = {
    year: string
    paragraphs: string[]
    verse?: { ref: string; text: string }
}

const timeline: TimelineItem[] = [
    {
        year: "1986–1990",
        paragraphs: ["Studied Building Technology (BSc Hons) at UST (now KNUST), Kumasi."],
    },
    {
        year: "September 1990",
        paragraphs: [
            "Called by the Lord on the final day of school at 37A University Hall, Katanga (KNUST).",
            "Premier book: \u201CJesus Walks Into My Room\u201D summarizes this calling.",
        ],
    },
    {
        year: "June–August 1994",
        paragraphs: ["Encounters with the Lord led toward the start of fellowship."],
    },
    {
        year: "June 1996",
        paragraphs: ["Started fellowship: FREEDOM IN CHRIST PRAYER MINISTRY / FREEDOM IN CHRIST CHURCH."],
    },
    {
        year: "November 2003",
        paragraphs: ["Registration of Global Peace Christian Centre (GPCC)."],
    },
    {
        year: "September 2013",
        paragraphs: [
            "Commencement of the church per the Lord\u2019s word; first church building was ready in ABLOR-ADJEI (Ga East, Accra).",
        ],
        verse: {
            ref: "Habakkuk 2:3",
            text: "For the vision is yet for an appointed time; though it tarries, wait for it; it will surely come.",
        },
    },
    {
        year: "2023",
        paragraphs: ["Revelation: the Global Ministry is to be launched in September 2032."],
    },
    {
        year: "September 2032 (Vision)",
        paragraphs: ["Global Ministry Launch of the Global Peace Christian Ministry worldwide."],
        verse: {
            ref: "Matthew 24:14",
            text: "And this gospel of the kingdom will be preached in all the world as a witness to all the nations.",
        },
    },
]

function Verse({ ref, text }: { ref: string; text: string }) {
    return (
        <div className="mt-3 rounded-xl border-l-2 border-[var(--accent-deep)] bg-black/[0.03] px-4 py-3">
            <p className="font-display italic text-sm text-[var(--accent-deep)]">{ref}</p>
            <p className="mt-1 text-sm text-ink-muted leading-relaxed">{text}</p>
        </div>
    )
}

export function ProfilePresidentClient() {
    const router = useRouter()

    return (
        <div className="w-full pt-[112px] lg:pt-[128px] xl:pt-[152px] pb-16">
            <PageContainer>
                {/* Hero carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="relative w-full max-w-5xl mx-auto px-4 sm:px-0"
                >
                    <div className="group relative w-full aspect-[4/5] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)]">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{ prevEl: ".profile-prev", nextEl: ".profile-next" }}
                            pagination={{ clickable: true }}
                            loop
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            className="h-full w-full"
                            slidesPerView={1}
                        >
                            {heroImages.map((img, idx) => (
                                <SwiperSlide key={img.src}>
                                    <div className="relative h-full w-full">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            style={{ objectPosition: img.position }}
                                            sizes="(max-width: 1024px) 100vw, 1024px"
                                            quality={90}
                                            priority={idx === 0}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Bottom gradient overlay for name/title legibility */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        {/* Name + title overlaid on the image */}
                        <div className="absolute inset-x-0 bottom-0 z-10 px-6 py-6 sm:px-10 sm:py-8">
                            <h1
                                className="font-display font-semibold text-white drop-shadow-lg"
                                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}
                            >
                                Apostle Henry Ampomah-Boateng
                            </h1>
                            <p className="mt-1 font-display italic text-white/85 drop-shadow-md">
                                Founder &amp; Chairman — Global Peace Christian Centre (GPCC)
                            </p>
                        </div>
                        <button
                            aria-label="Previous slide"
                            className="profile-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/30 group-hover:left-5"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            aria-label="Next slide"
                            className="profile-next absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/30 group-hover:right-5"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </motion.div>

                {/* Overview + Timeline */}
                <div className="mt-10 grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
                    <motion.aside
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease }}
                        className="lg:col-span-1 rounded-2xl glass-panel-strong p-5 h-fit lg:sticky lg:top-[104px] xl:top-[128px]"
                    >
                        <h2 className="font-display text-xl font-semibold text-red-600 mb-3">Overview</h2>
                        <ul className="space-y-2.5 text-sm text-ink-muted">
                            {overview.map((item) => (
                                <li key={item.label}>
                                    <span className="font-semibold text-ink">{item.label}:</span> {item.value}
                                </li>
                            ))}
                        </ul>
                        <Verse ref="2 Corinthians 3:17" text="...and where the Spirit of the Lord is, there is freedom. (NIV)" />
                    </motion.aside>

                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease, delay: 0.1 }}
                        className="lg:col-span-2 rounded-2xl glass-panel-strong p-5"
                    >
                        <h2 className="font-display text-xl font-semibold text-red-600 mb-4">Biography Timeline</h2>
                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.4, ease, delay: i * 0.05 }}
                                    className="relative pl-6 border-l-2 border-[var(--accent-deep)]/20"
                                >
                                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[var(--accent-deep)]" />
                                    <p className="font-display text-lg font-semibold text-[var(--accent-deep)]">{item.year}</p>
                                    {item.paragraphs.map((p, pi) => (
                                        <p key={pi} className="mt-1 text-sm text-ink-muted leading-relaxed">
                                            {p}
                                        </p>
                                    ))}
                                    {item.verse && <Verse ref={item.verse.ref} text={item.verse.text} />}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Button bar */}
                <div className="mt-8 max-w-6xl mx-auto rounded-xl glass-panel-strong p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <PillButton onClick={() => router.back()} variant="primary">
                            Go Back
                        </PillButton>
                        <PillButton href="/" variant="secondary" className="border border-[var(--border-glass)]">
                            Home
                        </PillButton>
                    </div>
                </div>
            </PageContainer>
        </div>
    )
}
