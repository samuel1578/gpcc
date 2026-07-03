"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import {
    Search,
    HeartHandshake,
    Download,
    Calendar,
    User,
    Mail,
    Phone,
    HandCoins,
    Clock,
    CheckCircle2,
    XCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/motion/reveal"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { Pledge } from "@/lib/types/database"
import { updatePledgeStatus } from "@/lib/actions/pledges"
import { toast } from "sonner"

interface PledgeListProps {
    initialPledges: Pledge[]
}

const statusConfig = {
    new: { label: "New", color: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Clock },
    contacted: { label: "Contacted", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Phone },
    completed: { label: "Completed", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", color: "bg-slate-500/10 text-slate-600 border-slate-500/20", icon: XCircle },
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
    }).format(amount).replace("GHS", "GH₵")
}

function generateCSV(pledges: Pledge[]): string {
    const header = ["Name", "Email", "Phone", "Amount", "Status", "Note", "Date Submitted"]
    const rows = pledges.map((p) => [
        p.full_name,
        p.email,
        p.phone,
        p.amount.toString(),
        p.status,
        p.note || "",
        format(new Date(p.created_at), "MMM d, yyyy, h:mm a"),
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
    link.download = `pledges-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
}

export function PledgeList({ initialPledges }: PledgeListProps) {
    const [search, setSearch] = useState("")
    const [pledges, setPledges] = useState(initialPledges)

    const filteredPledges = useMemo(() => {
        if (!search.trim()) return pledges
        const query = search.toLowerCase()
        return pledges.filter((p) =>
            p.full_name.toLowerCase().includes(query) ||
            p.email.toLowerCase().includes(query) ||
            p.phone.toLowerCase().includes(query) ||
            (p.note && p.note.toLowerCase().includes(query))
        )
    }, [pledges, search])

    const stats = useMemo(() => {
        const total = pledges.length
        const totalAmount = pledges.reduce((sum, p) => sum + p.amount, 0)
        const newCount = pledges.filter((p) => p.status === "new").length
        return { total, totalAmount, newCount }
    }, [pledges])

    const handleStatusUpdate = async (id: string, newStatus: Pledge["status"]) => {
        const result = await updatePledgeStatus(id, newStatus)
        if (result.success) {
            setPledges(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    const handleExport = () => {
        const csv = generateCSV(filteredPledges)
        downloadCSV(csv)
    }

    if (pledges.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/5 p-8 text-center">
                <div className="rounded-full bg-black/5 p-4 mb-4">
                    <HeartHandshake className="h-8 w-8 text-ink-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                    No pledges yet
                </h3>
                <p className="mt-2 text-ink-muted max-w-xs">
                    Submissions will appear here once visitors start making pledges through the giving section.
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
                        icon={HeartHandshake}
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                        label="Total Pledges"
                        value={stats.total.toString()}
                        description="All pledge intents"
                    />
                    <StatCard
                        icon={HandCoins}
                        color="text-emerald-500"
                        bg="bg-emerald-500/10"
                        label="Total Pledged"
                        value={formatCurrency(stats.totalAmount)}
                        description="Cumulative value"
                    />
                    <StatCard
                        icon={Clock}
                        color="text-amber-500"
                        bg="bg-amber-500/10"
                        label="New Pledges"
                        value={stats.newCount.toString()}
                        description="Awaiting contact"
                    />
                </div>
            </Reveal>

            {/* Search + Export */}
            <Reveal delay={0.05}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                        <Input
                            placeholder="Search pledges..."
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

            {/* Table */}
            <Reveal delay={0.1}>
                <div className="rounded-2xl glass-panel overflow-hidden shadow-[var(--shadow-soft)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-black/5 bg-black/5">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                        Partner
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                        Note
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted whitespace-nowrap">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {filteredPledges.map((pledge) => {
                                    const status = statusConfig[pledge.status]
                                    return (
                                        <tr
                                            key={pledge.id}
                                            className="group hover:bg-black/5 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-ink flex items-center gap-1.5">
                                                        <User className="h-3.5 w-3.5 text-ink-muted/50" />
                                                        {pledge.full_name}
                                                    </span>
                                                    <span className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                                                        <Mail className="h-3.5 w-3.5 text-ink-muted/50" />
                                                        {pledge.email}
                                                    </span>
                                                    <span className="text-xs text-ink-muted flex items-center gap-1.5 mt-0.5">
                                                        <Phone className="h-3.5 w-3.5 text-ink-muted/50" />
                                                        {pledge.phone}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-ink">
                                                    {formatCurrency(pledge.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Select
                                                    defaultValue={pledge.status}
                                                    onValueChange={(val) => handleStatusUpdate(pledge.id, val as Pledge["status"])}
                                                >
                                                    <SelectTrigger className={cn("w-[130px] h-8 text-[11px] font-semibold uppercase tracking-wider", status.color)}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(statusConfig).map(([key, cfg]) => (
                                                            <SelectItem key={key} value={key} className="text-[11px] uppercase tracking-wider font-semibold">
                                                                {cfg.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </td>
                                            <td className="px-6 py-4 min-w-[200px]">
                                                <p className="text-sm text-ink-muted line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                    {pledge.note || <span className="italic opacity-50">No note</span>}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-ink-muted">
                                                    {format(new Date(pledge.created_at), "MMM d, yyyy")}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Reveal>
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
    value: string
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
                    <span className="text-3xl font-bold text-ink tracking-tight">
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
