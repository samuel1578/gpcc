"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, FileText, Calendar, ImageIcon, LogOut, Mail } from "lucide-react"
import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/actions/auth"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"

import { usePathname } from "next/navigation"

const adminNav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Testimonies", href: "/admin/testimonies", icon: FileText },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#f5f3ee]">
                <Sidebar className="glass-panel-dark border-r border-white/10" collapsible="icon">
                    <SidebarHeader className="border-b border-white/10 p-4">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/images/hero/logo.png"
                                alt="GPCC Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                            <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                                <span className="font-display text-sm font-semibold text-white tracking-tight">
                                    GPCC Admin
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/50">
                                    Portal
                                </span>
                            </div>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent className="p-2">
                        <SidebarMenu>
                            {adminNav.map((item) => {
                                const active = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.label}
                                            isActive={active}
                                            className={cn(
                                                "transition-colors",
                                                active
                                                    ? "bg-white/20 text-white"
                                                    : "hover:bg-white/10 text-white/80 hover:text-white"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="border-t border-white/10 p-2">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <form action={logout}>
                                    <SidebarMenuButton className="w-full hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </SidebarMenuButton>
                                </form>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex flex-col">
                    <header className="flex h-16 items-center gap-4 border-b border-black/5 px-6 bg-white/50 backdrop-blur-md">
                        <SidebarTrigger className="lg:hidden" />
                        <div className="flex-1">
                            <h2 className="text-sm font-medium text-ink-muted">Admin Portal</h2>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                        <div className="mx-auto max-w-7xl">
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
