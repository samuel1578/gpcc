"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SITE } from "@/lib/site"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { EditableSection, EditableText } from "@/components/design-mode/editable"
import { EMPTY_CONFIG, useDesignConfig, useDesignMode } from "@/lib/design-mode/store"

export function HeroSection() {
  const activePageKey = useDesignMode((s) => s.activePageKey)
  const config =
    useDesignConfig((s) => s.configs[activePageKey]?.["home.hero"]) ?? EMPTY_CONFIG
  const heightVh = (config.height as number | undefined) ?? 100
  const overlay = ((config.overlay as number | undefined) ?? 50) / 100
  const ctaAlign = (config.ctaAlign as string | undefined) ?? "center"

  const justify =
    ctaAlign === "left" ? "justify-start" : ctaAlign === "right" ? "justify-end" : "justify-center"

  return (
    <EditableSection
      id="home.hero"
      label="Hero"
      pageKey="home"
      className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="relative flex w-full items-center justify-center"
        style={{ minHeight: `${heightVh}dvh` }}
      >
        {/* Background image (placeholder-ready) */}
        <div className="absolute inset-0 -z-20">
          <div
            className="absolute inset-0 bg-[#BADCF7]"
            aria-hidden
          />
        </div>
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `rgba(255,255,255,${overlay / 4})` }}
          aria-hidden
        />

        <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[min(92vw,1600px)] xl:max-w-[min(90vw,1800px)] 2xl:max-w-[min(90vw,2000px)] flex-col items-center min-h-[100dvh] flex flex-col justify-between pt-[max(4rem,8dvh)] pb-[max(3rem,6dvh)] text-center text-slate-900 xl:pt-[8vh] xl:pb-[8vh]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16 font-display italic text-slate-800"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 2rem)",
              lineHeight: 1.1,
            }}
          >
            Welcome to the
          </motion.p>

          <EditableText
            id="home.hero.title"
            label="Hero Title"
            pageKey="home"
            as="h1"
            className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16 mt-2 lg:mt-[2vh] font-display font-semibold"
          >
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.18 }}
              className="block"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              {SITE.name}
            </motion.span>
          </EditableText>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            className="w-full px-6 sm:px-8 lg:px-12 2xl:px-16 mt-12 lg:mt-[3vh] max-w-2xl lg:max-w-6xl mx-auto leading-relaxed text-slate-900"
            style={{
              fontFamily: "var(--font-quantico)",
              fontSize: "clamp(1rem, 1.2vw, 1.4rem)",
            }}
          >
            We are a Bible-Believing, life giving, Charismatic, and Pentecostal Church. Our goal is to infuse life and God's love into people and families through powerful Worship and Bible Teaching services that are relevant to today's world.
          </motion.p>

          <div className="w-full mt-8 lg:mt-[3vh]">
            <HeroCarousel />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className={`w-full px-6 sm:px-8 lg:px-12 2xl:px-16 mt-10 lg:mt-[3vh] flex flex-wrap gap-4 xl:gap-[3vw] ${justify}`}
          >
            <PillButton href="#service-times" variant="primary" size="fluid">
              Visit Us
            </PillButton>
            <PillButton href="/media-center" variant="outline" size="fluid" className="border-slate-400 text-slate-700 hover:bg-slate-100">
              Watch Live
            </PillButton>
          </motion.div>
        </div>

      </div>
    </EditableSection>
  )
}
