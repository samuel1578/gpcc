"use client"

import { Reveal } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"
import { PillButton } from "@/components/ui/pill-button"
import { Play, Headphones, FileText } from "lucide-react"

const items = [
  {
    type: "Sermon",
    icon: Play,
    title: "Walking in the Light of His Word",
    speaker: "Pastor Samuel Adekunle",
    date: "April 2026",
  },
  {
    type: "Worship",
    icon: Headphones,
    title: "Throne Room Encounter — Live Worship",
    speaker: "CACI Worship Team",
    date: "March 2026",
  },
  {
    type: "Teaching",
    icon: FileText,
    title: "Foundations of Faith: A 6-Week Study",
    speaker: "Discipleship Department",
    date: "February 2026",
  },
  {
    type: "Sermon",
    icon: Play,
    title: "The Power of a Praying Family",
    speaker: "Pastor Samuel Adekunle",
    date: "January 2026",
  },
  {
    type: "Worship",
    icon: Headphones,
    title: "Songs of Ascent — Choir Album",
    speaker: "CACI Choir",
    date: "December 2025",
  },
  {
    type: "Teaching",
    icon: FileText,
    title: "Understanding Spiritual Gifts",
    speaker: "Bible Study Team",
    date: "November 2025",
  },
]

export function MediaList() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition hover:border-primary/40 hover:shadow-xl">
                  <div className="relative aspect-video overflow-hidden">
                    <ImagePlaceholder
                      label={item.type}
                      hint={item.title}
                      tone="dark"
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 transition group-hover:opacity-100">
                      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Icon className="size-6" aria-hidden />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {item.type} · {item.date}
                    </span>
                    <h3 className="text-lg font-semibold leading-snug text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.speaker}</p>
                    <div className="mt-auto pt-4">
                      <PillButton size="sm" variant="ghost" icon={<Icon className="size-4" />}>
                        {item.type === "Teaching" ? "Read" : "Play"}
                      </PillButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
