"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Search, Mail, Globe, Users, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import type { NewsletterSubscriber } from "@/lib/types/database"

interface NewsletterListProps {
    initialSubscribers: NewsletterSubscriber[]
}

function generateCSV(subscribers: NewsletterSubscriber[]): string {
    const header = ["Email", "Status", "Source", "Date Subscribed"]
    const rows = subscribers.map((s) => [
        s.email,
        s.status,
        s.source,
        format(new Date(s.created_at), "MMM d, yyyy, h:mm a"),
    ])

    const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
    const csv = [header.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join("\n")

    return csv
}

function downloadCSV(csv: string) {
    const today = format(new Date(), "yyyy-MM-dd")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `newsletter-subscribers-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
}

export function NewsletterList({ initialSubscribers }: NewsletterListProps) {
    const [search, setSearch] = useState("")

    const filteredSubscribers = useMemo(() => {
        if (!search.trim()) return initialSubscribers
        const query = search.toLowerCase()
        return initialSubscribers.filter((s) =>
            s.email.toLowerCase().includes(query),
        )
    }, [initialSubscribers, search])

    const totalCount = initialSubscribers.length
    const activeCount = initialSubscribers.filter((s) => s.status === "active").length
    const websiteCount = initialSubscribers.filter((s) => s.source === "website").length

    const isEmpty = totalCount === 0
    const isSearchEmpty = !isEmpty && filteredSubscribers.length === 0

    const handleExport = () => {
        const csv = generateCSV(filteredSubscribers)
        downloadCSV(csv)
    }

    if (isEmpty) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <Mail className="h-8 w-8 text-ink-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                    No newsletter subscribers yet
                </h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    Subscribers will appear here once visitors start signing up through the website newsletter form.
                </p>
            </div>
        )
    }

    return (
        <>
            {/* Stat Cards */}
            <Reveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        icon={Users}
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                        label="Total Subscribers"
                        value={totalCount}
                        description="All newsletter signups"
                    />
                    <StatCard
                        icon={Mail}
                        color="text-emerald-500"
                        bg="bg-emerald-500/10"
                        label="Active Subscribers"
                        value={activeCount}
                        description="Currently active"
                    />
                    <StatCard
                        icon={Globe}
                        color="text-fuchsia-500"
                        bg="bg-fuchsia-500/10"
                        label="Website Signups"
                        value={websiteCount}
                        description="From gpcconline.org"
                    />
                </div>
            </Reveal>

            {/* Search + Export */}
            <Reveal delay={0.05}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                        <Input
                            placeholder="Search subscribers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 bg-white/50"
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        className="gap-2 bg-white/50 shrink-0"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </Button>
                </div>
            </Reveal>

            {/* Empty search results */}
            {isSearchEmpty ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center bg-white/20 backdrop-blur-sm">
                    <div className="rounded-full bg-black/5 p-4 mb-4">
                        <Search className="h-8 w-8 text-ink-muted" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                        No subscribers match your search
                    </h3>
                    <p className="mt-2 text-ink-muted max-w-xs">
                        Try adjusting your search term or clear the search to see all subscribers.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setSearch("")}
                        className="mt-6"
                    >
                        Clear search
                    </Button>
                </div>
            ) : (
                /* Subscribers Table */
                <Reveal delay={0.1}>
                    <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/5">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden md:table-cell">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden lg:table-cell">
                                            Source
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted hidden xl:table-cell">
                                            Date Subscribed
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {filteredSubscribers.map((subscriber) => (
                                        <tr
                                            key={subscriber.id}
                                            className="group hover:bg-black/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 max-w-0 w-full">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-medium text-ink truncate">
                                                        {subscriber.email}
                                                    </span>
                                                    <span className="text-xs text-ink-muted xl:hidden">
                                                        {format(
                                                            new Date(subscriber.created_at),
                                                            "MMM d, yyyy, h:mm a",
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell whitespace-nowrap">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        subscriber.status === "active"
                                                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 capitalize"
                                                            : subscriber.status === "unsubscribed"
                                                                ? "bg-red-500/10 text-red-600 border-red-500/20 capitalize"
                                                                : "bg-amber-500/10 text-amber-600 border-amber-500/20 capitalize"
                                                    }
                                                >
                                                    {subscriber.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell whitespace-nowrap">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        subscriber.source === "website"
                                                            ? "bg-blue-500/10 text-blue-600 border-blue-500/20 capitalize"
                                                            : subscriber.source === "event"
                                                                ? "bg-purple-500/10 text-purple-600 border-purple-500/20 capitalize"
                                                                : subscriber.source === "admin"
                                                                    ? "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 capitalize"
                                                                    : "bg-gray-500/10 text-gray-600 border-gray-500/20 capitalize"
                                                    }
                                                >
                                                    {subscriber.source}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 hidden xl:table-cell whitespace-nowrap">
                                                <span className="text-sm text-ink-muted">
                                                    {format(
                                                        new Date(subscriber.created_at),
                                                        "MMM d, yyyy, h:mm a",
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>
            )}
        </>
    )
}

function StatCard({
    icon: Icon,
    color,
    bg,
    label,
    value,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>
    color: string
    bg: string
    label: string
    value: number
    description: string
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border-none bg-white p-6 shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-elevated)]">
            <div className="flex items-start justify-between">
                <div className={`${bg} p-3 rounded-2xl ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="mt-6 space-y-1">
                <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wider">
                    {label}
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-ink tracking-tight">
                        {value}
                    </span>
                </div>
                <p className="text-sm text-ink-muted/80">
                    {description}
                </p>
            </div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-transparent to-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    )
}
