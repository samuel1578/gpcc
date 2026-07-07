"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Sparkles, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type Orientation = "portrait" | "landscape" | null

export function AdaptivePoster({
    src,
    alt,
    featured,
}: {
    src?: string | null
    alt: string
    featured?: boolean
}) {
    const [orientation, setOrientation] = useState<Orientation>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    const detect = (img: HTMLImageElement) => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            setOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait")
        }
    }

    // Handles the case where the image is already cached and `complete`
    // by the time this component mounts — onLoad will never fire for it.
    useEffect(() => {
        const img = imgRef.current
        if (img && img.complete) {
            detect(img)
        }
    }, [src])

    const isLandscape = orientation === "landscape"

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        "relative w-full rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] border border-black/5 bg-white transition-[max-width,aspect-ratio] duration-300 cursor-zoom-in group",
                        isLandscape
                            ? "aspect-[4/3] max-w-full lg:max-w-none"
                            : "aspect-[3/4] max-w-[420px]"
                    )}
                >
                    {src ? (
                        <>
                            <img
                                ref={imgRef}
                                src={src}
                                alt={alt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onLoad={(e) => detect(e.currentTarget)}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <div className="bg-white/90 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                    <Maximize2 className="h-5 w-5 text-red-600" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-black/5 text-ink-muted/40">
                            <Calendar className="h-16 w-16" />
                        </div>
                    )}
                    {featured && (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-3 py-1 rounded-full shadow-md z-10">
                            <Sparkles className="h-3 w-3" /> Featured Event
                        </span>
                    )}
                </div>
            </DialogTrigger>
            {src && (
                <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none overflow-hidden flex items-center justify-center">
                    <div className="sr-only">
                        <DialogTitle>{alt}</DialogTitle>
                        <DialogDescription>Full view of event poster</DialogDescription>
                    </div>
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[95vh] object-contain rounded-xl"
                    />
                </DialogContent>
            )}
        </Dialog>
    )
}
