"use client"

import { motion, type Variants } from "framer-motion"
import { fadeUp, ease } from "@/lib/motion"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  variants?: Variants
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ul" | "span"
  amount?: number
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  variants = fadeUp,
  as = "div",
  amount = 0.2,
  once = true,
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, ease, delay }}
    >
      {children}
    </MotionTag>
  )
}

export function RevealStagger({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0,
  amount = 0.2,
  once = true,
  as = "div",
}: {
  children: ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
  amount?: number
  once?: boolean
  as?: "div" | "section" | "ul"
}) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
    >
      {children}
    </MotionTag>
  )
}
