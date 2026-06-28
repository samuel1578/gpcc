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
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        >
            <button
                onClick={onClose}
                className="absolute top-24 right-6 z-[310] flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-all hover:scale-110"
            >
                <X className="h-6 w-6" />
            </button>

            <div className="relative w-full" style={{ height: "100dvh" }}>
                <Swiper
                    modules={[Navigation, Pagination, Keyboard]}
                    navigation={{
                        prevEl: ".lightbox-prev",
                        nextEl: ".lightbox-next",
                    }}
                    pagination={{ clickable: true, type: "fraction" }}
                    keyboard={{ enabled: true }}
                    initialSlide={initialIndex}
                    className="w-full"
                    style={{ height: "100dvh" }}
                    spaceBetween={30}
                >
                    {images.map((img, idx) => (
                        <SwiperSlide
                            key={img.url + idx}
                            className="!flex items-center justify-center"
                            style={{ height: "100dvh", padding: "80px 64px 48px" }}
                        >
                            <div className="relative flex items-center justify-center w-full h-full">
                                <img
                                    src={img.url}
                                    alt={img.caption || "Gallery Image"}
                                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                                    style={{ display: "block" }}
                                />
                                {img.caption && (
                                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-2">
                                        <p className="rounded-full bg-black/60 px-6 py-2 text-sm text-white backdrop-blur-md">
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
