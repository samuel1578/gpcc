"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useDesignMode } from "@/lib/design-mode/store"

function pathToPageKey(pathname: string): string {
  if (!pathname || pathname === "/") return "home"
  return pathname.replace(/^\/+/, "").replace(/\//g, "-") || "home"
}

export function DesignModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const setActivePage = useDesignMode((s) => s.setActivePage)
  const setEnabled = useDesignMode((s) => s.setEnabled)
  const toggle = useDesignMode((s) => s.toggle)

  // Sync the active page key with the current route so editor controls always
  // target the visible page automatically.
  useEffect(() => {
    setActivePage(pathToPageKey(pathname ?? "/"))
  }, [pathname, setActivePage])

  return <>{children}</>
}
