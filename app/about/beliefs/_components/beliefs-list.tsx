"use client"

import { Reveal } from "@/components/motion/reveal"
import { BookOpen, Cross, Flame, Heart, Users, Sparkles } from "lucide-react"

const beliefs = [
  {
    icon: BookOpen,
    title: "The Holy Scriptures",
    body: "We believe the Bible is the inspired, infallible Word of God — our supreme authority for faith and conduct.",
  },
  {
    icon: Cross,
    title: "Salvation by grace",
    body: "We believe salvation is by grace through faith in Jesus Christ alone, evidenced by repentance and a transformed life.",
  },
  {
    icon: Flame,
    title: "The Holy Spirit",
    body: "We believe in the baptism, gifts, and ongoing work of the Holy Spirit empowering believers for life and ministry.",
  },
  {
    icon: Heart,
    title: "Prayer & healing",
    body: "We believe prayer changes things and that God still heals, delivers, and works wonders today.",
  },
  {
    icon: Users,
    title: "The Church",
    body: "We believe the Church is the body of Christ — a worshiping, discipling, and witnessing community.",
  },
  {
    icon: Sparkles,
    title: "The return of Christ",
    body: "We believe in the visible, glorious return of Jesus Christ, the resurrection of the dead, and life everlasting.",
  },
]

export function BeliefsList() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {beliefs.map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.title} delay={i * 0.05}>
                <article className="flex h-full gap-5 rounded-3xl border border-border/60 bg-card p-7 transition hover:border-primary/40 hover:shadow-xl">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{b.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.body}</p>
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
