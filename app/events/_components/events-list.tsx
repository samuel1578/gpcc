"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, AlertCircle } from "lucide-react"
import { fadeUp, ease } from "@/lib/motion"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { EditableSection } from "@/components/design-mode/editable"
import type { Event } from "@/lib/types/database"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")
  const now = new Date()

  // Split into upcoming and past events
  const upcomingEvents = events.filter((e) => {
    const endDate = e.end_date ? new Date(e.end_date) : (e.start_date ? new Date(e.start_date) : null)
    // Set to end of the day for date comparison
    if (endDate) {
      endDate.setHours(23, 59, 59, 999)
      return endDate >= now
    }
    return true
  }).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

  const pastEvents = events.filter((e) => {
    const endDate = e.end_date ? new Date(e.end_date) : (e.start_date ? new Date(e.start_date) : null)
    if (endDate) {
      endDate.setHours(23, 59, 59, 999)
      return endDate < now
    }
    return false
  }).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())

  // Spotlight Event: First featured upcoming event, or simply the soonest upcoming event
  const spotlightEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0]
  const regularUpcomingEvents = spotlightEvent
    ? upcomingEvents.filter((e) => e.id !== spotlightEvent.id)
    : upcomingEvents

  const displayEvents = activeTab === "upcoming" ? regularUpcomingEvents : pastEvents

  function formatEventDate(startStr: string, endStr: string) {
    const start = new Date(startStr)
    const end = new Date(endStr)
    const isValidStart = !isNaN(start.getTime())
    const isValidEnd = !isNaN(end.getTime())

    if (!isValidStart) return "Date TBD"
    if (!isValidEnd) return format(start, "MMMM d, yyyy")

    const isSameDay = start.toDateString() === end.toDateString()
    if (isSameDay) {
      return format(start, "MMMM d, yyyy")
    }

    const isSameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
    if (isSameMonth) {
      return `${format(start, "MMMM d")} – ${format(end, "d, yyyy")}`
    }

    return `${format(start, "MMMM d")} – ${format(end, "MMMM d, yyyy")}`
  }

  return (
    <EditableSection
      id="events.list"
      label="Events List"
      pageKey="events"
      className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 lg:py-24 space-y-16"
    >
      {/* Tab Switcher */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl glass-panel-strong p-8 sm:p-12 border border-white/25 shadow-xl max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <p className="label-cap text-[var(--accent-deep)]">Mark your calendar</p>
              <h2 className="mt-3 h-section text-ink">Gatherings &amp; Seasons</h2>
            </div>
            <div className="flex p-1 rounded-full bg-black/5 border border-black/5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === "upcoming"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-ink-muted hover:text-ink hover:bg-black/5"
                  }`}
              >
                Upcoming ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === "past"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-ink-muted hover:text-ink hover:bg-black/5"
                  }`}
              >
                Past ({pastEvents.length})
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Spotlight Campaign Banner (Only for Upcoming Tab & if Spotlight Event exists) */}
      {activeTab === "upcoming" && spotlightEvent && (
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-panel-strong shadow-2xl border border-white/25 md:grid md:grid-cols-12 gap-0 min-h-[420px]">
            {/* Poster Side */}
            <div className="relative md:col-span-5 h-[300px] md:h-auto overflow-hidden bg-black/5">
              {spotlightEvent.cover_image ? (
                <img
                  src={spotlightEvent.cover_image}
                  alt={spotlightEvent.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-red-500/10 text-red-600">
                  <Calendar className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-3 py-1 rounded-full shadow-md">
                  <Sparkles className="h-3 w-3" /> Spotlight
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-black/60 text-white px-3 py-1 rounded-full shadow-md">
                  {spotlightEvent.event_type === "week_event" ? "Week Event" : "Season Event"}
                </span>
              </div>
            </div>

            {/* Details Side */}
            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {spotlightEvent.theme && (
                  <span className="text-xs uppercase tracking-widest font-bold text-red-600">
                    Theme: "{spotlightEvent.theme}"
                  </span>
                )}
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                  {spotlightEvent.title}
                </h3>
                <p className="body-lg text-ink-muted line-clamp-3">
                  {spotlightEvent.short_description}
                </p>

                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-ink-muted pt-2 border-t border-black/5">
                  <li className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span>{formatEventDate(spotlightEvent.start_date, spotlightEvent.end_date)}</span>
                  </li>
                  {spotlightEvent.venue && (
                    <li className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span className="truncate">{spotlightEvent.venue}</span>
                    </li>
                  )}
                </ul>
              </div>

              <Link href={`/events/${spotlightEvent.slug}`}>
                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white gap-2 font-semibold shadow-lg">
                  Explore Campaign <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      )}

      {/* Main Events List */}
      {displayEvents.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center bg-white/20 backdrop-blur-sm">
          <AlertCircle className="h-8 w-8 text-ink-muted/50 mb-3" />
          <h3 className="font-display text-xl font-semibold text-ink">No events found</h3>
          <p className="mt-2 text-ink-muted max-w-xs text-sm">
            {activeTab === "upcoming"
              ? "There are no additional upcoming events listed right now. Check back soon!"
              : "No past events found in our archives."}
          </p>
        </div>
      ) : (
        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.08}>
          {displayEvents.map((event) => {
            const startDate = event.start_date ? new Date(event.start_date) : null
            const isValidStart = startDate && !isNaN(startDate.getTime())
            const dateLabel = isValidStart ? format(startDate, "MMMM d, yyyy") : "Date TBD"

            return (
              <motion.article
                key={event.id}
                variants={fadeUp}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-panel-strong hover:shadow-2xl transition-all duration-300 border border-white/20 bg-white/40 backdrop-blur-md"
              >
                <div>
                  {/* Poster Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/5 border-b border-white/10">
                    {event.cover_image ? (
                      <img
                        src={event.cover_image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-red-500/10 text-red-600">
                        <Calendar className="h-8 w-8" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 text-white px-2.5 py-1 rounded-full shadow-md">
                        {event.event_type === "week_event" ? "Week Event" : "Season Event"}
                      </span>
                      {event.featured && (
                        <span className="h-3 w-3 rounded-full bg-red-600 shadow-md" />
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-red-600 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar className="h-3 w-3" /> {dateLabel}
                      </p>
                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-red-600 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      {event.theme && (
                        <p className="text-xs text-ink-muted italic line-clamp-1">
                          Theme: "{event.theme}"
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-ink-muted line-clamp-2">
                      {event.short_description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-black/5 flex items-center justify-between">
                  {event.venue ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted truncate max-w-[150px]">
                      <MapPin className="h-3.5 w-3.5 text-red-600/70" />
                      {event.venue}
                    </span>
                  ) : (
                    <span className="text-[11px] text-ink-muted">Venue TBD</span>
                  )}
                  <Link href={`/events/${event.slug}`}>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 font-semibold gap-1 p-0 hover:bg-transparent">
                      Details <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </RevealStagger>
      )}
    </EditableSection>
  )
}
