"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/motion/reveal"
import { GalleryLightbox } from "./gallery-lightbox"
import type { Album, GalleryImage } from "@/lib/actions/gallery"

interface GalleryGridClientProps {
    albums: Album[]
}

export function GalleryGridClient({ albums }: GalleryGridClientProps) {
    const [activeImages, setActiveImages] = useState<GalleryImage[] | null>(null)

    return (
        <>
            <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
                {albums.map((album, i) => (
                    <Reveal key={album.id} delay={i * 0.04} className={album.span}>
                        <button
                            type="button"
                            onClick={() => setActiveImages(album.images)}
                            className="group relative h-full w-full overflow-hidden rounded-3xl border border-border/60 text-left"
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={album.cover_url || "/images/hero/hero3.jpg"}
                                    alt={album.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-5 text-background">
                                <div>
                                    <h3 className="text-lg font-semibold">{album.title}</h3>
                                    <p className="text-xs uppercase tracking-[0.2em] opacity-80">{album.image_count} photos</p>
                                </div>
                                <span className="rounded-full border border-background/40 px-3 py-1 text-xs font-medium">View</span>
                            </div>
                        </button>
                    </Reveal>
                ))}
            </div>

            <AnimatePresence>
                {activeImages && (
                    <GalleryLightbox
                        images={activeImages}
                        onClose={() => setActiveImages(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
