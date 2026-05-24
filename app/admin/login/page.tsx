"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/browser"
import { Loader2, Lock, Mail } from "lucide-react"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

export default function AdminLoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const next = searchParams.get("next") || "/admin"

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast.error("Authentication failed", {
                    description: error.message,
                })
                return
            }

            toast.success("Welcome back", {
                description: "Redirecting to admin portal...",
            })

            router.push(next)
            router.refresh()
        } catch (err) {
            toast.error("An unexpected error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f3ee] p-4">
            <div className="w-full max-w-[400px] space-y-8">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Image
                        src="/images/hero/logo.png"
                        alt={SITE.name}
                        width={80}
                        height={80}
                        className="mb-4 h-20 w-auto object-contain"
                    />
                    <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                        Admin Portal
                    </h1>
                    <p className="text-sm text-ink-muted">
                        Enter your credentials to access the management dashboard.
                    </p>
                </div>

                <Card className="glass-panel-strong border-none p-8 shadow-[var(--shadow-dramatic)]">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@gpcconline.org"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    className="bg-white/50 pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted/50" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="bg-white/50 pl-10"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 font-semibold text-white hover:bg-red-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Card>

                <p className="px-8 text-center text-xs text-ink-muted">
                    Protected by GPCC Security. Unauthorized access is strictly prohibited.
                </p>
            </div>
        </div>
    )
}
