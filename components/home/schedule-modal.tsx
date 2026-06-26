"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { SERVICE_TIMES } from "@/lib/site"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { PillButton } from "@/components/ui/pill-button"
import { useIsMobile } from "@/hooks/use-mobile"

export function ScheduleModal({ onClose }: { onClose: () => void }) {
    const isMobile = useIsMobile() ?? false

    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        document.body.classList.add("modal-active")
        return () => {
            document.body.style.overflow = prev
            document.body.classList.remove("modal-active")
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={cn(
                "fixed inset-0 z-[200] flex bg-black/60 backdrop-blur-md",
                isMobile ? "items-end px-4" : "items-center justify-center px-4"
            )}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={isMobile ? { y: "100%", opacity: 1 } : { scale: 0.96, opacity: 0, y: 16 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={isMobile ? { y: "100%", opacity: 1 } : { scale: 0.97, opacity: 0, y: 16 }}
                transition={{ duration: 0.4, ease }}
                style={{ backgroundColor: "#ffffff" }}
                className={cn(
                    "relative w-full overflow-y-auto flex flex-col md:flex-row bg-white",
                    isMobile
                        ? "rounded-t-3xl max-h-[85vh]"
                        : "rounded-3xl max-h-[96vh] max-w-2xl mx-auto shadow-2xl"
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={cn(
                        "absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors shadow-sm",
                        isMobile ? "bg-black/5 text-ink" : "bg-white/80 text-ink hover:bg-white"
                    )}
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Image Column */}
                <div className={cn(
                    "relative shrink-0",
                    isMobile ? "h-[30vh] w-full" : "md:w-[40%] lg:w-[45%]"
                )}>
                    <Image
                        src="/images/media/solemntime.webp"
                        alt="Worship at GPCC"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    {/* Subtle overlay for mobile to blend with white background if needed, or just for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                </div>

                {/* Content Column */}
                <div className="px-6 py-8 sm:px-10">
                    <p className="label-cap text-[var(--accent-deep)]">Join us in worship</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl text-ink">
                        Service Schedule
                    </h3>
                    <div className="mt-8 space-y-4">
                        {SERVICE_TIMES.map((s, i) => (
                            <motion.div
                                key={s.day}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
                                className="flex items-start gap-4 rounded-2xl bg-black/[0.03] p-4 border border-black/8 hover:bg-black/[0.05] transition-colors"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-deep)]/10 text-[var(--accent-deep)]">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-deep)]">
                                        {s.day}
                                    </p>
                                    <p className="mt-1 font-display text-lg font-medium text-ink">
                                        {s.service}
                                    </p>
                                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
                                        <Clock className="h-3.5 w-3.5" />
                                        {s.time}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <PillButton onClick={onClose} variant="primary" className="w-full">
                            Close
                        </PillButton>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
