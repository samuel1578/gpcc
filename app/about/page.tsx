import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageHero } from "@/components/layout/page-hero"
import { ParallaxContent } from "@/components/layout/parallax-content"
import { Reveal } from "@/components/motion/reveal"
import { EditableSection } from "@/components/design-mode/editable"
import { AboutCardGrid } from "./_components/about-card-grid"

export const metadata = {
  title: "About",
  description:
    "About Global Peace Christian Centre — our story, leadership, and the journey we walk together.",
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        pageKey="about"
        eyebrow="About"
        title="A people, a place, a purpose."
        description="Global Peace Christian Centre is more than a church — it’s a family rooted in Accra-North, growing in grace and reaching beyond ourselves."
      />      <ParallaxContent>      <EditableSection
        id="about.cards"
        label="About Sub-pages"
        pageKey="about"
        className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-20"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="label-cap text-[var(--accent-deep)]">Get to know us</p>
          <h2 className="mt-3 h-section text-ink">Where would you like to begin?</h2>
        </Reveal>
        <AboutCardGrid />
        <div className="mt-10 text-center">
          <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-deep)] hover:underline">
            Or get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </EditableSection>
      </ParallaxContent>
    </>
  )
}
