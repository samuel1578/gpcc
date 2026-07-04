"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ProfileComingSoonModal } from "@/components/layout/under-construction"
import { ArrowUpRight } from "lucide-react"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { PillButton } from "@/components/ui/pill-button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const PASTORAL_BOARD = [
  // TOP ROW
  {
    name: "Apostle Henry Ampomah-Boateng",
    role: "Chairman & Founder",
    image: "/images/pastors/headpastorj.jpg",
    bio: "Visionary leader and founder of GPCC, dedicated to spreading the gospel and building a community of faith.",
  },
  {
    name: "Lady Pastor Perpetual Ampomah-Boateng",
    role: "Vice Chairperson",
    image: "/images/pastors/vice-president.jpg",
    bio: "Co-founder and leader, passionate about women's ministry and family life within the church.",
  },
  // MIDDLE ROW
  {
    name: "Pastor Benjamin Gogoe",
    role: "Associate Pastor",
    image: "/images/pastors/pastor-benjamin.jpg",
    bio: "Dedicated to pastoral care and spiritual growth of the congregation.",
  },
  {
    name: "Rev Dr. Mrs Ruby Aikins-Larbi",
    role: "Associate Pastor",
    image: "/images/pastors/pastor-ruby.png",
    bio: "Serving with excellence in teaching and leadership development.",
  },
  // BOTTOM ROW
  {
    name: "Pastor Paulina Simpson",
    role: "Associate Pastor",
    image: "/images/pastors/pastor-paulina.png",
    bio: "Passionate about discipleship and community outreach.",
  },
  {
    name: "Pastor Samuel Konadu Wiafe",
    role: "Associate Pastor",
    image: "/images/pastors/pastor-wiafe.png",
    bio: "Leading with a heart for youth and spiritual transformation.",
  },
  {
    name: "Pastor Maxwell Mensah Brayie",
    role: "Associate Pastor",
    image: "/images/pastors/pastor-maxwell.png",
    bio: "Committed to the ministry of the Word and pastoral support.",
  },
]

export function LeadershipGrid() {
  return (
    <div className="space-y-2 lg:space-y-4">
      {/* Pastoral Board Section */}
      <EditableSection
        id="leadership.pastoral-board"
        label="Pastoral Board"
        pageKey="leadership"
        className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-2 lg:py-4"
      >
        <div className="relative mx-auto w-fit overflow-hidden rounded-3xl bg-[#F8FBFE]/40 backdrop-blur-xl border border-white/30 mb-6 lg:mb-10 py-6 lg:py-10 px-4 sm:px-5 lg:px-6 text-center shadow-sm">
          <Reveal className="relative z-10 mx-auto max-w-3xl">
            <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>
              The Pastoral Board
            </p>
            <EditableText
              id="leadership.pastoral.title"
              label="Pastoral Board Heading"
              pageKey="leadership"
              as="h2"
              className="mt-3 h-section text-ink"
            >
              Guided by Vision and Grace.
            </EditableText>
            <p className="mt-4 body-lg text-ink-muted lg:whitespace-nowrap">
              Meet the Pastoral Board who provide spiritual leadership and guidance for our church family.
            </p>
          </Reveal>
        </div>

        {/* Desktop Grid (2 / 2 / 3 Hierarchy) */}
        <div className="hidden lg:block space-y-10 xl:space-y-12">
          {/* Top Row (2 Cards) */}
          <div className="grid grid-cols-2 gap-8 xl:gap-12 max-w-[900px] xl:max-w-6xl mx-auto">
            {PASTORAL_BOARD.slice(0, 2).map((pastor, i) => (
              <PastorCard key={pastor.name} pastor={pastor} index={i} />
            ))}
          </div>
          {/* Middle Row (2 Cards) */}
          <div className="grid grid-cols-2 gap-8 xl:gap-12 max-w-[900px] xl:max-w-6xl mx-auto">
            {PASTORAL_BOARD.slice(2, 4).map((pastor, i) => (
              <PastorCard key={pastor.name} pastor={pastor} index={i + 2} />
            ))}
          </div>
          {/* Bottom Row (3 Cards) */}
          <div className="grid grid-cols-3 gap-6 xl:gap-10 max-w-[1100px] xl:max-w-none mx-auto">
            {PASTORAL_BOARD.slice(4).map((pastor, i) => (
              <PastorCard key={pastor.name} pastor={pastor} index={i + 4} />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Swiper */}
        <div className="lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {PASTORAL_BOARD.map((pastor, i) => (
                <CarouselItem key={pastor.name} className="pl-4 basis-[85%] sm:basis-[50%] md:basis-[40%]">
                  <PastorCard pastor={pastor} index={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </EditableSection>

      {/* Our Elders Section */}
      <EditableSection
        id="leadership.elders"
        label="Our Elders"
        pageKey="leadership"
        className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-4 lg:py-6"
      >
        <div className="overflow-hidden rounded-3xl glass-panel-strong">
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            <div className="relative h-[300px] lg:h-auto min-h-[400px]">
              <Image
                src="/images/pastors/elders-group.jpg"
                alt="Our Elders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-20">
              <Reveal>
                <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>
                  Our Elders
                </p>
                <EditableText
                  id="leadership.elders.title"
                  label="Elders Heading"
                  pageKey="leadership"
                  as="h2"
                  className="mt-3 h-section text-ink"
                >
                  Wisdom in Service.
                </EditableText>
                <p className="mt-6 body-lg text-ink-muted">
                  The Elders who offer guidance and support to the church community. They stand as pillars of faith, providing spiritual oversight and ensuring the well-being of the flock.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Editorial Board Section */}
      <EditableSection
        id="leadership.editorial"
        label="Editorial Board"
        pageKey="leadership"
        className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-4 lg:py-6"
      >
        <div className="overflow-hidden rounded-3xl glass-panel-strong">
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-20 order-2 lg:order-1">
              <Reveal>
                <p className="font-display font-semibold text-red-600" style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}>
                  Editorial Board
                </p>
                <EditableText
                  id="leadership.editorial.title"
                  label="Editorial Board Heading"
                  pageKey="leadership"
                  as="h2"
                  className="mt-3 h-section text-ink"
                >
                  Voices of Vision.
                </EditableText>
                <p className="mt-6 body-lg text-ink-muted">
                  The Editorial Board who contribute to the growth of the church through creativity, insight, and service. They curate the messages and resources that inspire our community.
                </p>
              </Reveal>
            </div>
            <div className="relative h-[300px] lg:h-auto min-h-[400px] order-1 lg:order-2">
              <Image
                src="/images/pastors/elders-group.jpg"
                alt="Editorial Board"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </EditableSection>
    </div>
  )
}

function PastorCard({ pastor, index }: { pastor: any; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Reveal delay={index * 0.05}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-panel-strong transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative aspect-[4/5] lg:aspect-[3/4.2] xl:aspect-[4/5] w-full overflow-hidden max-h-[320px] sm:max-h-none lg:max-h-none xl:max-h-none">
          <Image
            src={pastor.image}
            alt={pastor.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="flex flex-1 flex-col p-5 lg:p-6 xl:p-8">
          <p className="text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.2em] text-red-600">
            {pastor.role}
          </p>
          <h3 className="mt-2 font-display text-lg lg:text-xl xl:text-2xl font-semibold text-ink leading-tight">
            {pastor.name}
          </h3>
          <p className="mt-3 xl:mt-4 text-xs xl:text-sm leading-relaxed text-ink-muted line-clamp-3">
            {pastor.bio}
          </p>
          <div className="mt-5 xl:mt-6 pt-5 xl:pt-6 border-t border-black/5">
            {index === 0 ? (
              <Link
                href="/about/profile-president"
                className="inline-flex items-center gap-2 text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[var(--accent-deep)] transition-colors hover:text-red-600"
              >
                View Profile
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 text-[10px] xl:text-xs font-bold uppercase tracking-widest text-[var(--accent-deep)] transition-colors hover:text-red-600"
                >
                  View Profile
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {open && (
                    <ProfileComingSoonModal
                      name={pastor.name}
                      onClose={() => setOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
