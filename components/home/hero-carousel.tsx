"use client"

import { useRef } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Parallax, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

const IMAGES = [
  { src: "/images/hero/hero121.webp", alt: "Church gathering" },
  { src: "/images/hero/hero22.webp", alt: "Church service" },
  { src: "/images/hero/hero3.jpg", alt: "Church worship" },
  { src: "/images/hero/hero4.jpg", alt: "Church community" },
]

export function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className="relative w-full select-none overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-none lg:h-[56.25vw] lg:max-h-[900px]">
      <Swiper
        modules={[Autoplay, EffectFade, Parallax, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        parallax={true}
        speed={1200}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/40 !opacity-100 !h-2 !w-2 !rounded-full transition-all duration-300",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white/90 !w-6",
        }}
        loop={false}
        onReachEnd={(swiper) => {
          setTimeout(() => {
            if (!swiper.destroyed) {
              swiper.slideTo(0);
            }
          }, 3000);
        }}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        className="h-full w-full"
      >
        {IMAGES.map((img, i) => (
          <SwiperSlide key={img.src}>
            <div className="relative h-full w-full" data-swiper-parallax="-20%">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
                quality={85}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
                aria-hidden
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
