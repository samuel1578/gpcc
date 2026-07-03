"use client"

import { motion } from "framer-motion"
import { ease } from "@/lib/motion"
import { EditableText } from "@/components/design-mode/editable"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  pageKey,
  variant = "dark",
  backgroundImage,
  imageStrip = false,
}: {
  eyebrow: string
  title: string
  description?: string
  pageKey?: string
  variant?: "dark" | "light"
  backgroundImage?: string
  imageStrip?: boolean
}) {
  const editKey = pageKey ?? "page"
  const isLight = variant === "light"

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        imageStrip && isLight ? "bg-[#BADCF7]" : ""
      )}
    >
      {!imageStrip && (
        <>
          {backgroundImage ? (
            <div className="absolute inset-0 -z-20">
              <Image
                src={backgroundImage}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{
                background: isLight
                  ? "#BADCF7"
                  : "linear-gradient(135deg, #1a1a2e 0%, #2d3a8c 60%, #c44569 100%)",
              }}
            />
          )}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 backdrop-blur-[1px]",
              isLight ? "bg-white/25" : "bg-black/35"
            )}
          />
        </>
      )}

      <div
        className={cn(
          "mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-10",
          imageStrip ? "pt-32 pb-8" : "pb-16 pt-40 sm:pb-20 sm:pt-48",
          isLight ? "text-slate-900" : "text-white"
        )}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className={cn(
            "label-cap",
            isLight ? "text-slate-800" : "text-[var(--accent-gold-light)]"
          )}
        >
          {eyebrow}
        </motion.p>

        <EditableText
          id={`${editKey}.title`}
          label={`${eyebrow} Heading`}
          pageKey={editKey}
          as="h1"
          className={cn(
            "mt-4 font-display font-semibold",
            imageStrip ? "whitespace-nowrap" : "text-balance",
            isLight ? "text-slate-900" : "text-white"
          )}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="block"
            style={{
              fontSize: imageStrip
                ? "clamp(1.2rem, 4.5vw, 4rem)"
                : "clamp(2.25rem, 4.5vw + 1rem, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </motion.span>
        </EditableText>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className={cn(
              "mt-6 max-w-2xl body-lg",
              isLight ? "text-slate-900/80" : "text-white/80"
            )}
          >
            {description}
          </motion.p>
        )}
      </div>

      {imageStrip && backgroundImage && (
        <div
          className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8"
          style={{ aspectRatio: "960 / 289" }}
        >
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  )
}
