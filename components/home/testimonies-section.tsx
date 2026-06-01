"use client"

import { useEffect, useState } from "react"
import { useDesignMode } from "@/lib/design-mode/store"
import { EditableSection } from "@/components/design-mode/editable"
import { TestimoniesGrid } from "@/components/home/testimonies-grid"
import { TestimoniesScroll } from "@/components/home/testimonies-scroll"
import type { Testimony } from "@/lib/types/database"

interface TestimoniesSectionProps {
  testimonies: Testimony[]
}

export function TestimoniesSection({ testimonies }: TestimoniesSectionProps) {
  const isDesignModeEnabled = useDesignMode((s) => s.enabled)
  const prefersReducedMotion = usePrefersReducedMotion()

  if (!testimonies?.length) return null

  // Fallback to static grid if design mode is active (for easy editing) or if reduced motion is preferred
  const useStaticGrid = isDesignModeEnabled || prefersReducedMotion

  return (
    <EditableSection
      id="home.testimonies"
      label="Testimonies"
      pageKey="home"
      className="mx-auto w-[calc(100vw-32px)] lg:w-[calc(100vw-76px)] max-w-[2800px] py-5"
    >
      {useStaticGrid ? (
        <TestimoniesGrid testimonies={testimonies} />
      ) : (
        <TestimoniesScroll testimonies={testimonies} />
      )}
    </EditableSection>
  )
}

/**
 * Hydration-safe hook to detect prefers-reduced-motion system preference
 */
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  return prefersReducedMotion
}
