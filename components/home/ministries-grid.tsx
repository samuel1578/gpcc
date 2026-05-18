"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { MINISTRIES } from "@/lib/site"
import { ease } from "@/lib/motion"
import { Reveal } from "@/components/motion/reveal"
import { PillButton } from "@/components/ui/pill-button"
import { EditableSection, EditableText } from "@/components/design-mode/editable"

export function MinistriesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const segments = MINISTRIES.length
  const progress = useTransform(scrollYProgress, (value) => value * segments)
  const slideIndices = Array.from({ length: MINISTRIES.length + 1 }, (_, i) => i)

  const opacities = slideIndices.map((index) =>
    useTransform(progress, [index - 0.6, index, index + 0.6], [0, 1, 0]),
  )
  const translateY = slideIndices.map((index) =>
    useTransform(progress, [index - 0.6, index, index + 0.6], [40, 0, -40]),
  )

  return (
    <EditableSection
      id="home.ministries"
      label="Ministries"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-40px)] max-w-[2800px] py-5"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>Our Ministries</p>
        <EditableText
          id="home.ministries.title"
          label="Ministries Heading"
          pageKey="home"
          as="h2"
          className="mt-3 h-section text-ink"
        >
          Find your people. Find your purpose.
        </EditableText>
        <p className="mt-4 body-lg text-ink-muted">
          Whatever season you’re in, there’s a community at GPCC built for you.
        </p>
      </Reveal>

      <div
        ref={sectionRef}
        className="relative mt-16 hidden lg:block"
        style={{ height: `${segments * 100}vh` }}
      >
        <div className="sticky top-24">
          <div className="overflow-hidden rounded-3xl glass-panel-strong border-white/10 shadow-2xl">
            <div className="grid min-h-[75vh] xl:min-h-[85vh] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_1fr] 2xl:grid-cols-[1.2fr_1fr]">
              <div className="relative h-full overflow-hidden">
                {MINISTRIES.map((ministry, index) => (
                  <motion.div
                    key={ministry.name}
                    className="absolute inset-0"
                    style={{ opacity: opacities[index], y: translateY[index] }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <Image
                      src={ministry.image || "/images/media/men-ministry.webp"}
                      alt={ministry.name}
                      fill
                      className="object-cover object-[center_20%]"
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}
                {/* CTA Slide Image */}
                <motion.div
                  className="absolute inset-0"
                  style={{ opacity: opacities[MINISTRIES.length], y: translateY[MINISTRIES.length] }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/media/MINCTA.jpg"
                    alt="Find Your Place"
                    fill
                    className="object-cover object-[center_20%]"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
              <div className="relative flex h-full items-center justify-center" style={{ padding: "clamp(1.5rem,4vw,6rem)" }}>
                {MINISTRIES.map((ministry, index) => (
                  <motion.div
                    key={ministry.name}
                    className="absolute inset-0 flex w-full items-center justify-center"
                    style={{ opacity: opacities[index], y: translateY[index] }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="w-full max-w-[640px] text-left px-8 lg:px-12">
                      <p className="label-cap text-red-600">{ministry.name}</p>
                      <h3 className="mt-4 h-section text-ink text-balance">{ministry.name}</h3>
                      <p className="mt-6 body-lg text-ink-muted">{ministry.description}</p>
                      <Link
                        href="/ministries"
                        className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-deep)] hover:underline"
                        aria-label={`Explore the ${ministry.name}`}
                      >
                        Explore <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
                {/* CTA Slide Content */}
                <motion.div
                  className="absolute inset-0 flex w-full items-center justify-center"
                  style={{ opacity: opacities[MINISTRIES.length], y: translateY[MINISTRIES.length] }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="w-full max-w-[800px] text-left px-8 lg:px-12">
                    <p className="label-cap text-red-600">Find Your Place</p>
                    <h3 className="mt-4 h-section text-ink text-pretty">Every ministry has a seat with your name on it.</h3>
                    <div className="mt-6 space-y-4">
                      <p className="body-lg text-ink-muted">
                        Whether you&apos;re stepping in for the first time or looking to go
                        deeper in your faith journey, our ministries are open, welcoming,
                        and waiting for you. You won&apos;t regret walking through those doors.
                      </p>
                      <p className="text-sm text-ink-muted/70 italic">
                        Come as you are. Leave changed.
                      </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <PillButton href="#service-times" variant="primary" size="md">
                        Visit Us This Sunday
                      </PillButton>
                      <PillButton href="/ministries" variant="ghost" size="md" className="!px-0 underline-offset-4 hover:underline">
                        Explore All Ministries
                      </PillButton>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6 lg:hidden">
        {MINISTRIES.map((ministry) => (
          <motion.article
            key={ministry.name}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease }}
            className="relative overflow-hidden rounded-2xl border-2 border-red-600 bg-white/5"
          >
            <Link
              href="/ministries"
              className="absolute inset-0 z-10"
              aria-label={`Learn more about ${ministry.name}`}
            />
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={ministry.image || "/images/media/men-ministry.webp"}
                alt={ministry.name}
                fill
                className="object-cover object-[center_20%]"
                unoptimized
                sizes="100vw"
              />
            </div>
            <div className="relative z-10 px-6 py-6">
              <p className="label-cap text-red-600">{ministry.name}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{ministry.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{ministry.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-deep)]">
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.article>
        ))}
        {/* Mobile CTA Slide */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.5, ease }}
          className="relative overflow-hidden rounded-2xl border-2 border-red-600 bg-white"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src="/images/media/MINCTA.jpg"
              alt="Find Your Place"
              fill
              className="object-cover object-[center_20%]"
              unoptimized
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 px-6 py-6">
            <p className="label-cap text-red-600">Find Your Place</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Every ministry has a seat with your name on it.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Whether you&apos;re stepping in for the first time or looking to go
              deeper in your faith journey, our ministries are open, welcoming,
              and waiting for you.
            </p>
            <p className="mt-2 text-xs italic text-ink-muted/70">
              Come as you are. Leave changed.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <PillButton href="#service-times" variant="primary" size="sm" className="w-full">
                Visit Us This Sunday
              </PillButton>
              <PillButton href="/ministries" variant="ghost" size="sm" className="w-full">
                Explore All Ministries
              </PillButton>
            </div>
          </div>
        </motion.article>
      </div>
    </EditableSection>
  )
}