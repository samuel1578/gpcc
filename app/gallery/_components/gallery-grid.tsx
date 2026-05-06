"use client"

import { Reveal } from "@/components/motion/reveal"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

const albums = [
  { title: "Sunday Worship", count: 24, span: "md:col-span-2 md:row-span-2" },
  { title: "Annual Convention", count: 56, span: "" },
  { title: "Youth Camp 2025", count: 32, span: "" },
  { title: "Choir Concert", count: 18, span: "md:col-span-2" },
  { title: "Community Outreach", count: 21, span: "" },
  { title: "Children's Day", count: 27, span: "" },
  { title: "Wedding Blessings", count: 14, span: "md:col-span-2" },
  { title: "Pastor's Anniversary", count: 19, span: "" },
]

export function GalleryGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4">
          {albums.map((album, i) => (
            <Reveal key={album.title} delay={i * 0.04} className={album.span}>
              <button
                type="button"
                className="group relative h-full w-full overflow-hidden rounded-3xl border border-border/60 text-left"
              >
                <ImagePlaceholder
                  label={album.title}
                  tone={i % 2 === 0 ? "dark" : "warm"}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-5 text-background">
                  <div>
                    <h3 className="text-lg font-semibold">{album.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-80">{album.count} photos</p>
                  </div>
                  <span className="rounded-full border border-background/40 px-3 py-1 text-xs font-medium">View</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
