"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface Sermon {
    id: string
    title: string
    youtube_url: string
    thumbnail_url: string
}

interface SermonsSwiperProps {
    sermons: Sermon[]
}

export function SermonsSwiper({ sermons }: SermonsSwiperProps) {
    if (sermons.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <Play className="h-8 w-8 text-ink-muted/40" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink">Sermons coming soon</h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    We are currently preparing our media library. Please check back later.
                </p>
            </div>
        )
    }

    // Determine initial slide to center (prefer index 2 if available, else center of list)
    const initialSlide = sermons.length >= 3 ? 2 : Math.floor((sermons.length - 1) / 2)

    return (
        <div className="w-full py-16 px-4 relative group/swiper">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                initialSlide={initialSlide}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: ".swiper-button-prev-custom",
                    nextEl: ".swiper-button-next-custom",
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="sermons-swiper !pb-28"
            >
                {sermons.map((sermon) => (
                    <SwiperSlide key={sermon.id} className="!w-[300px] sm:!w-[350px]">
                        <a
                            href={sermon.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="glass-panel p-3 rounded-[2rem] transition-all duration-500 group-hover:shadow-[var(--shadow-elevated)] group-hover:-translate-y-2">
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
                                    <img
                                        src={sermon.thumbnail_url}
                                        alt={sermon.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/90 p-4 rounded-full shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Play className="h-6 w-6 text-red-600 fill-current" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 mb-2 text-center px-2">
                                    <h4 className="font-display text-xl sm:text-2xl font-bold text-ink line-clamp-2 leading-tight transition-colors group-hover:text-red-600">
                                        {sermon.title}
                                    </h4>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Arrows (Desktop Only) */}
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-full glass-panel-strong border-none text-ink-muted hover:text-red-600 transition-all duration-300 shadow-md hover:scale-110 disabled:opacity-0 pointer-events-auto cursor-pointer">
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex h-12 w-12 items-center justify-center rounded-full glass-panel-strong border-none text-ink-muted hover:text-red-600 transition-all duration-300 shadow-md hover:scale-110 disabled:opacity-0 pointer-events-auto cursor-pointer">
                <ChevronRight className="h-6 w-6" />
            </button>

            <style jsx global>{`
                .sermons-swiper {
                    --swiper-pagination-bullet-inactive-color: #000;
                    --swiper-pagination-bullet-inactive-opacity: 0.3;
                    --swiper-pagination-color: var(--accent-gold);
                }
                .sermons-swiper .swiper-pagination {
                    bottom: 15px !important;
                    display: flex !important;
                    justify-content: center;
                    align-items: center;
                    background: #0f1419;
                    width: fit-content !important;
                    left: 50% !important;
                    transform: translateX(-50%);
                    padding: 8px 16px;
                    border-radius: 100px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    z-index: 30;
                }
                .sermons-swiper .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #fff !important;
                    opacity: 0.3;
                    transition: all 0.3s ease;
                    margin: 0 6px !important;
                }
                .sermons-swiper .swiper-pagination-bullet-active {
                    width: 28px;
                    height: 10px;
                    border-radius: 5px;
                    background: var(--accent-gold) !important;
                    opacity: 1;
                }
                .sermons-swiper .swiper-slide {
                    filter: blur(1px);
                    transition: filter 0.3s ease;
                }
                .sermons-swiper .swiper-slide-active {
                    filter: blur(0);
                }
            `}</style>
        </div>
    )
}
