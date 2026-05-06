"use client"

import { Reveal } from "@/components/motion/reveal"

const milestones = [
  {
    year: "1941",
    title: "The Apostolic movement begins",
    body: "Christ Apostolic Church is established in Nigeria, birthed from a deep hunger for revival, prayer, and the move of the Holy Spirit.",
  },
  {
    year: "1978",
    title: "Igbalubi assembly planted",
    body: "A small group of believers begin gathering for prayer and Bible study in Igbalubi, laying the foundation for what would become CACI.",
  },
  {
    year: "1985",
    title: "First building dedicated",
    body: "After years of meeting in homes and rented spaces, the congregation dedicates its first permanent sanctuary to the glory of God.",
  },
  {
    year: "2002",
    title: "Expansion of ministries",
    body: "Children, youth, women, and men&apos;s fellowships are formalized, alongside a vibrant choir and evangelism department.",
  },
  {
    year: "2018",
    title: "Community outreach scaled",
    body: "Medical missions, food drives, and educational support programs extend the church&apos;s reach far beyond Sunday services.",
  },
  {
    year: "Today",
    title: "Walking by faith into the future",
    body: "We continue to be a praying, worshiping, evangelizing family — anchored in the Word and led by the Spirit.",
  },
]

export function HistoryTimeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <ol className="relative flex flex-col gap-10 border-l-2 border-border pl-8">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute -left-[2.6rem] top-1 flex size-6 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="size-2 rounded-full bg-primary" />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">{m.year}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
