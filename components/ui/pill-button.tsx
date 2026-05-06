"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Variant = "primary" | "secondary" | "outline" | "rose" | "emerald" | "ghost-light" | "ghost"
type Size = "sm" | "md" | "lg" | "fluid"

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-deep)] text-white hover:bg-[#3848a8] shadow-[var(--shadow-soft)]",
  secondary:
    "bg-white/95 text-ink hover:bg-white shadow-[var(--shadow-soft)]",
  outline:
    "border border-white/45 text-white hover:bg-white/10",
  rose: "bg-[var(--accent-rose)] text-white hover:brightness-110 shadow-[var(--shadow-soft)]",
  emerald:
    "bg-[var(--accent-emerald)] text-white hover:brightness-110 shadow-[var(--shadow-soft)]",
  "ghost-light":
    "text-white/85 hover:text-white",
  ghost:
    "text-ink/85 hover:text-ink hover:bg-ink/5",
}

const sizeClass: Record<Size, string> = {
  sm: "px-4 py-2 text-[12px]",
  md: "px-6 py-3 text-[13px]",
  lg: "px-9 py-4 text-[14px]",
  fluid: "px-[clamp(1.5rem,3vw,4rem)] py-[clamp(0.75rem,1.5vw,2rem)] text-[clamp(13px,1.2vw,18px)]",
}

type Props = {
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  type?: "button" | "submit"
  disabled?: boolean
  ariaLabel?: string
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

export function PillButton({
  href,
  target,
  rel,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  ariaLabel,
  icon,
  iconPosition = "left",
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.14em] transition-colors",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantClass[variant],
    sizeClass[size],
    className,
  )

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { duration: 0.18 },
  }

  const content = (
    <>
      {icon && iconPosition === "left" ? <span className="-ml-0.5">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="-mr-0.5">{icon}</span> : null}
    </>
  )

  if (href) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link href={href} target={target} rel={rel} className={classes} aria-label={ariaLabel}>
          {content}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </motion.button>
  )
}
