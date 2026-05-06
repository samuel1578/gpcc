"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { MINISTRIES } from "@/lib/site"
import { ease, fadeUp } from "@/lib/motion"
import { Reveal } from "@/components/motion/reveal"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import "swiper/css"
import "swiper/css/pagination"

const ministryImages: Record<string, string> = {
  "Men's Ministry": "/images/media/men-ministry.webp",
  "Women's Ministry": "/images/media/womenier.webp",
  "Youth Ministry": "/images/media/youth-ministry.png",
  "Children's Ministry": "/images/media/children-ministry.png",
}

export function MinistriesGrid() {
  return (
    <EditableSection
      id="home.ministries"
      label="Ministries"
      pageKey="home"
      className="mx-auto w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      <div className="w-full rounded-3xl glass-panel-strong" style={{ padding: "clamp(1.5rem,3vw,4.5rem)" }}>
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

      <Reveal className="mt-14 overflow-visible">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          grabCursor
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 2.05 },
            1280: { slidesPerView: 2.4 },
          }}
          className="overflow-visible pb-4"
        >
          {MINISTRIES.map((m) => {
            const imageSrc = ministryImages[m.name] || m.image || "/images/media/men-ministry.webp"
            return (
              <SwiperSlide key={m.name} className="overflow-visible">
                <motion.article
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl p-0 text-center transition-shadow hover:shadow-[var(--shadow-elevated)] border-2 border-red-600 bg-white/5"
                >
                  <Link
                    href="/ministries"
                    className="absolute inset-0 z-10"
                    aria-label={`Learn more about ${m.name}`}
                  />
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {/* Watermark Icon - Top Left Corner */}
                    <div
                      className="absolute top-0 left-0 z-[5] pointer-events-none opacity-[0.20]"
                      style={{
                        width: "120px",
                        height: "120px",
                        backgroundImage: "url('/images/media/outline.webp')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                    />
                    <Image
                      src={imageSrc}
                      alt={m.name}
                      fill
                      quality={100}
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="relative z-10 px-6 py-5 text-center">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {m.name}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-snug text-ink-muted">
                      {m.description}
                    </p>
                    <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-deep)]">
                      Explore <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.article>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Reveal>
      </div>
    </EditableSection>
  )
}