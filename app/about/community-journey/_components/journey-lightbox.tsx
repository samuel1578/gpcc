"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { JourneyPhoto } from "@/lib/community-journey-data"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

interface JourneyLightboxProps {
    isOpen: boolean
    onClose: () => void
    photos: JourneyPhoto[]
    currentIndex: number
    onIndexChange: (index: number) => void
}

export function JourneyLightbox({
    isOpen,
    onClose,
    photos,
    currentIndex,
    onIndexChange,
}: JourneyLightboxProps) {
    const currentPhoto = photos[currentIndex]

    const handlePrevious = React.useCallback(() => {
        if (currentIndex > 0) {
            onIndexChange(currentIndex - 1)
        }
    }, [currentIndex, onIndexChange])

    const handleNext = React.useCallback(() => {
        if (currentIndex < photos.length - 1) {
            onIndexChange(currentIndex + 1)
        }
    }, [currentIndex, photos.length, onIndexChange])

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, handlePrevious, handleNext])

    if (!currentPhoto) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPortal>
                <DialogOverlay className="bg-black/90 backdrop-blur-sm z-[100]" />
                <DialogContent
                    className="fixed left-1/2 top-1/2 z-[101] w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none sm:rounded-none"
                    showCloseButton={false}
                >
                    <VisuallyHidden.Root>
                        <DialogTitle>{currentPhoto.alt}</DialogTitle>
                    </VisuallyHidden.Root>
                    <div className="relative flex flex-col items-center justify-center gap-4 px-4">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-[-48px] text-white/70 hover:text-white transition-colors outline-none"
                            aria-label="Close lightbox"
                        >
                            <X className="size-8" />
                        </button>

                        {/* Image Container */}
                        <div className="relative aspect-[4/3] w-full max-h-[70vh] overflow-hidden rounded-2xl">
                            <Image
                                src={currentPhoto.src!}
                                alt={currentPhoto.alt}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 1280px) 100vw, 1200px"
                            />
                        </div>

                        {/* Caption */}
                        <div className="text-center">
                            <p className="text-white text-lg font-medium">{currentPhoto.alt}</p>
                            <p className="text-white/50 text-sm mt-1">
                                {currentIndex + 1} of {photos.length}
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        {currentIndex > 0 && (
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-all outline-none"
                                aria-label="Previous photo"
                            >
                                <ChevronLeft className="size-8" />
                            </button>
                        )}
                        {currentIndex < photos.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-all outline-none"
                                aria-label="Next photo"
                            >
                                <ChevronRight className="size-8" />
                            </button>
                        )}
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
