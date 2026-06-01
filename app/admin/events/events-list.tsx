"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Search, Eye, EyeOff, Star, Calendar, MapPin, Sparkles, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { EventActions } from "@/components/admin/event-actions"
import type { Event } from "@/lib/types/database"
import { toast } from "sonner"

interface EventsListProps {
    initialEvents: Event[]
}

export function EventsList({ initialEvents }: EventsListProps) {
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [typeFilter, setTypeFilter] = useState<string>("all")
    const [featuredFilter, setFeaturedFilter] = useState<string>("all")

    // Filter and search logic
    const filteredEvents = useMemo(() => {
        return initialEvents.filter((event) => {
            // Search match
            const matchesSearch =
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                (event.theme && event.theme.toLowerCase().includes(search.toLowerCase())) ||
                (event.venue && event.venue.toLowerCase().includes(search.toLowerCase())) ||
                (event.short_description && event.short_description.toLowerCase().includes(search.toLowerCase()))

            // Status match
            const matchesStatus =
                statusFilter === "all" ||
                event.status === statusFilter

            // Type match
            const matchesType =
                typeFilter === "all" ||
                event.event_type === typeFilter

            // Featured match
            const matchesFeatured =
                featuredFilter === "all" ||
                (featuredFilter === "featured" && event.featured) ||
                (featuredFilter === "homepage" && event.is_homepage_featured)

            return matchesSearch && matchesStatus && matchesType && matchesFeatured
        })
    }, [initialEvents, search, statusFilter, typeFilter, featuredFilter])

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Events
                    </h1>
                    <p className="text-ink-muted">
                        Manage church weeks, special campaigns, retreats, and spiritual seasons.
                    </p>
                </div>
                <Button
                    asChild
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white gap-2"
                >
                    <Link href="/admin/events/create">
                        <Plus className="h-4 w-4" />
                        Create Event
                    </Link>
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                    <Input
                        placeholder="Search events by title, theme, venue..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-white/50"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="all">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>

                    {/* Event Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="h-10 rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="all">All Types</option>
                        <option value="week_event">Week Event</option>
                        <option value="season_event">Season Event</option>
                    </select>

                    {/* Featured Filter */}
                    <select
                        value={featuredFilter}
                        onChange={(e) => setFeaturedFilter(e.target.value)}
                        className="h-10 rounded-md border border-input bg-white/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="all">All Featured</option>
                        <option value="featured">Featured (General)</option>
                        <option value="homepage">Homepage Featured</option>
                    </select>
                </div>
            </div>

            {/* Events List / Table */}
            {filteredEvents.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center bg-white/20 backdrop-blur-sm">
                    <div className="rounded-full bg-black/5 p-4 mb-4">
                        <Calendar className="h-8 w-8 text-ink-muted" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink">No events found</h3>
                    <p className="mt-2 text-ink-muted max-w-xs">
                        {initialEvents.length === 0
                            ? "Start by creating your first event to showcase upcoming activities."
                            : "Try adjusting your search or filter options to find the event."}
                    </p>
                    {initialEvents.length === 0 && (
                        <Button
                            asChild
                            variant="outline"
                            className="mt-6 border-red-600/20 text-red-600 hover:bg-red-600/5"
                        >
                            <Link href="/admin/events/create">
                                Create first event
                            </Link>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)] bg-white/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black/5 bg-black/5">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted w-[80px]">Poster</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">Event Details</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">Status & Badges</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden xl:table-cell">Schedule</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {filteredEvents.map((event) => {
                                    const startDate = event.start_date ? new Date(event.start_date) : null
                                    const endDate = event.end_date ? new Date(event.end_date) : null

                                    const isValidStart = startDate && !isNaN(startDate.getTime())
                                    const isValidEnd = endDate && !isNaN(endDate.getTime())

                                    const isSameDay = isValidStart && isValidEnd && startDate.toDateString() === endDate.toDateString()

                                    return (
                                        <tr key={event.id} className="group hover:bg-black/5 transition-colors">
                                            {/* Poster Column */}
                                            <td className="px-6 py-4">
                                                <div className="relative h-14 w-10 overflow-hidden rounded-md bg-black/5 border border-black/10 shadow-sm flex items-center justify-center">
                                                    {event.cover_image ? (
                                                        <img
                                                            src={event.cover_image}
                                                            alt={event.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center bg-red-500/10 text-red-600">
                                                            <Calendar className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Event Details */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-ink line-clamp-1">{event.title}</span>
                                                    {event.theme && (
                                                        <span className="text-xs text-ink-muted italic line-clamp-1">
                                                            Theme: {event.theme}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-ink-muted lg:hidden">
                                                        <MapPin className="h-3 w-3 inline" />
                                                        <span className="truncate">{event.venue || "TBD"}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Event Type */}
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                {event.event_type === "week_event" ? (
                                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                                                        Week Event
                                                    </Badge>
                                                ) : event.event_type === "season_event" ? (
                                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                                                        Season Event
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-500/20">
                                                        {event.event_type}
                                                    </Badge>
                                                )}
                                            </td>

                                            {/* Status & Badges */}
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {event.status === "published" ? (
                                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1">
                                                            <Eye className="h-3 w-3" /> Published
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1">
                                                            <EyeOff className="h-3 w-3" /> Draft
                                                        </Badge>
                                                    )}
                                                    {event.featured && (
                                                        <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 gap-1">
                                                            <Sparkles className="h-3 w-3" /> Featured
                                                        </Badge>
                                                    )}
                                                    {event.is_homepage_featured && (
                                                        <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 gap-1">
                                                            <Star className="h-3 w-3 fill-current" /> Homepage
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Schedule (Dates & Venue) */}
                                            <td className="px-6 py-4 hidden xl:table-cell">
                                                <div className="flex flex-col text-xs text-ink-muted gap-1">
                                                    <div className="flex items-center gap-1 font-medium text-ink">
                                                        <Calendar className="h-3.5 w-3.5 text-red-600/70" />
                                                        <span>
                                                            {isValidStart && isValidEnd ? (
                                                                isSameDay
                                                                    ? format(startDate, "MMM d, yyyy")
                                                                    : `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`
                                                            ) : isValidStart ? (
                                                                format(startDate, "MMM d, yyyy")
                                                            ) : (
                                                                "No date set"
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3.5 w-3.5 text-ink-muted/70" />
                                                        <span className="truncate max-w-[180px]">{event.venue || "TBD"}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <EventActions event={event} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
