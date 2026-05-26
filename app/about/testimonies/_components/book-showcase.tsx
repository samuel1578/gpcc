"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { PillButton } from "@/components/ui/pill-button"
import { Reveal } from "@/components/motion/reveal"
import { EditableSection, EditableText, EditableImage } from "@/components/design-mode/editable"

export function BookShowcase() {
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFlipped((prev) => !prev)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <EditableSection
            id="testimonies.book-showcase"
            label="Book Showcase Section"
            pageKey="testimonies"
            className="relative w-full py-20 lg:py-32 overflow-hidden bg-[#fdfcf9]"
        >
            <div className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-80px)] max-w-[1800px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Side: Animated Book Showcase */}
                    <div className="flex justify-center items-center [perspective:2000px] order-1 lg:order-1">
                        <motion.div
                            className="relative w-[clamp(260px,40vw,450px)] aspect-[1/1.42] [transform-style:preserve-3d] cursor-pointer"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 1.5, ease: [0.45, 0.05, 0.55, 0.95] }}
                            onClick={() => setIsFlipped(!isFlipped)}
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        >
                            {/* Front Cover Container */}
                            <div className="absolute inset-0 [backface-visibility:hidden] rounded-r-lg overflow-hidden shadow-2xl border-l-4 border-black/10 z-20">
                                <EditableImage
                                    id="testimonies.book.front"
                                    label="Book Front Cover"
                                    pageKey="testimonies"
                                    src="/images/media/jwimr.jpg"
                                    alt="Jesus Walks Into My Room - Front Cover"
                                    defaultWidth={450}
                                    defaultHeight={640}
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Back Cover Container */}
                            <div className="absolute inset-0 [backface-visibility:hidden] rounded-l-lg overflow-hidden shadow-2xl [transform:rotateY(180deg)] border-r-4 border-black/10 z-10">
                                <EditableImage
                                    id="testimonies.book.back"
                                    label="Book Back Cover"
                                    pageKey="testimonies"
                                    src="/images/media/jwimr2.jpg"
                                    alt="Jesus Walks Into My Room - Back Cover"
                                    defaultWidth={450}
                                    defaultHeight={640}
                                    className="object-cover"
                                />
                            </div>

                            {/* Book Spine Shadow Effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/20 to-transparent z-30 pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Right Side: Rich Content */}
                    <div className="flex flex-col space-y-8 lg:space-y-12 order-2 lg:order-2">
                        <div className="space-y-4">
                            <Reveal>
                                <p className="label-cap text-red-600 font-bold">Featured Publication</p>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <EditableText
                                    id="testimonies.book.title"
                                    label="Book Section Title"
                                    pageKey="testimonies"
                                    as="h2"
                                    className="font-display text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[1.05] text-ink tracking-tight"
                                >
                                    The Book: <br />
                                    <span className="text-red-600">"Jesus Walks Into My Room"</span>
                                </EditableText>
                            </Reveal>
                        </div>

                        <Reveal delay={0.2}>
                            <EditableText
                                id="testimonies.book.description"
                                label="Book Section Description"
                                pageKey="testimonies"
                                as="p"
                                className="text-[clamp(1.1rem,1.4vw,1.45rem)] leading-relaxed text-ink-muted max-w-2xl"
                            >
                                God is touching lives through the book 'Jesus Walks Into My Room' written by Pastor Henry Ampomah-Boateng, Head Pastor and Founder of Global Peace Christian Centre. The testimonies below showcase the miraculous impact this book has had on countless lives.
                            </EditableText>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
                                <PillButton
                                    size="fluid"
                                    variant="rose"
                                    onClick={() => {
                                        const element = document.getElementById('book-testimonies')
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Read Testimonies
                                </PillButton>
                                <PillButton
                                    size="fluid"
                                    variant="outline"
                                    className="!text-ink border-ink/20 hover:bg-ink/5"
                                >
                                    Get The Book
                                </PillButton>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </EditableSection>
    )
}
