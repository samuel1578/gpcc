"use client"

import { Reveal } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

const leaders = [
  {
    name: "Pastor Samuel Adekunle",
    role: "Senior Pastor",
    bio: "Shepherds the congregation with a heart for prayer, the Word, and pastoral care.",
  },
  {
    name: "Pastor Grace Adekunle",
    role: "Associate Pastor / Women&apos;s Ministry",
    bio: "Leads women&apos;s discipleship, intercession, and family-life ministries.",
  },
  {
    name: "Elder Joseph Olawale",
    role: "Church Elder",
    bio: "Provides spiritual oversight, counsel, and serves on the leadership council.",
  },
  {
    name: "Pastor Daniel Okechukwu",
    role: "Youth & Discipleship",
    bio: "Disciples the next generation through teaching, mentorship, and outreach.",
  },
  {
    name: "Sis. Esther Bamidele",
    role: "Worship Director",
    bio: "Coordinates the choir, worship team, and creative arts ministry.",
  },
  {
    name: "Bro. Michael Adewale",
    role: "Children&apos;s Ministry",
    bio: "Oversees Sunday School, kids&apos; church, and family-faith resources.",
  },
]

export function LeadershipGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition hover:border-primary/40 hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <ImagePlaceholder
                    label={leader.name}
                    tone="warm"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{leader.role}</p>
                  <h3 className="text-xl font-semibold leading-snug">{leader.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
