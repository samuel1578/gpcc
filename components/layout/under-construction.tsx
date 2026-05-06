import { Hammer, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"

export function UnderConstruction({
  title = "We’re crafting this page",
  description = "This section is being thoughtfully built. In the meantime, explore the rest of the site or get in touch — we’d love to welcome you.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
      <Reveal className="mx-auto max-w-2xl rounded-3xl glass-panel-strong px-6 py-16 text-center sm:px-12 sm:py-20">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]">
          <Hammer className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <h2 className="mt-6 h-section text-ink">{title}</h2>
        <p className="mt-4 body-lg text-ink-muted text-pretty">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-deep)] px-5 py-2.5 font-medium uppercase tracking-[0.14em] text-white hover:brightness-110"
          >
            Back home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-deep)]/30 px-5 py-2.5 font-medium uppercase tracking-[0.14em] text-[var(--accent-deep)] hover:bg-[var(--accent-deep)]/5"
          >
            Contact us
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
