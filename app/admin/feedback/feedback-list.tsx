"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Search, MessageSquare, Download, Calendar, User, Mail, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import type { FeedbackSubmission } from "@/lib/types/database"

interface FeedbackListProps {
    initialSubmissions: FeedbackSubmission[]
}

function generateCSV(submissions: FeedbackSubmission[]): string {
    const header = ["Name", "Email", "Type", "Message", "Date Submitted"]
    const rows = submissions.map((s) => [
        s.name,
        s.email,
        s.feedback_type,
        s.message,
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
    link.download = `feedback-submissions-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
}

export function FeedbackList({ initialSubmissions }: FeedbackListProps) {
    const [search, setSearch] = useState("")

    const filteredSubmissions = useMemo(() => {
        if (!search.trim()) return initialSubmissions
        const query = search.toLowerCase()
        return initialSubmissions.filter((s) =>
            s.name.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            s.feedback_type.toLowerCase().includes(query) ||
            s.message.toLowerCase().includes(query)
        )
    }, [initialSubmissions, search])

    const totalCount = initialSubmissions.length
    const prayerRequests = initialSubmissions.filter((s) => s.feedback_type === "Prayer Request").length
    const testimonies = initialSubmissions.filter((s) => s.feedback_type === "Testimony / Thanksgiving").length

    const isEmpty = totalCount === 0
    const isSearchEmpty = !isEmpty && filteredSubmissions.length === 0

    const handleExport = () => {
        const csv = generateCSV(filteredSubmissions)
        downloadCSV(csv)
    }

    if (isEmpty) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <MessageSquare className="h-8 w-8 text-ink-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                    No feedback submissions yet
                </h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    Submissions will appear here once visitors start sending feedback through the contact form.
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
                        icon={MessageSquare}
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                        label="Total Submissions"
                        value={totalCount}
                        description="All feedback received"
                    />
                    <StatCard
                        icon={Calendar}
                        color="text-emerald-500"
                        bg="bg-emerald-500/10"
                        label="Prayer Requests"
                        value={prayerRequests}
                        description="Spiritual support needs"
                    />
                    <StatCard
                        icon={Tag}
                        color="text-fuchsia-500"
                        bg="bg-fuchsia-500/10"
                        label="Testimonies"
                        value={testimonies}
                        description="Praise reports shared"
                    />
                </div>
            </Reveal>

            {/* Search + Export */}
            <Reveal delay={0.05}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                        <Input
                            placeholder="Search feedback..."
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
                        No submissions match your search
                    </h3>
                    <p className="mt-2 text-ink-muted max-w-xs">
                        Try adjusting your search term or clear the search to see all submissions.
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
                /* Submissions Table */
                <Reveal delay={0.1}>
                    <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/5">
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                            Sender
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                            Feedback Type
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                            Message
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted whitespace-nowrap">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {filteredSubmissions.map((submission) => (
                                        <tr
                                            key={submission.id}
                                            className="group hover:bg-black/5 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-ink flex items-center gap-1.5">
                                                        <User className="h-3.5 w-3.5 text-ink-muted/50" />
                                                        {submission.name}
                                                    </span>
                                                    <span className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                                                        <Mail className="h-3.5 w-3.5 text-ink-muted/50" />
                                                        {submission.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-primary/5 text-primary border-primary/10 whitespace-nowrap"
                                                >
                                                    {submission.feedback_type}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 min-w-[300px]">
                                                <p className="text-sm text-ink-muted line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                    {submission.message}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-ink-muted">
                                                    {format(
                                                        new Date(submission.created_at),
                                                        "MMM d, yyyy"
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
