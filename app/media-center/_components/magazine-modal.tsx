"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import { PillButton } from "@/components/ui/pill-button"
import { Input } from "@/components/ui/input"

interface MagazineModalContentProps {
    onClose: () => void
}

function MagazineModalContent({ onClose }: MagazineModalContentProps) {
    const [isOrderOpen, setIsOrderOpen] = React.useState(false)
    const [showSummary, setShowSummary] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    // Form states
    const [name, setName] = React.useState("")
    const [delivery, setDelivery] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [copies, setCopies] = React.useState(1)

    const unitPrice = 40
    const total = copies * unitPrice

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !delivery.trim() || !phone.trim() || copies < 1) {
            setError("Please fill in all fields to complete your order.")
            return
        }
        setError(null)
        setShowSummary(true)
    }

    const handleCancel = () => {
        setName("")
        setDelivery("")
        setPhone("")
        setCopies(1)
        setError(null)
        setIsOrderOpen(false)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Left Column - Static Image */}
            <div className="md:col-span-2 flex flex-col items-center">
                <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl shadow-xl border border-black/10 bg-slate-100">
                    <Image
                        src="/images/media/herald.jpg"
                        alt="The Herald Magazine Cover"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 30vw"
                        priority
                    />
                </div>
            </div>

            {/* Right Column - Content */}
            <div className="md:col-span-3 flex flex-col h-full justify-between">
                <div>
                    <DialogTitle className="font-display text-3xl font-semibold text-slate-900 tracking-tight">
                        The Herald
                    </DialogTitle>
                    <p className="text-xl font-medium text-[var(--accent-gold)] mt-2">
                        Price: {unitPrice} GHS
                    </p>

                    <AnimatePresence mode="wait">
                        {!isOrderOpen ? (
                            /* About Section */
                            <motion.div
                                key="about"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-6 space-y-6 text-slate-700 text-sm leading-relaxed"
                            >
                                <div>
                                    <h4 className="font-display text-lg font-semibold text-slate-800 mb-2">
                                        About The Herald
                                    </h4>
                                    <p className="mb-4">
                                        The Herald is our monthly magazine with news, events, and stories from the Global Peace Christian Centre community. Get updates, testimonies, and inspirational pieces each month.
                                    </p>
                                    <p>
                                        Subscribe or order a copy for delivery. Quantity discounts may apply for bulk orders.
                                    </p>
                                </div>
                            </motion.div>
                        ) : showSummary ? (
                            /* Confirmation Summary View */
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900"
                            >
                                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-lg mb-4">
                                    <Check className="size-5" />
                                    Order Placed Successfully!
                                </div>
                                <p className="text-sm mb-4">
                                    Thank you for your order. Here is a summary of your request:
                                </p>
                                <div className="space-y-2 text-sm border-t border-emerald-200/50 pt-4">
                                    <div>
                                        <span className="font-medium">Name:</span> {name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Phone:</span> {phone}
                                    </div>
                                    <div>
                                        <span className="font-medium">Delivery Location:</span> {delivery}
                                    </div>
                                    <div>
                                        <span className="font-medium">Number of Copies:</span> {copies}
                                    </div>
                                    <div className="text-base font-semibold text-emerald-950 pt-2 border-t border-emerald-200/30">
                                        Total Price: {total} GHS
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <PillButton size="sm" variant="emerald" onClick={onClose}>
                                        Close
                                    </PillButton>
                                </div>
                            </motion.div>
                        ) : (
                            /* Order Form View */
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25 }}
                                className="mt-6"
                            >
                                <form onSubmit={handleConfirm} className="space-y-4">
                                    {error && (
                                        <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs flex items-center gap-2">
                                            <AlertCircle className="size-4 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Name
                                        </label>
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-slate-50/50 border-slate-200 text-slate-900 focus-visible:ring-[var(--accent-gold)]"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Delivery Location
                                        </label>
                                        <Input
                                            type="text"
                                            value={delivery}
                                            onChange={(e) => setDelivery(e.target.value)}
                                            placeholder="Address or pickup location"
                                            className="bg-slate-50/50 border-slate-200 text-slate-900 focus-visible:ring-[var(--accent-gold)]"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Phone Number
                                        </label>
                                        <Input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+233 24X XXX XXX"
                                            className="bg-slate-50/50 border-slate-200 text-slate-900 focus-visible:ring-[var(--accent-gold)]"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 items-end">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Copies
                                            </label>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={copies}
                                                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                                                className="bg-slate-50/50 border-slate-200 text-slate-900 focus-visible:ring-[var(--accent-gold)]"
                                                required
                                            />
                                        </div>
                                        <div className="p-2.5 rounded-md bg-slate-50 text-right border border-slate-100">
                                            <p className="text-xs text-slate-400">Total Price</p>
                                            <p className="text-lg font-bold text-slate-900">{total} GHS</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center justify-end gap-3">
                                        <PillButton size="sm" variant="ghost" onClick={handleCancel}>
                                            Cancel
                                        </PillButton>
                                        <PillButton size="sm" variant="primary" type="submit">
                                            Confirm Order
                                        </PillButton>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Toggle Button (Only visible when not showing the final summary) */}
                {!showSummary && (
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                        <PillButton
                            size="sm"
                            variant={isOrderOpen ? "secondary" : "rose"}
                            onClick={() => setIsOrderOpen(!isOrderOpen)}
                        >
                            {isOrderOpen ? "Fill the form to complete your order" : "Order Now"}
                        </PillButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export function MagazineModal() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <PillButton size="sm" variant="primary">
                    Explore
                </PillButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white border border-slate-100 text-slate-900 shadow-2xl">
                {open && <MagazineModalContent onClose={() => setOpen(false)} />}
            </DialogContent>
        </Dialog>
    )
}
