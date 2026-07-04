"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PageContainer } from "@/components/layout/page-container"
import { type SpotlightImage } from "@/lib/actions/spotlight"

export function GallerySectionClient({ images }: { images: SpotlightImage[] }) {
    const hasImages = images.length > 0

    return (
        <EditableSection
            id="home.gallery"
            label="Gallery"
            pageKey="home"
            className="w-full"
        >
            <PageContainer className="py-5">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Our Community</p>
                    <EditableText
                        id="home.gallery.title"
                        label="Gallery Heading"
                        pageKey="home"
                        as="h2"
                        className="mt-3 h-section text-ink"
                    >
                        A life shared, a faith lived.
                    </EditableText>
                </Reveal>

                {/* Desktop / tablet — masonry-ish grid */}
                {hasImages && (
                    <RevealStagger
                        className="mt-12 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 items-start"
                        staggerChildren={0.06}
                    >
                        {images.map((img) => (
                            <motion.div
                                key={img.id}
                                variants={fadeUp}
                                transition={{ duration: 0.5, ease }}
                                whileHover={{ y: -3, scale: 1.01 }}
                                className="overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]"
                            >
                                <div
                                    className="relative"
                                    style={{ aspectRatio: img.aspect.replace("/", " / ") }}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.label || "Gallery image"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </RevealStagger>
                )}

                {/* Mobile — horizontal snap scroll */}
                {hasImages && (
                    <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 scrollbar-hide sm:hidden">
                        {images.map((img) => (
                            <div key={img.id} className="w-72 flex-shrink-0 snap-start overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={img.url}
                                        alt={img.label || "Gallery image"}
                                        fill
                                        className="object-cover"
                                        sizes="288px"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Reveal delay={0.2} className="mt-10 text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-deep)] hover:underline"
                    >
                        View full gallery <ArrowRight className="h-4 w-4" />
                    </Link>
                </Reveal>
            </PageContainer>
        </EditableSection>
    )
}
