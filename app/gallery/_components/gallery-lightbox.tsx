"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Keyboard } from "swiper/modules"
import type { Album, GalleryImage } from "@/lib/actions/gallery"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface GalleryLightboxProps {
    images: GalleryImage[]
    initialIndex?: number
    onClose: () => void
}

export function GalleryLightbox({ images, initialIndex = 0, onClose }: GalleryLightboxProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
        >
            <div className="flex items-center justify-between p-4 pt-6 text-white">
                <span className="text-sm font-medium opacity-70">
                    Gallery View
                </span>
                <button
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                >
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="relative flex-1">
                <Swiper
                    modules={[Navigation, Pagination, Keyboard]}
                    navigation={{
                        prevEl: ".lightbox-prev",
                        nextEl: ".lightbox-next",
                    }}
                    pagination={{ clickable: true, type: "fraction" }}
                    keyboard={{ enabled: true }}
                    initialSlide={initialIndex}
                    className="h-full w-full"
                    spaceBetween={30}
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={img.url + idx} className="flex items-center justify-center p-4">
                            <div className="relative h-full w-full max-w-6xl">
                                <Image
                                    src={img.url}
                                    alt={img.caption || "Gallery Image"}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority={idx === initialIndex}
                                />
                                {img.caption && (
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <p className="rounded-full bg-black/50 px-6 py-2 text-sm text-white backdrop-blur-md">
                                            {img.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="lightbox-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20">
                    <ChevronLeft className="h-8 w-8" />
                </button>
                <button className="lightbox-next absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20">
                    <ChevronRight className="h-8 w-8" />
                </button>
            </div>
        </motion.div>
    )
}
