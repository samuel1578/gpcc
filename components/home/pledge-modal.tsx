"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, HeartHandshake } from "lucide-react"
import { ease } from "@/lib/motion"
import { PillButton } from "@/components/ui/pill-button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface PledgeFormState {
    fullName: string
    email: string
    phone: string
    amount: string
    note: string
}

const EMPTY_FORM: PledgeFormState = {
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    note: "",
}

export function PledgeModal({ onClose }: { onClose: () => void }) {
    const isMobile = useIsMobile()
    const [mounted, setMounted] = useState(false)
    const [form, setForm] = useState<PledgeFormState>(EMPTY_FORM)
    const [errors, setErrors] = useState<Partial<Record<keyof PledgeFormState, string>>>({})
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        document.body.classList.add("modal-active")
        return () => {
            setMounted(false)
            document.body.style.overflow = prev
            document.body.classList.remove("modal-active")
        }
    }, [])

    if (!mounted) return null

    function update<K extends keyof PledgeFormState>(key: K, value: string) {
        setForm((f) => ({ ...f, [key]: value }))
        setErrors((e) => ({ ...e, [key]: undefined }))
    }

    function validate(): boolean {
        const next: typeof errors = {}
        if (!form.fullName.trim()) next.fullName = "Please enter your full name."
        if (!form.email.trim()) {
            next.email = "Please enter your email address."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            next.email = "Please enter a valid email address."
        }
        if (!form.phone.trim()) next.phone = "Please enter a phone number."
        if (!form.amount.trim()) {
            next.amount = "Please enter a pledge amount."
        } else if (Number(form.amount) <= 0 || isNaN(Number(form.amount))) {
            next.amount = "Please enter a valid amount."
        }
        setErrors(next)
        return Object.keys(next).length === 0
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validate()) return
        setSubmitting(true)
        // TODO (next phase): wire this to the backend (e.g. a Supabase "pledges"
        // table) so pledge intents are actually captured and routed to the
        // Welfare Team. This currently only simulates a successful submission —
        // no data is persisted or sent anywhere yet.
        await new Promise((resolve) => setTimeout(resolve, 600))
        setSubmitting(false)
        setSubmitted(true)
    }

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className={cn(
                    "fixed inset-0 z-[200] flex bg-black/60 backdrop-blur-md px-4",
                    isMobile ? "items-end" : "items-center justify-center"
                )}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={isMobile ? { y: "100%" } : { opacity: 0, y: 24, scale: 0.97 }}
                    animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={isMobile ? { y: "100%" } : { opacity: 0, y: 20, scale: 0.97 }}
                    transition={{ duration: 0.4, ease }}
                    style={{ backgroundColor: "#ffffff" }}
                    className={cn(
                        "relative w-full overflow-y-auto",
                        isMobile
                            ? "rounded-t-3xl max-h-[90vh]"
                            : "rounded-3xl max-h-[92vh] max-w-lg mx-auto shadow-2xl"
                    )}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-ink backdrop-blur-sm hover:bg-black/10 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <div className="px-6 py-8 sm:px-10 sm:py-10">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease }}
                                className="flex flex-col items-center text-center py-6"
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-deep)]/10 text-[var(--accent-deep)]">
                                    <HeartHandshake className="h-7 w-7" />
                                </span>
                                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                                    Thank you, {form.fullName.split(" ")[0]}.
                                </h3>
                                <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-sm">
                                    Your pledge has been received. Our Global Peace Christian Centre
                                    Welfare Team will contact you shortly on how to complete your
                                    pledge.
                                </p>
                                <div className="mt-8">
                                    <PillButton onClick={onClose} variant="primary">
                                        Close
                                    </PillButton>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <p className="label-cap text-[var(--accent-deep)]">Partner with us</p>
                                <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                                    Make a Pledge
                                </h3>
                                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                                    Share your details and pledge amount below. Our Welfare Team
                                    will reach out to guide you on how to complete your pledge.
                                </p>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                                            Full name
                                        </label>
                                        <input
                                            type="text"
                                            value={form.fullName}
                                            onChange={(e) => update("fullName", e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-ink outline-none focus:border-[var(--accent-deep)] transition-colors"
                                        />
                                        {errors.fullName && (
                                            <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-ink outline-none focus:border-[var(--accent-deep)] transition-colors"
                                        />
                                        {errors.email && (
                                            <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                                            Phone number
                                        </label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            placeholder="+233 ..."
                                            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-ink outline-none focus:border-[var(--accent-deep)] transition-colors"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                                            Pledge amount (GH₵)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            min="0"
                                            value={form.amount}
                                            onChange={(e) => update("amount", e.target.value)}
                                            placeholder="0.00"
                                            className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-ink outline-none focus:border-[var(--accent-deep)] transition-colors"
                                        />
                                        {errors.amount && (
                                            <p className="mt-1.5 text-xs text-red-600">{errors.amount}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-ink-muted mb-1.5">
                                            Note (optional)
                                        </label>
                                        <textarea
                                            value={form.note}
                                            onChange={(e) => update("note", e.target.value)}
                                            placeholder="Anything you'd like our Welfare Team to know?"
                                            rows={3}
                                            className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-ink outline-none focus:border-[var(--accent-deep)] transition-colors"
                                        />
                                    </div>
                                    <p className="text-xs text-ink-muted leading-relaxed bg-black/[0.03] rounded-xl px-4 py-3">
                                        By submitting, our Global Peace Christian Centre Welfare Team
                                        will contact you to guide you on how to complete your pledge.
                                    </p>
                                    <PillButton
                                        type="submit"
                                        variant="rose"
                                        size="lg"
                                        className="w-full"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting..." : "Submit Pledge"}
                                    </PillButton>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    )
}
