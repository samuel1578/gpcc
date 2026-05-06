"use client"

import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Future-ready image container. Renders a calm placeholder when the
 * provided src isn't present yet. The layout reserves the exact size
 * so swapping in real assets later won't shift the page.
 */
export function ImagePlaceholder({
  label,
  hint,
  className,
  rounded = "rounded-2xl",
  aspect = "aspect-[4/3]",
  tone = "neutral",
}: {
  label?: string
  hint?: string
  className?: string
  rounded?: string
  aspect?: string
  tone?: "neutral" | "dark" | "warm"
}) {
  const toneBg =
    tone === "dark"
      ? "from-ink/30 to-ink/10"
      : tone === "warm"
        ? "from-[var(--accent-rose)]/25 to-[var(--accent-gold-light)]/15"
        : "from-white/30 to-white/10"
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border border-white/35 bg-gradient-to-br backdrop-blur-md",
        toneBg,
        aspect,
        rounded,
        className,
      )}
      role="img"
      aria-label={label ?? "Image placeholder"}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-ink/55">
        <ImageIcon className="h-7 w-7 opacity-60" strokeWidth={1.4} />
        {label && (
          <p className="font-display text-base italic leading-tight">{label}</p>
        )}
        {hint && <p className="text-[11px] uppercase tracking-[0.18em] opacity-55">{hint}</p>}
      </div>
      {/* subtle decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  )
}
