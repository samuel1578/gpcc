import { notFound } from "next/navigation"
import { getEventBySlug } from "@/lib/actions/events"
import { Reveal, RevealStagger } from "@/components/motion/reveal"
import { Calendar, MapPin, Clock, BookOpen, Sparkles, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"
import { AdaptivePoster } from "../adaptive-poster"

interface EventDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: EventDetailPageProps) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        return {
            title: "Event Not Found | GPCC",
        }
    }

    return {
        title: `${event.title} | GPCC`,
        description: event.short_description,
    }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
    const { slug } = await params
    const event = await getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    const startDate = event.start_date ? new Date(event.start_date) : null
    const endDate = event.end_date ? new Date(event.end_date) : null
    const isValidStart = startDate && !isNaN(startDate.getTime())
    const isValidEnd = endDate && !isNaN(endDate.getTime())

    function formatEventDateRange() {
        if (!isValidStart) return "Date TBD"
        if (!isValidEnd) return format(startDate, "MMMM d, yyyy")

        const isSameDay = startDate.toDateString() === endDate.toDateString()
        if (isSameDay) {
            return format(startDate, "MMMM d, yyyy")
        }

        const isSameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()
        if (isSameMonth) {
            return `${format(startDate, "MMMM d")} – ${format(endDate, "d, yyyy")}`
        }

        return `${format(startDate, "MMMM d")} – ${format(endDate, "MMMM d, yyyy")}`
    }

    const scheduleItems = Array.isArray(event.schedule) ? event.schedule : []

    if (event.event_type === "season_event") {
        return (
            <SeasonEventLayout
                event={event}
                dateLabel={formatEventDateRange()}
                scheduleItems={scheduleItems}
            />
        )
    }

    return (
        <WeekEventLayout
            event={event}
            dateLabel={formatEventDateRange()}
            scheduleItems={scheduleItems}
        />
    )
}

/* ==========================================================================
   SEASON EVENT LAYOUT: Cinematic, scripture-focused, atmospheric storytelling
   ========================================================================== */
interface LayoutProps {
    event: any
    dateLabel: string
    scheduleItems: any[]
}

function SeasonEventLayout({ event, dateLabel, scheduleItems }: LayoutProps) {
    return (
        <div className="min-h-screen bg-[#0f1419] text-white/90 pb-24 pt-20">
            {/* Ambient Background Glow */}
            {event.cover_image && (
                <div className="absolute inset-0 h-[60vh] w-full overflow-hidden pointer-events-none opacity-20 filter blur-3xl">
                    <img src={event.cover_image} alt="" className="h-full w-full object-cover scale-125" />
                </div>
            )}

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 space-y-16">
                {/* Back Button */}
                <Reveal>
                    <Link href="/events" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4 text-red-500" /> Back to Events
                    </Link>
                </Reveal>

                {/* Hero Block */}
                <div className="grid gap-12 lg:grid-cols-12 items-center">
                    {/* Poster Side */}
                    <Reveal className="lg:col-span-5 flex justify-center">
                        <div className="relative aspect-[3/4] w-full max-w-[420px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 group">
                            {event.cover_image ? (
                                <img
                                    src={event.cover_image}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/40">
                                    <Calendar className="h-16 w-16" />
                                </div>
                            )}
                            {event.featured && (
                                <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
                                    <Sparkles className="h-3 w-3" /> Featured Campaign
                                </span>
                            )}
                        </div>
                    </Reveal>

                    {/* Meta & Storytelling Side */}
                    <div className="lg:col-span-7 space-y-8">
                        <RevealStagger className="space-y-4" staggerChildren={0.06}>
                            <span className="text-xs font-bold uppercase tracking-widest text-red-500 px-3 py-1 rounded-full bg-red-500/10 w-fit">
                                Spiritual Season
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                                {event.title}
                            </h1>
                            {event.theme && (
                                <p className="font-display text-xl sm:text-2xl font-semibold text-white/80 italic">
                                    Theme: "{event.theme}"
                                </p>
                            )}
                        </RevealStagger>

                        {/* Scripture Callout */}
                        {event.scripture && (
                            <Reveal delay={0.15}>
                                <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden">
                                    <BookOpen className="absolute right-4 bottom-4 h-24 w-24 text-white/[0.02] pointer-events-none" />
                                    <p className="font-display text-lg sm:text-xl font-medium text-white/90 italic leading-relaxed">
                                        "{event.scripture}"
                                    </p>
                                    <span className="block mt-3 text-xs font-bold uppercase tracking-widest text-red-500">
                                        Anchor Scripture
                                    </span>
                                </div>
                            </Reveal>
                        )}

                        {/* Timing / Location Details */}
                        <Reveal delay={0.2}>
                            <div className="grid gap-4 sm:grid-cols-2 text-sm text-white/70 border-t border-b border-white/10 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-500 border border-white/10">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Duration</p>
                                        <p className="font-semibold text-white">{dateLabel}</p>
                                    </div>
                                </div>
                                {event.venue && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-500 border border-white/10">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Gathering Point</p>
                                            <p className="font-semibold text-white truncate max-w-[200px]">{event.venue}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Campaign Storytelling Description */}
                <div className="grid gap-12 lg:grid-cols-12 pt-8">
                    <div className="lg:col-span-7 space-y-6">
                        <Reveal>
                            <h3 className="font-display text-2xl font-bold text-white border-b border-white/10 pb-3">
                                About the Campaign
                            </h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="body-lg text-white/70 leading-relaxed font-light">
                                {event.short_description}
                            </p>
                        </Reveal>
                        {event.full_description && (
                            <Reveal delay={0.15}>
                                <div className="text-white/60 leading-relaxed font-light whitespace-pre-line space-y-4">
                                    {event.full_description}
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* Atmospheric Schedule Builder Side */}
                    {scheduleItems.length > 0 && (
                        <div className="lg:col-span-5 space-y-6">
                            <Reveal>
                                <h3 className="font-display text-2xl font-bold text-white border-b border-white/10 pb-3">
                                    Fasting &amp; Prayer Schedule
                                </h3>
                            </Reveal>
                            <RevealStagger className="space-y-4" staggerChildren={0.06}>
                                {scheduleItems.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-red-600/10 text-red-500 border border-red-500/20">
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Day</span>
                                            <span className="text-sm font-extrabold leading-none">{idx + 1}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-red-500 uppercase tracking-wider">{item.day}</p>
                                            <h4 className="text-sm font-bold text-white leading-tight">{item.title}</h4>
                                            <p className="text-xs text-white/50 flex items-center gap-1 mt-1">
                                                <Clock className="h-3.5 w-3.5" /> {item.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </RevealStagger>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* ==========================================================================
   WEEK EVENT LAYOUT: Schedule-focused, daily timeline agenda sections
   ========================================================================== */
function WeekEventLayout({ event, dateLabel, scheduleItems }: LayoutProps) {
    return (
        <div className="min-h-screen bg-[#f5f3ee] text-ink pb-24 pt-20">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 space-y-16">
                {/* Back Button */}
                <Reveal>
                    <Link href="/events" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-ink transition-colors">
                        <ChevronLeft className="h-4 w-4 text-red-600" /> Back to Events
                    </Link>
                </Reveal>

                {/* Hero Header Block */}
                <div className="grid gap-12 lg:grid-cols-12 items-start">
                    {/* Poster Side */}
                    <Reveal className="lg:col-span-5 flex justify-center w-full">
                        <AdaptivePoster
                            src={event.cover_image}
                            alt={event.title}
                            featured={event.featured}
                        />
                    </Reveal>

                    {/* Details Side */}
                    <div className="lg:col-span-7 space-y-8">
                        <RevealStagger className="space-y-4" staggerChildren={0.06}>
                            <span className="text-xs font-bold uppercase tracking-widest text-red-600 px-3 py-1 rounded-full bg-red-500/10 w-fit">
                                Week Event / Conference
                            </span>
                            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">
                                {event.title}
                            </h1>
                            {event.theme && (
                                <p className="font-display text-xl sm:text-2xl font-semibold text-ink-muted italic">
                                    Theme: "{event.theme}"
                                </p>
                            )}
                        </RevealStagger>

                        {/* Anchor Scripture */}
                        {event.scripture && (
                            <Reveal delay={0.15}>
                                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/5 shadow-sm relative overflow-hidden">
                                    <BookOpen className="absolute right-4 bottom-4 h-24 w-24 text-black/[0.01] pointer-events-none" />
                                    <p className="font-display text-lg sm:text-xl font-medium text-ink italic leading-relaxed">
                                        "{event.scripture}"
                                    </p>
                                    <span className="block mt-3 text-xs font-bold uppercase tracking-widest text-red-600">
                                        Anchor Scripture
                                    </span>
                                </div>
                            </Reveal>
                        )}

                        {/* Timing / Location Details */}
                        <Reveal delay={0.2}>
                            <div className="grid gap-4 sm:grid-cols-2 text-sm text-ink-muted border-t border-b border-black/5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 border border-black/5 shadow-sm">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-ink-muted/60">Dates</p>
                                        <p className="font-semibold text-ink">{dateLabel}</p>
                                    </div>
                                </div>
                                {event.venue && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 border border-black/5 shadow-sm">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold tracking-wider text-ink-muted/60">Venue</p>
                                            <p className="font-semibold text-ink truncate max-w-[200px]">{event.venue}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        {/* Timeline Schedule Section — nested under Timing/Location, before Event Details */}
                        {scheduleItems.length > 0 && (
                            <div className="space-y-8 pt-4">
                                <Reveal>
                                    <div className="space-y-1">
                                        <p className="label-cap text-red-600">Day by Day</p>
                                        <h2 className="font-display text-2xl font-bold text-ink">
                                            Agenda &amp; Schedule
                                        </h2>
                                        <p className="text-sm text-ink-muted">
                                            Join us for each of these scheduled sessions during the week.
                                        </p>
                                    </div>
                                </Reveal>

                                <RevealStagger className="relative border-l-2 border-red-600/20 pl-6 space-y-6 py-2" staggerChildren={0.07}>
                                    {scheduleItems.map((item: any, idx: number) => (
                                        <div key={idx} className="relative group">
                                            {/* Timeline Node Bullet */}
                                            <div className="absolute -left-[27px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 border-4 border-[#f5f3ee] shadow-sm group-hover:scale-125 transition-transform duration-300" />

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow duration-300 shadow-sm">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-500/10 px-2.5 py-1 rounded-full">
                                                        {item.day}
                                                    </span>
                                                    <h4 className="font-display text-base sm:text-lg font-bold text-ink pt-1 leading-tight">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-ink-muted font-semibold shrink-0 bg-black/5 px-3 py-1.5 rounded-xl border border-black/5">
                                                    <Clock className="h-4 w-4 text-red-600" />
                                                    <span>{item.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </RevealStagger>
                            </div>
                        )}

                        {/* About/Description */}
                        <div className="space-y-4 pt-4">
                            <h3 className="font-display text-2xl font-bold text-ink border-b border-black/5 pb-2">
                                Event Details
                            </h3>
                            <p className="body-lg text-ink-muted leading-relaxed font-light">
                                {event.short_description}
                            </p>
                            {event.full_description && (
                                <div className="text-ink-muted leading-relaxed font-light whitespace-pre-line space-y-4 text-sm">
                                    {event.full_description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}