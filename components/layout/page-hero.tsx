"use client"

import { motion } from "framer-motion"
import { ease } from "@/lib/motion"
import { EditableText } from "@/components/design-mode/editable"

export function PageHero({
  eyebrow,
  title,
  description,
  pageKey,
}: {
  eyebrow: string
  title: string
  description?: string
  pageKey?: string
}) {
  const editKey = pageKey ?? "page"
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1a1a2e 0%, #2d3a8c 60%, #c44569 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/35 backdrop-blur-[1px]" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 pb-16 pt-40 text-center text-white sm:px-6 sm:pb-20 sm:pt-48 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="label-cap text-[var(--accent-gold-light)]"
        >
          {eyebrow}
        </motion.p>

        <EditableText
          id={`${editKey}.title`}
          label={`${eyebrow} Heading`}
          pageKey={editKey}
          as="h1"
          className="mt-4 font-display font-semibold text-balance text-white"
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="block"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw + 1rem, 4.5rem)",
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
            className="mt-6 max-w-2xl body-lg text-white/80"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
